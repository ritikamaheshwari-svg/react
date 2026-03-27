import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css'

function ChatMessages({ chatMessages }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const containerElem = messagesEndRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);
    return (
        <div className="chat-messages-container" ref={messagesEndRef}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}

                    />
                );
            })}
        </div>

    )
};

export default ChatMessages;
