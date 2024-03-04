import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { getObjectByIdAPI, getObjectAdressesByObjectIdAPI, createObjectAdressesByObjectIdAPI, editObjectAdressByIdAPI } from "../../axios/object";
import { getAllTenantsAPI } from "../../axios/tenant";

export const ObjectDetailScreen = ({ isLoggedIn, isAdmin, currentUserId, currentUser }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const { objectId } = useParams();

    const [object, setObject] = useState([]);
    const [objectAdresses, setObjectAdresses] = useState([]);
    const [adress, setAdress] = useState('');
    const [floors, setFloors] = useState('');
    const [error, setError] = useState('');
    const [tenants, setTenants] = useState([]);
    useEffect(() => {
        (async () => {
            if (objectId) {
                try {
                    const objectData = await getObjectByIdAPI(objectId);
                    setObject(objectData.data.data.object);
                    const objectAdressesData = await getObjectAdressesByObjectIdAPI(objectId);

                    let adresses = objectAdressesData.data.data.adresses;
                    if (!Array.isArray(adresses)) {
                        adresses = [adresses];
                    }
                    setObjectAdresses(adresses);
                } catch (error) {
                    console.error("Failed to fetch object data:", error);
                }
            }
        })();
    }, [objectId]);

    useEffect(() => {
        (async () => {
            const tenantsData = await getAllTenantsAPI();
            if (objectId) {
                setTenants(tenantsData.data.data.tenants.filter(tenant => tenant.objectId === objectId));
            }
        })()
    }, [objectId]);

    const handleCreateAdress = async (e) => {
        e.preventDefault();

        if (!adress) {
            setError('The adress can not be left empty!');
            return;
        }

        if (!floors) {
            setError('The floors can not be left empty!');
            return;
        }

        const floorsArray = floors.split(",");

        const response = await createObjectAdressesByObjectIdAPI(objectId, adress, floorsArray);
        console.log(response);
    }

    return (
        <>
            <h1>{object.objectname}</h1>
            <h2>Object Adresses</h2>
            {objectAdresses.length > 0 ? (
            <ul>
                {objectAdresses.map((adress, index) => 
                <li key={adress?._id || index}>
                    {adress?.adress || 'Address not available'}
                </li>
                )}
            </ul>
            ) : (
            <p>No addresses available ...</p>
            )}

            {isAdmin && (
                <div>
                    <h2>Tenants:</h2>
                    {tenants.length > 0 ? (
                    <ul>
                        {tenants.map((tenant) => (
                            <li key={tenant._id}><Link to={`/tenants/${tenant._id}`}>{tenant.companyname}</Link></li>
                        ))}
                    </ul>
                    ) : (
                        <p>No tenants available ...</p>
                    )}
                </div>
            )}

            {isAdmin && (<form onSubmit={handleCreateAdress}>
                <input type="text" placeholder="Adress ..." value={adress} onChange={(e) => setAdress(e.target.value)} /><br />
                <input type="text" placeholder="Comma separated floors ..." value={floors} onChange={ e => setFloors(e.target.value) } />
                <input type="submit" value="Create" />
            </form>)}
        </>
    );
};
