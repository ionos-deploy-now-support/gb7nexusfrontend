import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAllChatsByUserIdAPI } from "../../axios/chat";

export const ChatsScreen = ({ isLoggedIn, currentUserId }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const [chats, setChats] = useState([]);

    useEffect(() => {
        (async () => {
            if (currentUserId) {
                const chatsData = await getAllChatsByUserIdAPI(currentUserId);
                setChats(chatsData.data.data.chats);
            }
        })()
    }, [currentUserId]);

    useEffect(() => {
        if (chats) {
            //chats.map(chat => console.log(chat));
        }
    }, [chats]);

    return (
        <>
            <h1>Chats</h1>
            {chats.length > 0 ? (
                <ul>
                {chats.map((chat) => (
                    <li key={chat._id}>
                        <Link to={`/chats/${chat._id}`}>{chat.chatname}</Link>
                    </li>
                ))}
            </ul>
            ) : (<p>No chats exist!</p>)}
        </>
    );
};

