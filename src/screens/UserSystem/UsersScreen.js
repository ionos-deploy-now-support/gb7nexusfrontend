import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllUsersAPI, deleteUserByIdAPI } from "../../axios/user";

export const UsersScreen = ({ isLoggedIn, isAdmin, currentUserId }) => {
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
    });
    
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (isAdmin) {
            (async () => {
                const usersData = await getAllUsersAPI();
                setUsers(usersData.data.response.data.data.users);
            })()
        }
    }, [isAdmin]);

    const handleDeleteUser = async (userId, e) => {
        e.preventDefault();
        const response = await deleteUserByIdAPI(userId);
        if (response.success) {
            navigate(`/users`);
        }
    }

    return (
        <>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phonenumber</th>
                        <th>Role</th>
                        <th>tfaSetting</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phonenumber}</td>
                            <td>{user.role}</td>
                            <td>{user.tfaSetting}</td>
                            <td>
                                {user._id !== currentUserId && (<button onClick={() => navigate(`/users/${user._id}/edit`)}>Edit User</button>)}
                                {user._id === currentUserId && (<button onClick={() => navigate(`/settings`)}>Settings</button>)}
                                {user._id !== currentUserId && (<button onClick={(e) => handleDeleteUser(user._id, e) }>Delete User</button>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
