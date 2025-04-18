import React from 'react';
import { FaPhoneAlt, FaPhoneSlash } from 'react-icons/fa'; // Importing React icons

const CallLogsList = ({ allCallLogsFromOtherUsers, handleJoinCall, handleLeaveCall }) => {
    return (
        <div>
            {allCallLogsFromOtherUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allCallLogsFromOtherUsers.map(callLog => (
                        <div
                            key={callLog._id}
                            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
                        >
                            <p className="text-lg font-semibold text-gray-800">🌿 Call ID: {callLog._id} 🌿</p>
                            <p className="text-gray-600">👤 Caller ID: {callLog.from}</p>
                            <p className="text-gray-600">📱 Receiver ID: {callLog.to}</p>
                            <div className="flex space-x-4 mt-3">
                                <button
                                    onClick={() => handleJoinCall(callLog)}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    <FaPhoneAlt className="inline-block mr-2" />
                                    Join Call 📞
                                </button>
                                <button
                                    onClick={() => handleLeaveCall(callLog)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    <FaPhoneSlash className="inline-block mr-2" />
                                    Leave Call ❌
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center mt-5">No users called you. 🌸</p>
            )}
        </div>
    );
};

export default CallLogsList;
