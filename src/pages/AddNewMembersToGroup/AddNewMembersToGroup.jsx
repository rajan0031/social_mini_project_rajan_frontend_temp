import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllusers } from '../../../utils/apiRoutes';
import { addANewMemberToGroup } from '../../../utils/GroupChatRoomApi/GroupChatRoomApi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Icons
import { FaUserPlus, FaUserTimes, FaUsers, FaUserCircle, FaCheckCircle } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import { RiGroupLine } from 'react-icons/ri';

function AddNewMembersToGroup({ group }) {
    // useState hooks for managing state
    const [AllusersFromDataBase, setAllUsersFromDataBase] = useState([]);
    const [AddUserFlag, setAddUserFlag] = useState([]);
    const [usersArray, setUsersArray] = useState([]);
    const [alreadyGroupsMembers, setAlreadyGroupsMembers] = useState([]);
    const [GroupData, setGroupData] = useState();
    const navigate = useNavigate();

    // Fetch users from the database
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(getAllusers);
                setAllUsersFromDataBase(response.data.response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    // Function to handle adding new members
    const handleAddNewMember = (user, index) => {
        const newFlags = [...AddUserFlag];
        newFlags[index] = true;
        setAddUserFlag(newFlags);
        setUsersArray(prev => [...prev, user]);
    };

    // Function to add members to the group
    const addMemberToGroup = async () => {
        try {
            const response = await axios.post(`${addANewMemberToGroup}`, {
                usersArray: usersArray,
                groupId: group._id,
            });
            if (response) {
                toast.success("Member added successfully!");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to add member. Please try again!");
        }
        navigate("/userprofile");
    };

    return (
        <>
            <section className="bg-gray-50 p-6">
                <div className="flex items-center justify-center mb-6">
                    <MdGroupAdd className="text-blue-600 text-3xl mr-2" />
                    <h1 className="text-2xl font-bold text-gray-800">Add New Members to Your Group</h1>
                </div>

                <p className="text-center text-gray-600 mb-6">
                    Invite people to join <strong>{group.groupName}</strong> and grow your community!
                    <BsFillPeopleFill className="inline text-blue-500 text-2xl ml-2" />
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {AllusersFromDataBase && AllusersFromDataBase.map((user, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center">
                                <FaUserCircle className="text-blue-500 text-3xl mr-3" />
                                <div>
                                    <p className="font-bold text-gray-800">{user.username}</p>
                                    <p className="text-gray-600 text-sm">{user.email}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                {AddUserFlag[index] === true ? (
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-200"
                                        onClick={() => {
                                            const newFlags = [...AddUserFlag];
                                            newFlags[index] = false;
                                            setAddUserFlag(newFlags);
                                            setUsersArray(usersArray.filter(u => u._id !== user._id));
                                        }}
                                    >
                                        <FaUserTimes className="inline mr-2" /> Remove
                                    </button>
                                ) : (
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200"
                                        onClick={() => handleAddNewMember(user, index)}
                                    >
                                        <FaUserPlus className="inline mr-2" /> Add
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    {usersArray.length > 0 ? (
                        <>
                            <AiFillCheckCircle className="text-green-500 text-3xl mb-2 inline" />
                            <p className="text-gray-700 font-semibold">You’ve selected {usersArray.length} user(s) to add to the group.</p>
                            <button
                                className="bg-green-500 text-white px-6 py-2 rounded-md mt-4 shadow-md hover:bg-green-600 transition-colors duration-200"
                                onClick={addMemberToGroup}
                            >
                                <FaUsers className="inline mr-2" /> Confirm & Add Members
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-600">No members selected. Please select at least one user to add to the group.</p>
                    )}
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default AddNewMembersToGroup;
