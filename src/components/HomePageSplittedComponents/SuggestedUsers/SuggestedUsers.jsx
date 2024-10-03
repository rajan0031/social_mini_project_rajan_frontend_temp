import React from 'react';
import { FaUserCircle, FaUsers } from 'react-icons/fa';

const SuggestedUsers = () => {
    return (
        <div className="w-1/4 p-4 bg-gray-200 rounded-lg shadow-lg mr-4">
            <h2 className="text-2xl font-bold mb-4"><FaUsers className="inline-block mr-2" /> Suggested Users</h2>
            {/* Dummy user profiles */}
            {["User1", "User2", "User3", "User4"].map((user, index) => (
                <div key={index} className="flex items-center mb-2 p-2 border rounded hover:bg-gray-300 cursor-pointer">
                    <FaUserCircle size={40} className="mr-2" />
                    <span>{user}</span>
                </div>
            ))}
        </div>
    );
};

export default SuggestedUsers;
