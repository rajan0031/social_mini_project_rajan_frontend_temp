import React from 'react';
import { FaRegThumbsUp, FaComments, FaShieldAlt, FaUsers } from 'react-icons/fa';

export default function DifferenceFromOtherSocialMedia() {
    return (
        <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Why LibertyPost Stands Out! 🌟
                </h1>
                <p className="text-lg text-center mb-6 text-gray-600">
                    LibertyPost is not just another social media platform. We are dedicated to fostering a community where every voice matters! 🗣️💬
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                        <FaRegThumbsUp size={50} className="text-blue-600 mb-3" />
                        <h2 className="text-xl font-semibold">Freedom to Express! ✊</h2>
                        <p className="text-gray-600 text-center">
                            Unlike other platforms, we celebrate every voice, allowing users to share all kinds of concerns without fear.
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                        <FaComments size={50} className="text-green-600 mb-3" />
                        <h2 className="text-xl font-semibold">No Censorship! 🚫</h2>
                        <p className="text-gray-600 text-center">
                            Here, no leader or politician will be deactivated for speaking positively. All constructive criticism is welcome!
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                        <FaShieldAlt size={50} className="text-red-600 mb-3" />
                        <h2 className="text-xl font-semibold">Safe Community! 🔒</h2>
                        <p className="text-gray-600 text-center">
                            We ensure a safe environment where harmful content is moderated, and users feel secure expressing their thoughts.
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                        <FaUsers size={50} className="text-purple-600 mb-3" />
                        <h2 className="text-xl font-semibold">Connect & Collaborate! 🤝</h2>
                        <p className="text-gray-600 text-center">
                            Join a vibrant community of like-minded individuals who share your passion for open dialogue and creativity.
                        </p>
                    </div>
                </div>
                <p className="mt-8 text-gray-700 text-center">
                    Embrace the freedom of expression and be part of a platform that values your voice! 🚀🌈
                </p>
            </div>
        </div>
    );
}
