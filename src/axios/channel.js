import { axiosInstanceWithAuth } from "./index";

export const getAllChannelsAPI = async () => {
    try {
        const response = axiosInstanceWithAuth.get(`/channels/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getAllChannelsByUserIdAPI = async (userId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/channels/all/users/one/${userId}`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getChannelByIdAPI = async (channelId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/channels/one/${channelId}`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getChannelMessagesByChannelIdAPI = async (channelId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/channels/one/${channelId}/messages/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getChannelMessageByMessageIdAPI = async (messageId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/channels/one/messages/one/${messageId}`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getChannelUsersByChannelIdAPI = async (channelId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/channels/one/${channelId}/users/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const createChannelAPI = async (channelname, channelusers, channelrights) => {
    try {
        const response = axiosInstanceWithAuth.post(`/channels/one/create`, {
            channelname, channelusers, channelrights
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const createChannelMessageByChannelIdAPI = async (channelId, title, text) => {
    try {
        const response = axiosInstanceWithAuth.post(`/channels/one/${channelId}/messages/one/create`, {
            title, text
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const editChannelByIdAPI = async (channelId, channelname, channelusers, channelrights) => {
    try {
        const response = axiosInstanceWithAuth.put(`/channels/one/${channelId}/edit`, {
            channelname, channelusers, channelrights
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const editChannelMessageByIdAPI = async (messageId, title, text) => {
    try {
        const response = axiosInstanceWithAuth.put(`/channels/one/messages/one/${messageId}/edit`, {
            title, text
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' }; 
    }
}

export const deleteChannelByIdAPI = async (channelId) => {
    try {
        const response = axiosInstanceWithAuth.delete(`/channels/one/${channelId}/delete`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const deleteChannelMessageByIdAPI = async (messageId) => {
    try {
        const response = axiosInstanceWithAuth.delete(`/channels/one/messages/one/${messageId}/delete`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}