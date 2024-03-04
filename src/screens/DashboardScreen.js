import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getAllObjectsAPI, getObjectByIdAPI } from "../axios/object";
import { getAllTenantsAPI, getTenantByUserIdAPI, getTenantByIdAPI } from "../axios/tenant";
import { getAllUsersAPI } from "../axios/user";
import { getAllDamagesAPI, getAllDamagesByUserIdAPI } from "../axios/damage";
import { getAllChannelsAPI, getAllChannelsByUserIdAPI } from "../axios/channel";

export const DashboardScreen = ({ isLoggedIn, isAdmin, currentUserId }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const [objects, setObjects] = useState([]);
    useEffect(() => {
        if (isAdmin) {
            (async () => {
                const objectsData = await getAllObjectsAPI();
                setObjects(objectsData.data.data.objects);
            })()
        }
    }, [isAdmin]);

    const [object, setObject] = useState([]);

    const [tenants, setTenants] = useState([]);
    useEffect(() => {
        if (isAdmin) {
            (async () => {
                const tenantsData = await getAllTenantsAPI();
                setTenants(tenantsData.data.data.tenants);
            })()
        }
    }, [isAdmin]);

    const [tenant, setTenant] = useState([]);
    useEffect(() => {
        if (isAdmin === false) {
            (async () => {
                if (currentUserId) {
                    const tenantIdData = await getTenantByUserIdAPI(currentUserId);
                    const tenantData = await getTenantByIdAPI(tenantIdData.data.data.tenantId.response[0].tenantId);
                    setTenant(tenantData.data.data.tenant);
                }
            })()
        }
    }, [currentUserId, isAdmin]);

    useEffect(() => {
        if (tenant) {
            (async () => {
                if (tenant.objectId) {
                    const objectData = await getObjectByIdAPI(tenant.objectId);
                    setObject(objectData.data.data.object);
                }
            })()
        }
    }, [tenant]);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (isAdmin) {
            (async () => {
                const usersData = await getAllUsersAPI();
                setUsers(usersData.data.response.data.data.users);
            })()
        }
    }, [isAdmin]);

    const [damages, setDamages] = useState([]);
    useEffect(() => {
        if (isAdmin) {
            (async () => {
                const damagesData = await getAllDamagesAPI();
                setDamages(damagesData.data.data.damages);
            })()
        } else {
            (async () => {
                if (currentUserId) {
                    const damagesData = await getAllDamagesByUserIdAPI(currentUserId);
                    setDamages(damagesData.data.data.damages);
                }
            })()
        }
    }, [currentUserId, isAdmin]);

    const [channels, setChannels] = useState([]);
    useEffect(() => {
        (async () => {
            if (isAdmin) {
                const channelsData = await getAllChannelsAPI();
                setChannels(channelsData.data.data.channels);
            } else {
                if (currentUserId) {
                    const channelsData = await getAllChannelsByUserIdAPI(currentUserId);
                    setChannels(channelsData.data.data.channels);
                }
            }
        })()
    }, [currentUserId, isAdmin]);
    
    return (
        <>
        {isLoggedIn && (
        <>
            {isAdmin ? (
                <>
                <h2>Admin Dashboard</h2>
                <h3>Objects Table:</h3>
                {objects.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Objectname</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {objects.map((objectsObject) => (
                        <tr key={objectsObject._id}>
                            <td>{objectsObject._id}</td>
                            <td>{objectsObject.objectname}</td>
                            <td>
                                <button onClick={() => navigate(`/objects/${objectsObject._id}`)}>Show Object</button>
                                <button onClick={() => navigate(`/objects/${objectsObject._id}/edit`)}>Edit Object</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                <p>There are no objects to show ...</p>
                )}
                <h3>Tenants Table:</h3>
                {tenants.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Companyname</th>
                                <th>ObjectId</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenants.map((tenant) => (
                                <tr key={tenant._id}>
                                    <td>{tenant._id}</td>
                                    <td>{tenant.companyname}</td>
                                    <td><Link to={`/objects/${tenant.objectId}`}>{tenant.objectId}</Link></td>
                                    <td>
                                        <button onClick={() => navigate(`/tenants/${tenant._id}`)}>Show Tenant</button>
                                        <button onClick={() => navigate(`/tenants/${tenant._id}/edit`)}>Edit Tenant</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<p>There are no tenants to show ...</p>)}
                <h3>Users Table:</h3>
                {users.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phonenumber</th>
                                <th>Role</th>
                                <th>tfaSetting</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phonenumber}</td>
                                    <td>{user.role}</td>
                                    <td>{user.tfaSetting}</td>
                                    <td>
                                        <button onClick={() => navigate(`/users/${user._id}/edit`)}>Edit User</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<p>There are no users to show ...</p>)}
                <h3>Damages Table:</h3>
                {damages.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>userId</th>
                                <th>objectId</th>
                                <th>adressId</th>
                                <th>floor</th>
                                <th>Remarks</th>
                                <th>Damage Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                    <tbody>
                        {damages.map((damage) => (
                            <tr key={damage._id}>
                                <td>{damage._id}</td>
                                <td>{damage.title}</td>
                                <td>{damage.userId}</td>
                                <td>{damage.objectId}</td>
                                <td>{damage.adressId}</td>
                                <td>{damage.floor}</td>
                                <td>{damage.remarks}</td>
                                <td>{damage.damageStatus}</td>
                                <td>
                                    <button onClick={() => navigate(`/damages/${damage._id}`)}>Show Damage</button>
                                    <button onClick={() => navigate(`/damages/${damage._id}/edit`)}>Edit Damage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (<p>There are no damages to show ...</p>)}
                <h3>Channels Table:</h3>
                {channels.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Channelname</th>
                                <th>Channelrights</th>
                                <th>Created By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {channels.map((channel) => (
                            <tr key={channel._id}>
                                <td>{channel._id}</td>
                                <td>{channel.channelname}</td>
                                <td>{channel.channelrights}</td>
                                <td>{channel.createdBy}</td>
                                <td>
                                    <Link to={`/channels/${channel._id}`}>Show Channel</Link>
                                    <Link to={`/channels/${channel._id}/edit`}>Edit Channel</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (<p>There are no channels to show ...</p>)}
                </>
            ) : (
                <>
                <h2>User Dashboard</h2>
                <h3>Object Table:</h3>
                {object ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Objectname</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={object._id}>
                                <td>{object._id}</td>
                                <td>{object.objectname}</td>
                                <td>
                                    <button onClick={() => navigate(`/objects/${object._id}`)}>Show Object</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (<p>There is no object to show ...</p>)}
                <h3>Tenant Table:</h3>
                {tenant ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Companyname</th>
                                <th>ObjectId</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={tenant._id}>
                                <td>{tenant._id}</td>
                                <td>{tenant.companyname}</td>
                                <td><Link to={`/objects/${tenant.objectId}`}>{tenant.objectId}</Link></td>
                                <td>
                                    <button onClick={() => navigate(`/tenants/${tenant._id}`)}>Show Tenant</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (<p>There is no tenant to show ...</p>)}
                <h3>Damages Table:</h3>
                {damages.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>userId</th>
                                <th>objectId</th>
                                <th>adressId</th>
                                <th>floor</th>
                                <th>Remarks</th>
                                <th>Damage Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {damages.map((damage) => (
                            <tr key={damage._id}>
                                <td>{damage._id}</td>
                                <td>{damage.title}</td>
                                <td>{damage.userId}</td>
                                <td>{damage.objectId}</td>
                                <td>{damage.adressId}</td>
                                <td>{damage.floor}</td>
                                <td>{damage.remarks}</td>
                                <td>{damage.damageStatus}</td>
                                <td>
                                    <button onClick={() => navigate(`/damages/${damage._id}`)}>Show Damage</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (<p>There are no damages to show ...</p>)}
                <h3>Channel Table:</h3>
                {channels.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Channelname</th>
                                <th>Channelrights</th>
                                <th>Created By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {channels.map((channel) => (
                            <tr key={channel._id}>
                                <td>{channel._id}</td>
                                <td>{channel.channelname}</td>
                                <td>{channel.channelrights}</td>
                                <td>{channel.createdBy}</td>
                                <td>
                                    <Link to={`/channels/${channel._id}`}>Show Channel</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (<p>There are no channels to show ...</p>)}
                </>
            )}
        </>
        )}
        </>
    );
};
