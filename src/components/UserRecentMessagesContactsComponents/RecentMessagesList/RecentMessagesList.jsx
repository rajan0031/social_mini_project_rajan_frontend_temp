import React from 'react';

const RecentMessagesList = ({ recentUsersMessages, handleDirectMessageToUser }) => {
    return (
        <div>
            {recentUsersMessages.length > 0 ? (
                recentUsersMessages.map((user, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <button
                            onClick={() => handleDirectMessageToUser(user)}
                            className="text-blue-500 font-semibold hover:underline mb-2"
                        >
                            {user?.fromName ? user.toName : user.to}
                        </button>
                        <p className="text-gray-600">{user.message}</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {new Date(user.timestamp).toLocaleString()}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No recent messages.</p>
            )}
        </div>
    );
};

export default RecentMessagesList;
