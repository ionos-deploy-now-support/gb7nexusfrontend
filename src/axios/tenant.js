import { axiosInstanceWithAuth } from "./index";

export const getAllTenantsAPI = async () => {
    try {
        const response = axiosInstanceWithAuth.get(`/tenants/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getTenantByIdAPI = async (tenantId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/tenants/one/${tenantId}`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const getTenantUsersByTenantIdAPI = async (tenantId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/tenants/one/${tenantId}/users/all`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' }; 
    }
}

export const getTenantByUserIdAPI = async (userId) => {
    try {
        const response = axiosInstanceWithAuth.get(`/tenants/one/users/one/${userId}`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' }; 
    }
}

export const createTenantAPI = async (companyname, objectId) => {
    try {
        const response = axiosInstanceWithAuth.post(`/tenants/one/create`, {
            companyname, objectId
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const editTenantByIdAPI = async (tenantId, companyname, objectId) => {
    try {
        const response = axiosInstanceWithAuth.put(`/tenants/one/${tenantId}/edit`, {
            companyname, objectId
        });
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' };
    }
}

export const deleteTenantByIdAPI = async (tenantId) => {
    try {
        const response = axiosInstanceWithAuth.delete(`/tenants/one/${tenantId}/delete`);
        return response;
    } catch (error) {
        return { success: false, error: error.response ? error.response.data : 'An unexpected error occurred' }; 
    }
}