import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getDamageByIdAPI } from "../../axios/damage";
import { getObjectByIdAPI, getObjectAdressesByObjectIdAPI } from "../../axios/object";

export const DamageDetailScreen = ({ isLoggedIn}) => {
    const navigate = useNavigate();
    const { damageId } = useParams();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const [damageDetails, setDamageDetails] = useState({
        damageId: '',
        title: '',
        object: {
            _id: '',
            objectname: ''
        },
        adress: {
            _id: '',
            adress: ''
        },
        floorOrElevator: '',
        remarks: '',
        damageStatus: ''
    });

    useEffect(() => {
        const fetchDamageDetails = async () => {
            if (damageId) {
                try {
                    const damageData = await getDamageByIdAPI(damageId);
                    const objectData = await getObjectByIdAPI(damageData.data.data.damage.objectId);
                    const addressesData = await getObjectAdressesByObjectIdAPI(objectData.data.data.object._id);
                    const selectedAddress = addressesData.data.data.adresses.filter(adress => adress._id === damageData.data.data.damage.adressId);

                    setDamageDetails(currentFormData => ({
                        ...currentFormData,
                        damageId: damageId,
                        title: damageData.data.data.damage.title,
                        object: {
                            _id: objectData.data.data.object._id,
                            objectname: objectData.data.data.object.objectname
                        },
                        adress: {
                            _id: selectedAddress[0]._id,
                            adress: selectedAddress[0].adress
                        },
                        floorOrElevator: damageData.data.data.damage.floor,
                        remarks: damageData.data.data.damage.remarks,
                        damageStatus: damageData.data.data.damage.damageStatus,
                    }));
                } catch (error) {
                    console.error('Failed to fetch damage details:', error);
                }
            }
        };
        fetchDamageDetails();
    }, [damageId]);

    useEffect(() => {
    }, []);

    return (
        <>
            <h1>{damageDetails.title}</h1>
            <div>
                <p><strong>Objectname:</strong> {damageDetails.object.objectname}</p>
                <p><strong>Adress:</strong> {damageDetails.adress.adress}</p>
                <p><strong>Floor/Elevator:</strong> {damageDetails.floorOrElevator}</p>
                <p><strong>Remarks:</strong> {damageDetails.remarks}</p>
                <p><strong>Damage Status:</strong> {damageDetails.damageStatus}</p>
            </div>
        </>
    );
};
