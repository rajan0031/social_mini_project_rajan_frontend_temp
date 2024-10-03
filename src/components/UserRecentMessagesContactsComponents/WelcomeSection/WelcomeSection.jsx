
import React from 'react';

const WelcomeSection = () => {
    return (
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold">Welcome Back!</h2>
            <p className="text-gray-700">
                This is your hub for recent conversations and calls. 
                Stay connected with your friends and family! <span role="img" aria-label="wave">👋</span>
            </p>
        </div>
    );
};

export default WelcomeSection;
