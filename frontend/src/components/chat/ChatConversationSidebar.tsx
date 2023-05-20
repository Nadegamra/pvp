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
                        .filter((x) =>
                            (x.userConsole !== null && x.userConsole !== undefined
                                ? x.userConsole.console.name
                                : `${t('borrowing.borrowing')} #${x.borrowingId}`
                            )
                                .toLowerCase()
                                .match(search.toLowerCase())
                        )
                        ?.map((conversation) => (
                            <Conversation
                                key={conversation.id}
                                onClick={() => {
                                    setCurrentConversation(conversation.id)
                                }}
                                name={
                                    conversation.userConsole !== null
                                        ? `${conversation.userConsole.console.name}`
                                        : `${t('borrowing.borrowing')} #${conversation.borrowingId}`
                                }
                                info={
                                    conversation.messages.length > 0
                                        ? conversation.messages[conversation.messages.length - 1]
                                              .text
                                        : ''
                                }
                                active={currentConversation === conversation.id}>
                                {conversation.userConsole !== null ? (
                                    <Avatar
                                        src={imagePathToURL(
                                            conversation.userConsole.images[0].path,
                                            256
                                        )}
                                    />
                                ) : (
                                    <Avatar>
                                        <img
                                            src={
                                                (localStorage.getItem('data-theme') ?? 'dark') ==
                                                'dark'
                                                    ? '/logoLight.png'
                                                    : '/logoDark.png'
                                            }
                                            alt=""
                                        />
                                        <div className="translate-y-[-13px] translate-x-[-5px]">
                                            #{conversation.borrowingId}
                                        </div>
                                    </Avatar>
                                )}
                            </Conversation>
                        ))}
            </ConversationList>
        </Sidebar>
    )
}

export default ChatConversationSidebar
