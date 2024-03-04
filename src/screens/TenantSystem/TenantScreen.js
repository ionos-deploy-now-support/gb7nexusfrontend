import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getAllTenantsAPI } from "../../axios/tenant";

export const TenantsScreen = ({ isLoggedIn, isAdmin }) => {
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

    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await getAllTenantsAPI();
                setTenants(result.data.data.tenants);
            } catch (error) {
                console.error("Failed to fetch tenants:", error);
            }
        })();
    }, []);

    return (
        <>
            <h1>Tenants:</h1>
            {tenants.length > 0 ? (
                tenants.map((tenant) => (
                    <div key={tenant._id}>
                        <Link to={`/tenants/${tenant._id}`}>{tenant.companyname}</Link>
                    </div>
                ))
            ) : (
                <p>No tenants found.</p>
            )}
        </>
    );
};

