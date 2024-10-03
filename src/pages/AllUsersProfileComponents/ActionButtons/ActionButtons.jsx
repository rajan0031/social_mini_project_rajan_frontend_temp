import React from 'react';
import { FaComments, FaVideo, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';


import { followerDetails } from '../../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { following } from '../../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { followings } from '../../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { Unfollowings } from '../../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';

import { host } from '../../../../utils/apiRoutes';

const ActionButtons = ({ author, currentUserDetails, localStorageUser, followingOrNot, setFollowingOrNot }) => {
    const handleDirectMessage = () => {
        navigate("/directmessage", {
            state: {
                from: localStorageUser._id,
                to: currentUserDetails.userId,
                fromName: localStorageUser.username,
                toName: author,
            },
        });
    };

    const handleVideoCall = () => {
        const callId = Math.floor(Math.random() * 100000000);
        navigate("/videocall", {
            state: {
                from: localStorageUser._id,
                to: currentUserDetails.userId,
                callId: callId
            }
        });
    };

    const handleFollowing = async () => {
        setFollowingOrNot(true);
        try {
            const response = await axios.post(`${following}`, {
                from: localStorageUser._id,
                fromName: localStorageUser.username,
                to: currentUserDetails.userId,
                toName: author,
                following: true
            });
            toast.success(`Congratulations! You have followed ${author}`);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnFollow = async () => {
        setFollowingOrNot(false);
        try {
            const response = await axios.post(`${Unfollowings}`, {
                from: localStorageUser._id,
                to: currentUserDetails.userId,
                following: false
            });
            toast.info(`You have unfollowed ${author}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='px-4 flex justify-between mt-4'>
            <button onClick={handleDirectMessage} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center">
                <FaComments className="mr-2" /> Message
            </button>
            <button onClick={handleVideoCall} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center">
                <FaVideo className="mr-2" /> Video
            </button>
            {
                !followingOrNot ? (
                    <button onClick={handleFollowing} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center">
                        <FaUserPlus className="mr-2" /> Follow
                    </button>
                ) : (
                    <button onClick={handleUnFollow} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center">
                        <FaUserMinus className="mr-2" /> Unfollow
                    </button>
                )
            }
        </div>
    );
};

export default ActionButtons;
