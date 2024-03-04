import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getAllObjectsAPI } from "../../axios/object";

export const ObjectsScreen = ({ isLoggedIn, isAdmin, currentUserId, currentUser }) => {
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

    const [objects, setObjects] = useState([]);

    useEffect(() => {
        (async () => {
            const objectsData = await getAllObjectsAPI();
            setObjects(objectsData.data.data.objects);
        })()
    }, []);

    return (
        <>
            <h1>Objects</h1>
            {objects && (
                objects.map((object) => (
                <div key={object._id}>
                    <Link to={`/objects/${object._id}`}>{object.objectname}</Link>
                </div>
                ))
            )}
        </>
    );
};
