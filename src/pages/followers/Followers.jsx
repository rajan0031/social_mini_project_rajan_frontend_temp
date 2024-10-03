import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { followers, deleteFollower } from '../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Icons
import { FaUserMinus, FaUserAlt } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';

function Followers() {
    const location = useLocation();
    const user = location.state?.user;
    const [followerList, setFollowerList] = useState([]);

    // Handle removing a follower
    const handleRemove = async (from, to) => {
        console.log("Remove follower clicked", from, to);

        try {
            const response = await axios.post(`${deleteFollower}`, {
                from: from,
                to: to,
            });

            if (response) {
                toast.success("Follower removed successfully!");
                setFollowerList(prevList => prevList.filter(follower => follower.from !== from));
            }

        } catch (err) {
            console.log(err);
            toast.error("Failed to remove follower. Please try again.");
        }
    };

    // Fetch followers list
    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.post(`${followers}`, { to: user._id });
                setFollowerList(response.data.response); // Assuming the followers data is in the response
            } catch (err) {
                console.log(err);
            }
        };

        fetchFollowers();
    }, [user]);

    return (
        <div className="container mx-auto p-6 bg-gray-50">
            {/* Page Purpose Section */}
            <div className="bg-blue-100 border border-blue-200 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                    <AiOutlineInfoCircle className="text-blue-500 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">About This Page</h2>
                </div>
                <p className="text-gray-700">
                    This page allows you to manage the people who follow your profile. You can view a list of your followers, and if necessary, remove them from your followers list.
                    Stay connected with people who matter to you while controlling your own follower list.
                </p>
            </div>

            <div className="flex items-center mb-6">
                <MdPeople className="text-blue-500 text-4xl mr-3" />
                <h1 className="text-3xl font-bold text-gray-800">Hello, {user.username}!</h1>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-6">
                People who have followed you:
                <BsFillPersonLinesFill className="inline ml-2 text-blue-600 text-2xl" />
            </h3>

            {followerList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {followerList.map((follower) => (
                        <div key={follower._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <FaUserAlt className="text-blue-500 text-2xl mr-3" />
                                <div>
                                    <p className="text-lg font-bold text-gray-800">{follower.fromName}</p>
                                    <p className="text-gray-600 text-sm">User ID: {follower.from}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(follower.from, follower.to)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out w-full"
                            >
                                <FaUserMinus className="inline mr-2" /> Remove Follower
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-gray-600 text-lg">
                        No followers found.
                    </p>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default Followers;
