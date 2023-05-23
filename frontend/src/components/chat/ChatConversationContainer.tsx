import {
    Avatar,
    ChatContainer,
    ConversationHeader,
    Message,
    MessageInput,
    MessageList
} from '@chatscope/chat-ui-kit-react'
import { imagePathToURL } from '../../models/Image'
import { t } from 'i18next'
import { sendMessage } from '../../api/ChatsApi'
import { useAuth } from '../../contexts/AuthContext'
import { MessageAdd } from '../../models/Message'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { ConversationGet } from '../../models/Conversation'
import { UserConsoleStatus, getConsoleStatusString } from '../../models/UserConsole'
import { BorrowingStatus, getBorrowingStatusString } from '../../models/Borrowing'
import Button from '../ui/Button'
import { MessageFileAdd, messageFilePathToURL } from '../../models/MessageFile'
import axios from 'axios'

interface Props {
    conversation: ConversationGet | undefined
    message: string
    setMessage: Dispatch<SetStateAction<string>>
    updateConversations: () => void
}

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
    })

const downloadFile = async (url: string, fileName: string) => {
    try {
        await axios({
            url: url,
            method: 'GET',
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
        })
    } catch (error) {
        console.log(error)
    }
}

function ChatConversationContainer({
    conversation,
    message,
    setMessage,
    updateConversations
}: Props) {
    const { user } = useAuth()

    const fileRef = useRef<HTMLInputElement>(null)

    const [fileCount, setFileCount] = useState<number>(0)

    return (
        <div className="w-full relative">
            {conversation !== undefined ? (
                <ChatContainer>
                    {conversation.userConsole !== null ? (
                        <ConversationHeader>
                            <Avatar
                                src={imagePathToURL(
                                    conversation.userConsole.images[0].path ?? '',
                                    256
                                )}
                            />
                            <ConversationHeader.Content
                                userName={`${conversation.userConsole.console.name}`}
                                info={t(
                                    getConsoleStatusString(
                                        conversation.userConsole?.consoleStatus ??
                                            UserConsoleStatus.UNCONFIRMED
                                    )
                                )}
                            />
                            <ConversationHeader.Actions>
                                <Button
                                    text={t('button.toUserConsole')}
                                    dialog={false}
                                    dialogBody=""
                                    onClick={() =>
                                        (window.location.href = `${
                                            user?.role === 'admin' ? '/userConsoles/' : '/consoles/'
                                        }${conversation.userConsoleId}`)
                                    }
                                />
                            </ConversationHeader.Actions>
                        </ConversationHeader>
                    ) : conversation.borrowing !== null ? (
                        <ConversationHeader>
                            <Avatar>
                                <img
                                    src={
                                        (localStorage.getItem('data-theme') ?? 'dark') == 'dark'
                                            ? '/logoLight.png'
                                            : '/logoDark.png'
                                    }
                                    alt=""
                                />
                                <div className="translate-y-[-13px] translate-x-[-5px]">
                                    #{conversation.borrowingId}
                                </div>
                            </Avatar>
                            <ConversationHeader.Content
                                userName={`${t('borrowing.borrowing')} #${
                                    conversation.borrowing.id
                                }`}
                                info={t(getBorrowingStatusString(conversation.borrowing.status))}
                            />
                            <ConversationHeader.Actions>
                                <Button
                                    text={t('button.toBorrowing')}
                                    dialog={false}
                                    dialogBody=""
                                    onClick={() =>
                                        (window.location.href = `${
                                            user?.role === 'borrower'
                                                ? '/borrowings/'
                                                : '/manageBorrowings/'
                                        }${conversation.borrowingId}`)
                                    }
                                />
                            </ConversationHeader.Actions>
                        </ConversationHeader>
                    ) : (
                        <ConversationHeader>
                            <Avatar>
                                <img
                                    src={
                                        (localStorage.getItem('data-theme') ?? 'dark') == 'dark'
                                            ? '/logoLight.png'
                                            : '/logoDark.png'
                                    }
                                    alt=""
                                />
                                <div className="translate-y-[-13px] translate-x-[-5px]">#?</div>
                            </Avatar>
                            <ConversationHeader.Content
                                userName={`${t('borrowing.borrowing')} #?`}
                                info={t(getBorrowingStatusString(BorrowingStatus.TERMINATED))}
                            />
                            <ConversationHeader.Actions>
                                <Button
                                    text={t('button.toBorrowing')}
                                    dialog={false}
                                    dialogBody=""
                                    onClick={() =>
                                        (window.location.href = `${
                                            user?.role === 'borrower'
                                                ? '/borrowings/'
                                                : '/manageBorrowings/'
                                        }${conversation.borrowingId}`)
                                    }
                                />
                            </ConversationHeader.Actions>
                        </ConversationHeader>
                    )}
                    <MessageList>
                        {conversation !== undefined &&
                            conversation.messages.map((message) => (
                                <Message
                                    key={message.id}
                                    model={{
                                        message: message.text,
                                        sentTime: '',
                                        direction:
                                            message.fromAdmin !== (user?.role === 'admin')
                                                ? 'incoming'
                                                : 'outgoing',
                                        position: 0
                                    }}>
                                    <Message.CustomContent>
                                        <div className="flex flex-row content-center items-center">
                                            <span>
                                                {message.messageFiles.length > 0 && (
                                                    <span
                                                        className="material-symbols-outlined mr-3 cursor-pointer select-none"
                                                        onClick={() => {
                                                            message.messageFiles.forEach((file) => {
                                                                downloadFile(
                                                                    messageFilePathToURL(file.path),
                                                                    file.name
                                                                )
                                                            })
                                                        }}>
                                                        download_for_offline
                                                    </span>
                                                )}
                                            </span>
                                            <span>{message.text}</span>
                                        </div>
                                    </Message.CustomContent>
                                </Message>
                            ))}
                    </MessageList>
                    <MessageInput
                        placeholder="Type message here"
                        value={message}
                        onChange={(text) => setMessage(text)}
                        onSend={async () => {
                            if (
                                fileRef.current?.files === null ||
                                fileRef.current?.files.length === null ||
                                fileRef.current?.files.length === undefined
                            ) {
                                return
                            }
                            const files: MessageFileAdd[] = []
                            for (let i = 0; i < fileRef.current?.files.length; i++) {
                                const image = fileRef.current?.files.item(i)
                                if (image !== null) {
                                    let base64 = await toBase64(image)
                                    do {
                                        base64 = base64.substring(1)
                                    } while (base64[0] != ',')
                                    base64 = base64.substring(1)
                                    files.push(new MessageFileAdd(image.name, '', -1, base64))
                                }
                            }

                            const messageAdd: MessageAdd = new MessageAdd(
                                conversation.id,
                                message,
                                files
                            )

                            sendMessage(messageAdd)
                                .then(() => {
                                    updateConversations()
                                })
                                .finally(() => {
                                    setMessage('')
                                    const obj: any = document.getElementById('files')
                                    if (obj !== null) {
                                        obj.value = ''
                                    }
                                    setFileCount(0)
                                })
                        }}
                        onAttachClick={() => {
                            fileRef.current !== null && fileRef.current.click()
                        }}
                    />
                </ChatContainer>
            ) : (
                <ChatContainer>
                    <MessageList>
                        <div className="text-center flex flex-col justify-center items-center h-full">
                            <span>Šiuo metu pokalbių nėra</span>
                        </div>
                    </MessageList>
                </ChatContainer>
            )}
            <input
                type="file"
                ref={fileRef}
                id="files"
                className="hidden"
                multiple
                onChange={(e) => setFileCount(e.target.files !== null ? e.target.files.length : 0)}
            />
            {fileCount > 0 && (
                <div className="absolute bottom-14 left-10  rounded-lg p-2 ml-1 bg-bg-secondary">
                    {fileCount} {fileCount === 1 ? 'file' : 'files'} selected
                </div>
            )}
        </div>
    )
}

export default ChatConversationContainer
