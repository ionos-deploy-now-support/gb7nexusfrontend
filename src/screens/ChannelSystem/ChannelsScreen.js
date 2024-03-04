import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAllChannelsAPI, getAllChannelsByUserIdAPI } from "../../axios/channel";

export const ChannelsScreen = ({ isLoggedIn, isAdmin, currentUserId }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const [channels, setChannels] = useState([]);

    useEffect(() => {
        (async () => {
            if (isAdmin) {
                const channelsData = await getAllChannelsAPI();
                setChannels(channelsData.data.data.channels);
            } else {
                if (currentUserId) {
                    const channelsData = await getAllChannelsByUserIdAPI(currentUserId);
                    setChannels(channelsData.data.data.channels);
                }
            }
        })()
    }, [isAdmin, currentUserId]);

    return (
        <>
            <h1>Channels</h1>
            <ul>
                {channels.map((channel) => (
                    <li key={channel._id}>
                        <Link to={`/channels/${channel._id}`}>{channel.channelname}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};