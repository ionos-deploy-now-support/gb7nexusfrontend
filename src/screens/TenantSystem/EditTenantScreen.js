import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditTenantScreen = ({ isLoggedIn, isAdmin, currentUserId, currentUser }) => {
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
    
    const [mieterId, setMieterId] = useState('');
    const [companyname, setCompanyname] = useState('');
    const [objektId, setObjektId] = useState('');

    const [error, setError] = useState('');

    useEffect(() => {
    }, [mieterId]);

    const handleEditMieter = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <h1>Edit Mieter</h1>
            <form onSubmit={handleEditMieter}>
                <input 
                    type="text" 
                    placeholder="Companyname ..." 
                    value={companyname} 
                    onChange={(e) => setCompanyname(e.target.value)}
                /><br />
                <select 
                    value={objektId} 
                    onChange={(e) => setObjektId(e.target.value)}
                >
                    <option value="">Select Objekt</option>
                </select><br />
                <input type="submit" value="Save" />
                {error && (<p>{error}</p>)}
            </form>
        </>
    );
};
