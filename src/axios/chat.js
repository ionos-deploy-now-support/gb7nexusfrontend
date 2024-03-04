import { axiosInstanceWithAuth } from "./index";

export const getAllChatsAPI = async () => {
    try {
        const response = axiosInstanceWithAuth.get(`/chats/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getAllChatsByUserIdAPI = async (userId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/chats/all/users/one/${userId}`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getChatByIdAPI = async (chatId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/chats/one/${chatId}`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getChatMessagesByChatIdAPI = async (chatId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/chats/one/${chatId}/messages/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getChatMessageByMessageIdAPI = async (messageId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/chats/one/messages/one/${messageId}`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getChatUsersByChatIdAPI = async (chatId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/chats/one/${chatId}/users/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const createChatAPI = async (chatname, chatusers, chatrights) => {
    try {
        const response = axiosInstanceWithAuth.post(`/chats/one/create`, {
            chatname, chatusers, chatrights
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const createChatMessageByChatIdAPI = async (chatId, text) => {
    try {
        const response = axiosInstanceWithAuth.post(`/chats/one/${chatId}/messages/one/create`, {
            text
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const editChatByIdAPI = async (chatId, chatname, chatusers, chatrights) => {
    try {
        const response = axiosInstanceWithAuth.put(`/chats/one/${chatId}/edit`, {
            chatname, chatusers, chatrights
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const editChatMessageByIdAPI = async (messageId, text) => {
    try {
        const response = axiosInstanceWithAuth.put(`/chats/one/messages/one/${messageId}/edit`, {
            text
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const deleteChatByIdAPI = async (chatId) => {
    try {
        const response = axiosInstanceWithAuth.delete(`/chats/one/${chatId}/delete`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const deleteChatMessageByIdAPI = async (messageId) => {
    try {
        const response = axiosInstanceWithAuth.delete(`/chats/one/messages/one/${messageId}/delete`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}