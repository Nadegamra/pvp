import {
    Avatar,
    Conversation,
    ConversationList,
    Search,
    Sidebar
} from '@chatscope/chat-ui-kit-react'
import { imagePathToURL } from '../../models/Image'
import { Dispatch, SetStateAction } from 'react'
import { ConversationGet } from '../../models/Conversation'
import { t } from 'i18next'
interface Props {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    conversations: ConversationGet[] | undefined
    setConversations: Dispatch<SetStateAction<ConversationGet[] | undefined>>
    currentConversation: number | undefined
    setCurrentConversation: Dispatch<SetStateAction<number | undefined>>
}

function ChatConversationSidebar({
    search,
    setSearch,
    conversations,
    setConversations,
    currentConversation,
    setCurrentConversation
}: Props) {
    return (
        <Sidebar position="left">
            <Search placeholder="Search..." value={search} onChange={(text) => setSearch(text)} />
            <ConversationList>
                {conversations !== undefined &&
                    conversations!.length > 0 &&
                    conversations
                        .filter((x) => x.userConsole !== null && x.userConsole !== undefined)
                        .filter((x) =>
                            x.userConsole.console.name.toLowerCase().match(search.toLowerCase())
                        )
                        ?.map((conversation) => (
                            <Conversation
                                key={conversation.id}
                                onClick={() => {
                                    setCurrentConversation(conversation.id)
                                }}
                                name={`${conversation.userConsole.console.name}`}
                                info={
                                    conversation.messages.length > 0
                                        ? conversation.messages[conversation.messages.length - 1]
                                              .text
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
                {conversations !== undefined &&
                    conversations!.length > 0 &&
                    conversations
                        .filter((x) => x.borrowing !== null && x.borrowing !== undefined)
                        .filter((x) =>
                            `${t('borrowing.borrowing')} #${x.borrowingId}`.match(search)
                        )
                        ?.map((conversation) => (
                            <Conversation
                                key={conversation.id}
                                onClick={() => {
                                    setCurrentConversation(conversation.id)
                                }}
                                name={`${t('borrowing.borrowing')} #${conversation.borrowingId}`}
                                info={
                                    conversation.messages.length > 0
                                        ? conversation.messages[conversation.messages.length - 1]
                                              .text
                                        : ''
                                }
                                active={currentConversation === conversation.id}></Conversation>
                        ))}
            </ConversationList>
        </Sidebar>
    )
}

export default ChatConversationSidebar
