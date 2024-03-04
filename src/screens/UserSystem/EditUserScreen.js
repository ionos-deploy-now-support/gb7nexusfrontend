import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { validEmailRegex, validPhonenumberRegex } from "../../helpers/regex";

import { getUserByIdAPI, editUserByIdAPI } from "../../axios/user";
import { getAllTenantsAPI, getTenantByUserIdAPI } from "../../axios/tenant";

export const EditUserScreen = ({ isLoggedIn, isAdmin, currentUserId }) => {
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
        }
    }, [isAdmin, navigate]);

    useEffect(() => {
        if (userId === currentUserId) {
            navigate('/settings');
        }
    }, [userId, currentUserId, navigate]);

    const [tenants, setTenants] = useState('');

    useEffect(() => {
        (async () => {
            const tenantsData = await getAllTenantsAPI();
            setTenants(tenantsData.data.data.tenants);
        })()
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [role, setRole] = useState('user');
    const [tenantId, setTenantId] = useState('');
    const [twoFactorAuthType, setTwoFactorAuthType] = useState('false');

    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            if (userId) {
                const userData = await getUserByIdAPI(userId);
                setName(userData.data.response.data.data.user.name);
                setEmail(userData.data.response.data.data.user.email);
                setPhonenumber(userData.data.response.data.data.user.phonenumber);
                setRole(userData.data.response.data.data.user.role);
                const tenantData = await getTenantByUserIdAPI(userId);
                setTenantId(tenantData.data.data.tenantId.response[0].tenantId);
                setTwoFactorAuthType(userData.data.response.data.data.user.tfaSetting);
            }
        })()
    }, [userId]);

    const handleEditUser = async (e) => {
        e.preventDefault();

        if (!name) {
            setError('The name can not be left empty!');
            return;
        }

        if (!email) {
            setError('The email can not be left empty!');
            return;
        }

        if(!validEmailRegex.test(email)) {
            setError('The email has to be valid!');
            return;
        }

        if (!phonenumber) {
            setError('The phonenumber can not be left empty!')
            return;
        }

        if (!validPhonenumberRegex.test(phonenumber)) {
            setError('The phonenumber has to be valid!');
            return;
        }

        if (!role) {
            setError('The role can not be left empty!');
            return;
        }

        if (role !== "user" && role !== "admin") {
            setError('The role is invalid!');
            return;
        }

        if (!twoFactorAuthType) {
            setError('The two factor auth type can not be left empty!');
            return;
        }

        if (twoFactorAuthType !== "false" && twoFactorAuthType !== "email" && twoFactorAuthType !== "sms") {
            setError('The two factor auth type can not be invalid!');
            return;
        }

        const response = await editUserByIdAPI(userId, name, email, phonenumber, twoFactorAuthType, role);
        if (response) {
            navigate('/users');
        }
    };

    return (
        <>
            <h1>Edit User</h1>
            <form onSubmit={handleEditUser}>
                <input type="text" placeholder="Name ..." value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input type="text" placeholder="Email ..." value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="text" placeholder="Phonenumber ..." value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} /><br />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select><br />
                <select value={tenantId} onChange={(e) => setTenantId(e.target.value)}>
                    <option value="">No Mieter</option>
                    {tenants.length > 0 ? (
                        tenants.map(tenant => (
                            <option key={tenant._id} value={tenant._id}>{tenant.companyname}</option>
                        ))
                        ) : (
                            <option disabled>No tenants exist</option>
                        )}
                </select><br />
                <select value={twoFactorAuthType} onChange={(e) => setTwoFactorAuthType(e.target.value)}>
                    <option value="false">No Two Factor Authentication</option>
                    <option value="email">Email Two Factor Authentication</option>
                    <option value="sms">SMS Two Factor Authentication</option>
                </select><br />
                <input type="submit" value="Save" />
                {error && (<p>{error}</p>)}
            </form>
        </>
    );
};
