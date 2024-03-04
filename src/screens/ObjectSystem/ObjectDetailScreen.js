import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { getObjectByIdAPI, getObjectAdressesByObjectIdAPI, createObjectAdressesByObjectIdAPI, editObjectAdressByIdAPI, deleteObjectByIdAPI, deleteObjectAdressByIdAPI } from "../../axios/object";
import { getAllTenantsAPI } from "../../axios/tenant";

export const ObjectDetailScreen = ({ isLoggedIn, isAdmin }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const { objectId } = useParams();

    const [object, setObject] = useState([]);
    const [objectAdresses, setObjectAdresses] = useState([]);
    const [editState, setEditState] = useState(false);
    const [adressId, setAdressId] = useState('');
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

        const response = await createObjectAdressesByObjectIdAPI(objectId, adress, floors);
        console.log(response);
    }

    const handleEditClick = (adressId, adress, floors) => {
        setEditState(true);
        setAdressId(adressId);
        setAdress(adress);
        setFloors(floors);
    }

    const handleEditAdress = async (e) => {
        e.preventDefault();

        if (!adress) {
            setError('The adress can not be left empty!');
            return;
        }

        if (!floors) {
            setError('The floors can not be left empty!');
            return;
        }

        const response = await editObjectAdressByIdAPI(adressId, adress, floors);
        console.log(response);
    }

    const handleDeleteObject = async (objectId) => {
        const response = await deleteObjectByIdAPI(objectId);
        if (response) {
            navigate(`/objects`);
        }
    }

    const handleDeleteAdress = async (adressId) => {
        const response = await deleteObjectAdressByIdAPI(adressId);
        console.log(response);
    }

    return (
        <>
            <h1>{object.objectname}</h1>
            {isAdmin && (<button onClick={ () => navigate(`/objects/${objectId}/edit`) }>Edit Object</button>)}
            {isAdmin && (<button onClick={ () => handleDeleteObject(objectId) }>delete</button>)}
            <h2>Object Adresses</h2>
            {objectAdresses.length > 0 ? (
            <ul>
                {objectAdresses.map((adress) => 
                <li key={adress._id}>
                    {adress.adress || 'Address not available'}
                    {isAdmin && (<button onClick={ () => handleEditClick(adress._id, adress.adress, adress.floors) }>Edit</button>)}
                    {isAdmin && (<button onClick={ () => handleDeleteAdress(adress._id) }>Delete</button>)}
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

            {isAdmin && (<form onSubmit={ editState ? handleEditAdress : handleCreateAdress}>
                <input type="text" placeholder="Adress ..." value={adress} onChange={(e) => setAdress(e.target.value)} /><br />
                <input type="text" placeholder="Comma separated floors ..." value={floors} onChange={ e => setFloors(e.target.value) } />
                <input type="submit" value={editState ? 'Save' : 'Create'} />
                {error && (<p>{error}</p>)}
            </form>)}
        </>
    );
};
