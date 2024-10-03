import React from 'react';
import { FaCoffee, FaUserCircle, FaRocket } from 'react-icons/fa';

const RecentUsers = () => {
    return (
        <div className="w-1/4 p-4 bg-gray-200 rounded-lg shadow-lg ml-4">
            <h2 className="text-2xl font-bold mb-4"><FaCoffee className="inline-block mr-2" /> Recent Users</h2>
            {/* Dummy recent users */}
            {["Recent User1", "Recent User2", "Recent User3", "Recent User4", "Recent User5"].map((user, index) => (
                <div key={index} className="flex items-center mb-2 p-2 border rounded hover:bg-gray-300 cursor-pointer">
                    <FaUserCircle size={40} className="mr-2" />
                    <span>{user}</span>
                </div>
            ))}
            <h2 className="text-2xl font-bold mt-4 mb-2"><FaRocket className="inline-block mr-2" /> Join Us</h2>
            <p className="text-gray-700 mb-2">
                We aim to inspire, educate, and entertain.
                Our blog is a space where ideas flourish, and creativity knows no bounds.
            </p>
        </div>
    );
};

export default RecentUsers;
