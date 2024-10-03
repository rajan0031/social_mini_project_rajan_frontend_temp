import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { alluserProfile } from "../../utils/apiRoutes";
import axios from 'axios';
import { following } from '../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { useNavigate } from 'react-router-dom';
// import { followers } from "../../utils/follow_following_utils/apiFollowAndFollowingRoutes";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import { followerDetails } from '../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { Unfollowings } from '../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { io } from "socket.io-client";

import { host } from '../../utils/apiRoutes';


function AllUsersProfile() {
    const socket = useRef();
    const location = useLocation();
    const userId = location.state?.id;
    const author = location.state?.author;
    const [currentUserDetails, setCurrentUserDetails] = useState();
    const [localStorageUser, setLocalStorageUser] = useState();
    const [followingOrNot, setFollowingOrNot] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));
                if (!userDetails) {
                    navigate("/register");
                } else {
                    setLocalStorageUser(userDetails);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserFromLocal();
    }, []);

    useEffect(() => {
        if (localStorageUser) {
            socket.current = io(host);
            socket.current.emit("add-user", localStorageUser._id);
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [localStorageUser]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await axios.get(`${alluserProfile}/${userId}`);
            setCurrentUserDetails(response.data.response[0]);
        };
        fetchUserDetails();
    }, [userId]);

    useEffect(() => {
        const fetchFollowingStatus = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));
                const response = await axios.post(`${followerDetails}`, {
                    from: userDetails._id,
                    to: userId,
                });
                setFollowingOrNot(response.data.response[0]?.following);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFollowingStatus();
    }, [userId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {currentUserDetails ? (
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <UserDetails userDetails={currentUserDetails} author={author} />
                    <ActionButtons
                        author={author}
                        currentUserDetails={currentUserDetails}
                        localStorageUser={localStorageUser}
                        followingOrNot={followingOrNot}
                        setFollowingOrNot={setFollowingOrNot}
                    />
                </div>
            ) : (
                <div className="bg-white p-8 rounded shadow-md w-96 text-center">
                    <p className="text-gray-600 mb-4">User has not set their profile!.</p>
                    <button disabled className="bg-gray-500 text-white py-2 px-4 rounded">Message</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default AllUsersProfile;
