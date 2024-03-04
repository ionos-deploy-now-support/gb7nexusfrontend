import { axiosInstanceWithAuth } from "./index";

export const getAllObjectsAPI = async () => {
    try {
        const response = axiosInstanceWithAuth.get(`/objects/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getObjectByIdAPI = async (objectId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/objects/one/${objectId}`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getObjectAdressesByObjectIdAPI = async (objectId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/objects/one/${objectId}/adresses/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const createObjectAPI = async (objectname) => {
    try {
        const response = axiosInstanceWithAuth.post(`/objects/one/create`, {
            objectname
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const createObjectAdressesByObjectIdAPI = async (objectId, adress, floors) => {
    try {
        const response = axiosInstanceWithAuth.post(`/objects/one/${objectId}/adresses/one/create`, {
            adress, floors
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' }; 
    }
}

export const editObjectByIdAPI = async (objectId, objectname) => {
    try {
        const response = axiosInstanceWithAuth.put(`/objects/one/${objectId}/edit`, {
            objectname
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const editObjectAdressByIdAPI = async (adressId, adress, floors) => {
    try {
        const response = axiosInstanceWithAuth.put(`/objects/one/adresses/one/${adressId}/edit`, {
            adress, floors
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const deleteObjectByIdAPI = async (objectId) => {
    try {
        const response = axiosInstanceWithAuth.delete(`/objects/one/${objectId}/delete`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const deleteObjectAdressByIdAPI = async (adressId) => {
    try {
        const response = axiosInstanceWithAuth.delete(`/objects/one/adresses/one/${adressId}/delete`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}