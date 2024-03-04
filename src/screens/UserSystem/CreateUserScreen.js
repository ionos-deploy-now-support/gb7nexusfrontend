import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { validEmailRegex, validPhonenumberRegex, validPasswordRegex } from "../../helpers/regex";

import { getAllTenantsAPI } from "../../axios/tenant";

import { createUserAPI } from "../../axios/user";

export const CreateUserScreen = ({ isLoggedIn, isAdmin }) => {
    const navigate = useNavigate();
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

    const [tenants, setTenants] = useState('');

    useEffect(() => {
        (async() => {
            const tenantsData = await getAllTenantsAPI();
            setTenants(tenantsData.data.data.tenants);
        })()
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [role, setRole] = useState('user');
    const [tenantId, setTenantId] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [error, setError] = useState('');

    const handleCreateUser = async (e) => {
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

        if (!password) {
            setError('The password has to be valid!');
            return;
        }

        if (!validPasswordRegex.test(password)) {
            setError('The password has to have at lease one letter and number and at least 8 characters!');
            return;
        }

        if (password !== repeatPassword) {
            setError('The passwords do not match!');
            return;
        }

        const response = await createUserAPI(name, email, phonenumber, role, tenantId, password);
        console.log(response);
    };

    return (
        <>
            <h1>Create User</h1>
            <form onSubmit={handleCreateUser}>
                <input 
                    type="text" 
                    placeholder="Name ..." 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br />
                <input 
                    type="text" 
                    placeholder="Email ..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <input 
                    type="text" 
                    placeholder="Phonenumber ..." 
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                /><br />
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
                <input 
                    type="password" 
                    placeholder="Password ..." 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <input 
                    type="password" 
                    placeholder="Repeat Password ..." 
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                /><br />
                <input type="submit" value="Create" />
                {error && (<p>{error}</p>)}
            </form>
        </>
    );
};
