import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
// import { host } from "../../utils/host/host";

import { alluserProfile, host } from "../../utils/apiRoutes";
import {
    following,
    followerDetails,
    Unfollowings,
} from "../../utils/follow_following_utils/apiFollowAndFollowingRoutes";



function AllUsersProfile() {
    const socket = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const userId = location.state?.id;
    const author = location.state?.author;

    const [currentUserDetails, setCurrentUserDetails] = useState(null);
    const [localStorageUser, setLocalStorageUser] = useState(null);
    const [followingOrNot, setFollowingOrNot] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch user from localStorage
    const fetchLocalStorageUser = async () => {
        try {
            const userDetails = JSON.parse(localStorage.getItem("blog-user"));
            if (!userDetails) {
                navigate("/register");
            } else {
                setLocalStorageUser(userDetails);
            }
        } catch (err) {
            console.error("Error fetching user from localStorage:", err);
        }
    };

    // Fetch user profile details
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${alluserProfile}/${userId}`);
            setCurrentUserDetails(response.data.response[0]);
        } catch (err) {
            console.error("Error fetching user details:", err);
            toast.error("Failed to fetch user details.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch following status
    const fetchFollowingStatus = async () => {
        try {
            const userDetails = JSON.parse(localStorage.getItem("blog-user"));
            const response = await axios.post(`${followerDetails}`, {
                from: userDetails._id,
                to: userId,
            });
            setFollowingOrNot(response.data.response[0]?.following);
        } catch (err) {
            console.error("Error fetching following status:", err);
        }
    };

    // Initialize Socket
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

    // Load localStorage user
    useEffect(() => {
        fetchLocalStorageUser();
    }, []);

    // Load user details and following status
    useEffect(() => {
        if (userId) {
            fetchUserDetails();
            fetchFollowingStatus();
        }
    }, [userId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {isLoading ? (
                <div className="bg-white p-8 rounded shadow-md w-96 text-center">
                    <p className="text-gray-600">Loading user profile...</p>
                </div>
            ) : currentUserDetails ? (
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
                    <p className="text-gray-600 mb-4">User has not set their profile!</p>
                    <button disabled className="bg-gray-500 text-white py-2 px-4 rounded">
                        Message
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default AllUsersProfile;
