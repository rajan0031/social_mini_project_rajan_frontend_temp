import React from 'react';
import { FaSearch, FaRegLightbulb } from 'react-icons/fa';

const IntroSection = () => {
    return (
        <div className="mb-8 text-center bg-gray-100 p-4 rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-2">Explore Your Interests! 🔍</h1>
            <p className="text-lg text-gray-600 mb-4">
                Discover a variety of blog posts tailored to your interests. Use the search results below to find content that resonates with you! 💡
            </p>
            <div className="flex justify-center space-x-4">
                <div className="flex items-center">
                    <FaSearch className="text-indigo-500 w-6 h-6 mr-2" />
                    <span className="text-gray-700">Search through a vast collection of blogs.</span>
                </div>
                <div className="flex items-center">
                    <FaRegLightbulb className="text-yellow-500 w-6 h-6 mr-2" />
                    <span className="text-gray-700">Get inspired and share your insights!</span>
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
