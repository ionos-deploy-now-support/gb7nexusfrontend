import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { getTenantByIdAPI, getTenantUsersByTenantIdAPI } from "../../axios/tenant";
import { getObjectByIdAPI } from "../../axios/object";

export const TenantDetailScreen = ({ isLoggedIn, isAdmin }) => {
    const navigate = useNavigate();
    const { tenantId } = useParams();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const [tenant, setTenant] = useState([]);
    const [object, setObject] = useState([]);
    const [tenantUsers, setTenantUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const tenantData = await getTenantByIdAPI(tenantId);
            setTenant(tenantData.data.data.tenant);
            const objectData = await getObjectByIdAPI(tenantData.data.data.tenant.objectId);
            setObject(objectData.data.data.object);
            const usersData = await getTenantUsersByTenantIdAPI(tenantId);
            const filteredUsers = usersData.data.data.users.filter(user => user !== null);
            setTenantUsers(filteredUsers);
        })()
    }, [tenantId]);

    return (
        <>
            <h1>{tenant.companyname}</h1>
            <h3>Object: {object.objectname}</h3>
            {tenantUsers && tenantUsers.length > 0 ? (
            <>
                <h3>Tenant Users:</h3>
                <ul>
                    {tenantUsers.map((user) => (
                        <li key={user._id}><Link to={isAdmin ? `/users/${user._id}/edit` : `/${user._id}`}>{user.name}</Link></li>
                    ))}
                </ul>
            </>
            ) : (
                <p>No users available.</p>
            )}
        </>
    );
};
