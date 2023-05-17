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
import { Dispatch, SetStateAction } from 'react'
import { ConversationGet } from '../../models/Conversation'
import { UserConsoleStatus, getConsoleStatusString } from '../../models/UserConsole'
import { getBorrowingStatusString } from '../../models/Borrowing'
import Button from '../ui/Button'

interface Props {
    conversations: ConversationGet[] | undefined
    currentConversation: number | undefined
    message: string
    setMessage: Dispatch<SetStateAction<string>>
    updateConversations: () => void
}

function ChatConversationContainer({
    conversations,
    currentConversation,
    message,
    setMessage,
    updateConversations
}: Props) {
    const { user } = useAuth()

    return (
        <div className="w-full">
            {conversations !== undefined && conversations?.length > 0 ? (
                <ChatContainer>
                    {conversations?.filter((x) => x.id === currentConversation)[0].userConsole !==
                    null ? (
                        <ConversationHeader>
                            <ConversationHeader.Back />
                            <Avatar
                                src={imagePathToURL(
                                    conversations?.filter((x) => x.id === currentConversation)[0]
                                        .userConsole.images[0].path ?? '',
                                    256
                                )}
                            />
                            <ConversationHeader.Content
                                userName={`${
                                    conversations?.filter((x) => x.id === currentConversation)[0]
                                        .userConsole.console.name
                                }`}
                                info={t(
                                    getConsoleStatusString(
                                        conversations?.filter(
                                            (x) => x.id === currentConversation
                                        )[0].userConsole?.consoleStatus ??
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
                                        (window.location.href = `/userConsoles/${
                                            conversations?.filter(
                                                (x) => x.id === currentConversation
                                            )[0].userConsoleId
                                        }`)
                                    }
                                />
                            </ConversationHeader.Actions>
                        </ConversationHeader>
                    ) : (
                        <ConversationHeader>
                            <ConversationHeader.Back />
                            <ConversationHeader.Content
                                userName={`${t('borrowing.borrowing')} #${
                                    conversations?.filter((x) => x.id === currentConversation)[0]
                                        .borrowing.id
                                }`}
                                info={t(
                                    getBorrowingStatusString(
                                        conversations?.filter(
                                            (x) => x.id === currentConversation
                                        )[0].borrowing.status
                                    )
                                )}
                            />
                        </ConversationHeader>
                    )}

                    <MessageList>
                        {conversations !== undefined &&
                            conversations!.length > 0 &&
                            conversations
                                ?.filter((x) => x.id === currentConversation)[0]
                                .messages.map((message) => (
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
                                        }}
                                    />
                                ))}
                    </MessageList>
                    <MessageInput
                        placeholder="Type message here"
                        value={message}
                        onChange={(text) => setMessage(text)}
                        onSend={() => {
                            sendMessage(new MessageAdd(currentConversation ?? -1, message)).then(
                                () => {
                                    updateConversations()
                                }
                            )
                            setMessage('')
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
        </div>
    )
}

export default ChatConversationContainer
