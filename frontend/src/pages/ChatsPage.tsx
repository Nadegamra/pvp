import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
    Avatar,
    ChatContainer,
    Conversation,
    ConversationHeader,
    ConversationList,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    Search,
    Sidebar
} from '@chatscope/chat-ui-kit-react'
import { useEffect, useState } from 'react'
import { ConversationGet } from '../models/Conversation'
import { useAuth } from '../contexts/AuthContext'
import {
    getAllConversations,
    getBorrowerConversations,
    getLenderConversations,
    sendMessage
} from '../api/ChatsApi'
import { useParams } from 'react-router'
import { imagePathToURL } from '../models/Image'
import { MessageAdd } from '../models/Message'
import { getContainerHeight } from '../App'

function ChatsPage() {
    const { id } = useParams()
    const { user } = useAuth()
    const [conversations, setConversations] = useState<ConversationGet[]>()
    const [currentConversation, setCurrentConversation] = useState<number>()
    const [message, setMessage] = useState<string>('')
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        updateConversations()
    }, [])

    const updateConversations = () => {
        if (user?.role === 'admin') {
            getAllConversations().then((response) => {
                setConversations(response.data)
                if (id !== undefined) {
                    setCurrentConversation(parseInt(id))
                } else {
                    setCurrentConversation((response.data as ConversationGet[])[0].id)
                }
            })
        } else if (user?.role === 'lender') {
            getLenderConversations().then((response) => {
                setConversations(response.data)
                if (id !== undefined) {
                    setCurrentConversation(parseInt(id))
                } else {
                    setCurrentConversation((response.data as ConversationGet[])[0].id)
                }
            })
        } else if (user?.role === 'borrower') {
            getBorrowerConversations().then((response) => {
                setConversations(response.data)
                if (id !== undefined) {
                    setCurrentConversation(parseInt(id))
                } else {
                    setCurrentConversation((response.data as ConversationGet[])[0].id)
                }
            })
        }
    }

    return (
        <div style={{ height: getContainerHeight() }}>
            <MainContainer responsive>
                <Sidebar position="left">
                    <Search
                        placeholder="Search..."
                        value={search}
                        onChange={(text) => setSearch(text)}
                    />
                    <ConversationList>
                        {conversations !== undefined &&
                            conversations!.length > 0 &&
                            conversations
                                .filter((x) =>
                                    x.userConsole.console.name
                                        .toLowerCase()
                                        .match(search.toLowerCase())
                                )
                                ?.map((conversation) => (
                                    <Conversation
                                        onClick={() => {
                                            setCurrentConversation(conversation.id)
                                        }}
                                        name={`${conversation.userConsole.console.name}`}
                                        info={
                                            conversation.messages.length > 0
                                                ? conversation.messages[
                                                      conversation.messages.length - 1
                                                  ].text
                                                : ''
                                        }
                                        active={currentConversation === conversation.id}>
                                        <Avatar
                                            src={imagePathToURL(
                                                conversation.userConsole.images[0].path,
                                                256
                                            )}
                                        />
                                    </Conversation>
                                ))}
                    </ConversationList>
                </Sidebar>
                <ChatContainer>
                    {conversations !== undefined && conversations?.length > 0 && (
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
                                userName={
                                    conversations?.filter((x) => x.id === currentConversation)[0]
                                        .userConsole.console.name
                                }
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
                        {conversations == undefined ||
                            (conversations.length === 0 && (
                                <div className="text-center flex flex-col justify-center items-center h-full">
                                    <span>Šiuo metu pokalbių nėra</span>
                                </div>
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
            </MainContainer>
        </div>
    )
}

export default ChatsPage
