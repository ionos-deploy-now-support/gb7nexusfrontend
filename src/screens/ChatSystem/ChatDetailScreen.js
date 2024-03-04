import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getChatByIdAPI, getChatUsersByChatIdAPI, getChatMessagesByChatIdAPI, createChatMessageByChatIdAPI, editChatMessageByIdAPI, deleteChatByIdAPI, deleteChatMessageByIdAPI } from "../../axios/chat";
import { getUserByIdAPI } from "../../axios/user";

export const ChatDetailScreen = ({ isLoggedIn, currentUserId }) => {
    const navigate = useNavigate();
    const { chatId } = useParams();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const [isChatAdmin, setIsChatAdmin] = useState(false);

    const [chat, setChat] = useState([]);
    const [chatUsers, setChatUsers] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [messageId, setMessageId] = useState('');
    const [chatMessage, setChatMessage] = useState('');
    const [editState, setEditState] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            if (chatId) {
                try {
                    const chatData = await getChatByIdAPI(chatId);
                    const chatInfo = chatData.data.data.chat;
                    const createdByUser = await getUserByIdAPI(chatInfo.createdBy);
                    setChat({
                        ...chatInfo,
                        createdBy: createdByUser.data.response.data.data.user.name
                    });
                    const chatUsersData = await getChatUsersByChatIdAPI(chatId);
                    setChatUsers(chatUsersData.data.data.users);
                    const chatMessagesData = await getChatMessagesByChatIdAPI(chatId);
                    setChatMessages(chatMessagesData.data.data.messages);
                } catch (error) {
                    console.error("Failed to fetch chat or user data:", error);
                }
            }
        })();
    }, [chatId]);

    useEffect(() => {
        const checkUser = () => {
            if (currentUserId) {
                const user = chatUsers.find(user => user._id === currentUserId);
                return user ? user.isAdmin : false;
            }
            return false;
        };

        const currentUserIsChatAdmin = checkUser(); 
        setIsChatAdmin(currentUserIsChatAdmin);
        
    }, [chatUsers, currentUserId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!chatMessage) {
            setError('The chat message can not be left empty!');
            return;
        }

        const response = await createChatMessageByChatIdAPI(chatId, chatMessage);
        console.log(response);
    };

    const handleEditClick = (messageId, text) => {
        setEditState(true);
        setMessageId(messageId);
        setChatMessage(text);
    };

    const handleEditMessage = async (e) => {
        e.preventDefault();

        if (!chatMessage) {
            setError('The chat message can not be left empty!');
            return;
        }

        const response = await editChatMessageByIdAPI(messageId, chatMessage);
        console.log(response);
    };

    const handleDeleteChat = async (chatId) => {
        const response = await deleteChatByIdAPI(chatId);
        if (response) {
            navigate('/chats');
        }
    }

    const handleDeleteMessage = async (messageId) => {
        const response = await deleteChatMessageByIdAPI(messageId);
        console.log(response);
    }

    return (
        <>
            <h1>{chat.chatname}</h1>
            <p>Chat created by {chat.createdBy}</p>
            <Link to={`/chats/${chat._id}/edit`}>Edit Chat</Link>
            {isChatAdmin && (<button onClick={() => handleDeleteChat(chatId)}>Delete</button>)}
            <ul>
                {chatMessages.length > 0 ? (
                    chatMessages.map(message => (
                        <li key={message._id}>
                            <p><strong>{message.userId}</strong> - {message.text}</p>
                            {currentUserId === message.userId && <button onClick={() => handleEditClick(message._id, message.text)}>Edit</button>}
                            {currentUserId === message.userId && <button onClick={() => handleDeleteMessage(message._id)}>Delete</button>}
                        </li>
                    ))
                ) : (
                    <p>No messages in this chat.</p>
                )}
            </ul>

            {(chat.chatrights === "everyone" || (chat.chatrights === "admins" && isChatAdmin)) && (
                <form onSubmit={editState ? handleEditMessage : handleSendMessage}>
                    <input type="text" placeholder="Type your message..." value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
                    <button type="submit">{editState ? 'Save' : 'Send'}</button>
                    {error && (<p>{error}</p>)}
                </form>
            )}
        </>
    );
};




