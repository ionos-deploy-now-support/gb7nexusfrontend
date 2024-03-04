import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { validEmailRegex, validPhonenumberRegex } from "../../helpers/regex";

import { editUserByIdAPI } from "../../axios/user"

export const SettingsScreen = ({ isLoggedIn, currentUser }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [twoFactorAuthType, setTwoFactorAuthType] = useState('false');

    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
            setPhonenumber(currentUser.phonenumber);
            setTwoFactorAuthType(currentUser.tfaSetting);
        }
    }, [currentUser, setName, setEmail, setPhonenumber, setTwoFactorAuthType]);

    const handleSubmit = async (e) => {
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

        if (!twoFactorAuthType) {
            setError('The two factor auth type can not be left empty!');
            return;
        }

        if (twoFactorAuthType !== "false" && twoFactorAuthType !== "email" && twoFactorAuthType !== "sms") {
            setError('The two factor auth type can not be invalid!');
            return;
        }

        const response = await editUserByIdAPI(currentUser._id, name, email, phonenumber, twoFactorAuthType);
        console.log(response);
    };

    return (
        <>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name ..." value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input type="text" placeholder="Email ..." value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="text" placeholder="Phonenumber ..." value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} /><br />
                <select value={twoFactorAuthType} onChange={(e) => {
                    setTwoFactorAuthType(e.target.value);
                }}>
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
