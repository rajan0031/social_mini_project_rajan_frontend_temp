import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { allCallLogsFromOthers, deleteRecentCallLogs } from '../../../utils/VideoCallApiRoutes/VideoCallApiRoutes';
import { useNavigate } from 'react-router-dom';
import WelcomeSection from '../UserCalledTheCurrentLocalUserComponents/WelcomeSection/WelcomeSection';
import CallLogsList from '../UserCalledTheCurrentLocalUserComponents/CallLogsList/CallLogsList';

function UserCalledTheCurrentLocalUser({ user }) {
    const [allCallLogsFromOtherUsers, setAllCallLogsFromOtherUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCallLogs = async () => {
            try {
                const response = await axios.post(allCallLogsFromOthers, { userId: user._id });
                if (response) {
                    setAllCallLogsFromOtherUsers(response.data.response);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchCallLogs();
    }, [user._id]);

    const handleJoinCall = (callLog) => {
        navigate("/videocallroom", {
            state: { roomId: callLog.callId.toString() },
        });
    };

    const handleLeaveCall = async (callLog) => {
        try {
            const response = await axios.post(deleteRecentCallLogs, {
                meetId: callLog.from,
                callLog: callLog,
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <WelcomeSection />
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Users Who Called You</h1>
            <CallLogsList
                allCallLogsFromOtherUsers={allCallLogsFromOtherUsers}
                handleJoinCall={handleJoinCall}
                handleLeaveCall={handleLeaveCall}
            />
        </div>
    );
}

export default UserCalledTheCurrentLocalUser;
