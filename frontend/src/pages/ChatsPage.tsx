import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
    Avatar,
    ChatContainer,
    Conversation,
    ConversationList,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    Search,
    Sidebar
} from '@chatscope/chat-ui-kit-react'

function ChatsPage() {
    return (
        <div style={{ height: document.getElementById('container')?.clientHeight }}>
            <MainContainer responsive>
                <Sidebar position="left">
                    <Search placeholder="Search..." />
                    <ConversationList>
                        <Conversation
                            name="Vardenis Pavardenis"
                            lastSenderName="Vardenis Pavardenis"
                            info="Text2">
                            <Avatar src="https://th.bing.com/th/id/OIP.peY2DU8XqomBik_4mlfOiAHaE8?pid=ImgDet&rs=1" />
                        </Conversation>
                    </ConversationList>
                </Sidebar>
                <ChatContainer>
                    <MessageList>
                        <Message
                            model={{
                                message: 'Text',
                                sentTime: 'just now',
                                direction: 'outgoing',
                                position: 0
                            }}
                        />
                        <Message
                            model={{
                                message: 'Text2',
                                sentTime: 'just now',
                                direction: 'incoming',
                                position: 0
                            }}
                        />
                    </MessageList>
                    <MessageInput placeholder="Type message here" />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}

export default ChatsPage
