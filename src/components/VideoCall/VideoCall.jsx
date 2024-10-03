import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { registerCallRequest } from '../../../utils/VideoCallApiRoutes/VideoCallApiRoutes';
import { toast, ToastContainer } from 'react-toastify';
import { FaVideo, FaPhone, FaComments } from 'react-icons/fa';

function VideoCall() {
    const [callId, setCallId] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;
    const to = location.state?.to;

    useEffect(() => {
        setCallId(location.state?.callId || '');
    }, [location.state]);

    const handleJoin = async () => {
        console.log(from, to, callId);

        try {
            const response = await axios.post(registerCallRequest, {
                from: from,
                to: to,
                callId: callId,
            });

            if (response.data.status === false) {
                toast.info(response.data.message);
            } else {
                toast.success(response.data.message);
                navigate("/userrecentmessages");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to join the call. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
                    Join Video Call <FaVideo className="ml-2 text-blue-400" />
                </h1>
                <p className="mb-4 text-gray-700">
                    Enter your Room ID below to join the video call. If you need assistance, feel free to reach out!
                    <FaComments className="inline ml-1" />
                </p>
                <input
                    onChange={(e) => setCallId(e.target.value)}
                    value={callId}
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
                    type="text"
                    placeholder="Enter your Room ID"
                />
                <button
                    onClick={handleJoin}
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition duration-300 ease-in-out"
                    type="button"
                >
                    <FaPhone className="mr-2" />
                    Join
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default VideoCall;
