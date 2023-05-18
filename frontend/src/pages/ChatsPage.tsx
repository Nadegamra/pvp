import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer } from '@chatscope/chat-ui-kit-react'
import { useEffect, useState } from 'react'
import { ConversationGet } from '../models/Conversation'
import { useAuth } from '../contexts/AuthContext'
import {
    getAllConversations,
    getBorrowerConversations,
    getLenderConversations
} from '../api/ChatsApi'
import { useParams } from 'react-router'
import { getContainerHeight } from '../App'
import ChatConversationSidebar from '../components/chat/ChatConversationSidebar'
import ChatConversationContainer from '../components/chat/ChatConversationContainer'

function ChatsPage() {
    const { id } = useParams()
    const { user } = useAuth()
    const [conversations, setConversations] = useState<ConversationGet[]>()
    const [currentConversation, setCurrentConversation] = useState<number>()
    const [message, setMessage] = useState<string>('')
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        updateConversationsWithCurrent()
    }, [])

    const updateConversations = () => {
        if (user?.role === 'admin') {
            getAllConversations().then((response) => {
                setConversations(response.data)
            })
        } else if (user?.role === 'lender') {
            getLenderConversations().then((response) => {
                setConversations(response.data)
            })
        } else if (user?.role === 'borrower') {
            getBorrowerConversations().then((response) => {
                setConversations(response.data)
            })
        }
    }

    const updateConversationsWithCurrent = () => {
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
                <ChatConversationSidebar
                    search={search}
                    setSearch={setSearch}
                    conversations={conversations}
                    setConversations={setConversations}
                    currentConversation={currentConversation}
                    setCurrentConversation={setCurrentConversation}
                />
                <ChatConversationContainer
                    conversations={conversations}
                    currentConversation={currentConversation}
                    message={message}
                    setMessage={setMessage}
                    updateConversations={updateConversations}
                />
            </MainContainer>
        </div>
    )
}

export default ChatsPage
