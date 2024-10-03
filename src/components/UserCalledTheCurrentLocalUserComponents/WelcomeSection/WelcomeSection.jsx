import React from 'react';

const WelcomeSection = () => {
    return (
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold">Welcome!</h2>
            <p className="text-gray-700">
                Here you can view the users who have called you. 
                Connect with your contacts instantly! <span role="img" aria-label="wave">👋</span>
            </p>
        </div>
    );
};

export default WelcomeSection;
