import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllusers } from '../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { host } from '../../../utils/apiRoutes';
import { toast, ToastContainer } from 'react-toastify';
import addUserIcon from "../../assets/add user.png";
import messageIcon from "../../assets/message.png";
import GroupDetailsForm from '../../pages/GroupDetailsForm/GroupDetailsForm';

function AllUsers() {
    const [socket, setSocket] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [localStorageUser, setLocalStorageUser] = useState();
    const [addedUsers, setAddedUsers] = useState({});
    const [addUserFlag, setAddUserFlag] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(getAllusers);
                setAllUsers(response.data.response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem("blog-user"));
        if (!userDetails) {
            navigate("/register");
        } else {
            setLocalStorageUser(userDetails);
            const newSocket = io(host);
            newSocket.on('connect', () => {
                newSocket.emit("add-user", userDetails._id);
            });
            setSocket(newSocket);
        }
    }, [navigate]);

    const handleDirectMessage = (user) => {
        navigate("/directmessage", {
            state: {
                from: localStorageUser._id,
                to: user._id,
                fromName: localStorageUser.username,
                toName: user.username,
                socketId: socket.id,
            },
        });
    }

    const handleUserAddButton = (user) => {
        setAddedUsers(prevState => ({
            ...prevState,
            [user._id]: user
        }));
        toast.success(`✅ ${user.username} has been added to your group!`);
    }

    const handleCreateGroupButton = () => {
        setAddUserFlag(true);
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-bold mb-8 text-center">All Users</h1>
            <p className="text-lg text-gray-600 text-center mb-6">
                Welcome to the user management page! Here you can view all users and create groups by adding them.
                Let's connect and collaborate! 🤝
            </p>
            {allUsers.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allUsers.map((user) => (
                            <div key={user._id} className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                                <div className="p-6">
                                    <div className="text-3xl font-bold text-center mb-4">{user.username}</div>
                                    <div className='flex justify-center mb-4'>
                                        <img src={user.profilePicture || "/path/to/default/image.png"} alt={`${user.username}'s profile`} className="rounded-full w-16 h-16" />
                                    </div>
                                    <div className='flex space-x-4 justify-center'>
                                        <button onClick={() => handleDirectMessage(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
                                            <img src={messageIcon} alt="message icon" className='w-5 h-5 mr-1' />
                                            Message
                                        </button>
                                        <button onClick={() => handleUserAddButton(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
                                            <img src={addUserIcon} alt="add user icon" className='w-5 h-5 mr-1' />
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {addUserFlag === false && (
                        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center mt-6">
                            <h4 className="text-lg font-semibold mb-4">Ready to create a new group?</h4>
                            <button onClick={handleCreateGroupButton} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                Create Group
                            </button>
                        </div>
                    )}

                    {addUserFlag === true && (
                        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
                            <h2 className="text-2xl font-semibold text-center mb-8">Create a New Group</h2>
                            <GroupDetailsForm addedUsers={addedUsers} localStorageUser={localStorageUser} />
                        </div>
                    )}
                </>
            ) : (
                <p>No users found.</p>
            )}
            <ToastContainer />
        </div>
    );
}

export default AllUsers;
