import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getUserByIdAPI, deleteUserByIdAPI } from "../../axios/user";
import { getAllDamagesByUserIdAPI } from "../../axios/damage";

export const ProfileScreen = ({ isLoggedIn, currentUserId, setIsLoggedIn, setIsAdmin }) => {
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const [user, setUser] = useState([]);
    const [damages, setDamages] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getUserByIdAPI(userId);
            if (response.success === true) {
                setUser(response.data.response.data.data.user);
            }
        })();
    }, [userId, setUser]);

    useEffect(() => {
        (async () => {
            if (userId) {
                const damagesData = await getAllDamagesByUserIdAPI(userId);
                setDamages(damagesData.data.data.damages);
            }
        })()
    }, [userId]);

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        const response = await deleteUserByIdAPI(userId);
        if (response.success) {
            setIsLoggedIn(false);
            setIsAdmin(false);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    return (
        <>
            <h1>{user.name}'s Profile</h1>
            {userId === currentUserId && (<Link to="/settings">Settings</Link>)}
            {userId === currentUserId && (<Link onClick={ e => handleDeleteUser(e) }>Delete User</Link>)}
            {damages && (<h2>Damages: </h2>)}
            {damages.length > 0 ? (
                damages.map((damage) => (
                    <div key={damage._id} style={{ marginBottom: '20px' }}>
                        <p><strong>Title:</strong> {damage.title}</p>
                        {damage.image && (
                            <img src={damage.image} alt={`Damage ${damage._id}`} style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                        <p><strong>ObjectId:</strong> {damage.objectId}</p>
                        <p><strong>AddressId:</strong> {damage.adressId}</p>
                        <p><strong>Floor/Elevator:</strong> {damage.floor}</p>
                        <p><strong>Remarks:</strong> {damage.remarks}</p>
                        <p><Link to={`/damages/${damage._id}`}>Show Damage</Link></p>
                    </div>
                ))
            ) : (
                <p>No Damages found.</p>
            )}
        </>
    );
};

