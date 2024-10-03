import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { allCallLogs, deleteRecentCallLogs } from '../../../utils/VideoCallApiRoutes/VideoCallApiRoutes';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaPhoneAlt, FaTrashAlt, FaHistory } from 'react-icons/fa';

function UsersRecentVideoCalls() {
    const [allCallLogsFromDataBase, setAllCallLogsFromDataBase] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCallLogs = async () => {
            try {
                const localUser = await JSON.parse(localStorage.getItem('blog-user'));
                const response = await axios.post(allCallLogs, {
                    userId: localUser?._id,
                });
                setAllCallLogsFromDataBase(response.data.response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCallLogs();
    }, []);

    // Handle joining a call
    const handleJoinCall = (callLog) => {
        navigate("/videocallroom", {
            state: {
                roomId: callLog.callId.toString(),
            }
        });
    };

    // Handle deleting call logs
    const handleLeaveCall = async (callLog) => {
        try {
            const response = await axios.post(deleteRecentCallLogs, {
                meetId: callLog.to,
                callLog: callLog,
            });
            console.log(response);
            setAllCallLogsFromDataBase(prevLogs => prevLogs.filter(log => log._id !== callLog._id)); // Remove the call log from the state
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
                Recent Video Calls <FaVideo className="ml-2 text-blue-400" />
            </h1>
            <p className="mb-6 text-gray-700 flex items-center">
                Here are the recent video calls you've made. Join any ongoing calls or remove them from your list for better organization. <FaHistory className="ml-2" />
            </p>
            {allCallLogsFromDataBase.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allCallLogsFromDataBase.map(callLog => (
                        <div
                            key={callLog._id}
                            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
                        >
                            <p className="text-lg font-semibold text-blue-800">Call ID: {callLog._id}</p>
                            <p className="text-gray-600">Caller ID: {callLog.from}</p>
                            <p className="text-gray-600">Receiver ID: {callLog.to}</p>
                            <p className="text-gray-500">Date: {new Date(callLog.timestamp).toLocaleString()}</p>
                            <div className="flex space-x-4 mt-3">
                                <button
                                    onClick={() => handleJoinCall(callLog)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                                >
                                    <FaPhoneAlt className="mr-2" />
                                    Join Call
                                </button>
                                <button
                                    onClick={() => handleLeaveCall(callLog)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                                >
                                    <FaTrashAlt className="mr-2" />
                                    Leave Call
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No recent video calls <span role="img" aria-label="no calls">🚫</span></p>
            )}
        </div>
    );
}

export default UsersRecentVideoCalls;
