import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getAllDamagesAPI, getAllDamagesByUserIdAPI } from "../../axios/damage";

export const DamagesScreen = ({ isLoggedIn, isAdmin, currentUserId }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);
    
    const [damages, setDamages] = useState([]);

    useEffect(() => {
        (async () => {
            if (currentUserId && isAdmin === false) {
                const damagesData = await getAllDamagesByUserIdAPI(currentUserId);
                let damagesDataArray = damagesData.data.data.damages;
                if (!Array.isArray(damagesDataArray)) {
                    damagesDataArray = [damagesDataArray];
                }
                setDamages(damagesDataArray);
            } else {
                const damagesData = await getAllDamagesAPI();
                let damagesDataArray = damagesData.data.data.damages;
                if (!Array.isArray(damagesDataArray)) {
                    damagesDataArray = [damagesDataArray];
                }
                setDamages(damagesDataArray);
            }
        })()
    }, [currentUserId, isAdmin]);

    return (
        <>
            <h1>Damages</h1>
            <div>
            {damages.length > 0 ? (
                damages.map((damage) => (
                    <div key={damage._id} style={{ marginBottom: '20px' }}>
                        <p><strong>Title:</strong> {damage.title}</p>
                        <p><strong>ObjectId:</strong> {damage.objectId}</p>
                        <p><strong>AddressId:</strong> {damage.adressId}</p>
                        <p><strong>Floor/Elevator:</strong> {damage.flo}</p>
                        <p><strong>Remarks:</strong> {damage.remarks}</p>
                        <p><Link to={`/damages/${damage._id}`}>Show Damage</Link></p>
                        {isAdmin && (<p><Link to={`/damages/${damage._id}/edit`}>Edit Damage</Link></p>)}
                    </div>
                ))
            ) : (
                <p>No Damages found.</p>
            )}
            </div>
        </>
    );
};
