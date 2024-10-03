import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { followings, deleteFollower } from '../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Icons
import { FaUserAltSlash, FaUserAlt } from 'react-icons/fa';
import { MdPersonRemove, MdPersonAddAlt1 } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsPersonSquare } from 'react-icons/bs';

function Following() {
    const [followingLists, setFollowingsLists] = useState([]);
    const location = useLocation();
    const user = location.state?.user;

    // Handle removing a following user
    const handleRemove = async (from, to) => {
        console.log("Unfollow clicked", from, to);

        try {
            const response = await axios.post(`${deleteFollower}`, {
                from: from,
                to: to,
            });

            if (response) {
                toast.info("You have unfollowed this user.");
                setFollowingsLists(prevList => prevList.filter(user => user.to !== to));
            }

        } catch (err) {
            console.log(err);
            toast.error("Failed to unfollow. Please try again.");
        }
    };

    // Fetching the list of users the current user is following
    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const response = await axios.post(`${followings}`, {
                    from: user._id,
                });

                setFollowingsLists(response.data.response);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFollowings();
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
                    This page shows you the list of users you are currently following. You can view their profile details and easily unfollow them if you choose to. Manage your connections and stay updated with people you follow.
                </p>
            </div>

            <div className="flex items-center mb-6">
                <MdPersonAddAlt1 className="text-blue-500 text-4xl mr-3" />
                <h1 className="text-3xl font-bold text-gray-800">Following</h1>
            </div>

            {followingLists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {followingLists.map((followingUser) => (
                        <div key={followingUser._id} className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300">
                            <img
                                src={followingUser.profilePicture}
                                alt={`${followingUser.toName}'s Profile`}
                                className="w-16 h-16 object-cover rounded-full mx-auto mb-4"
                            />
                            <p className="text-lg font-bold text-center mb-2">{followingUser.toName}</p>
                            <p className="text-sm text-gray-500 text-center mb-2">{followingUser.bio}</p>
                            <div className="text-center text-blue-600 mb-4">
                                <BsPersonSquare className="text-2xl inline" />
                                <span className="ml-2">{followingUser.to}</span>
                            </div>
                            {/* Unfollow Button */}
                            <button
                                onClick={() => handleRemove(followingUser.from, followingUser.to)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mt-4 transition duration-300 w-full"
                            >
                                <FaUserAltSlash className="inline mr-2" /> Unfollow
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-gray-600 text-lg">
                        You are not following anyone.
                    </p>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Following;
