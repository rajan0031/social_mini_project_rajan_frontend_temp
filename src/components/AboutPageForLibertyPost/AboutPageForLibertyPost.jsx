import React from 'react';
import { FaComments, FaPenFancy, FaShieldAlt, FaUsers } from 'react-icons/fa';

function AboutPageForLibertyPost() {
    return (
        <div
            className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
            style={{
                backgroundImage: "url('https://plus.unsplash.com/premium_photo-1689703068870-85e6c2c57fca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHNvY2lhbCUyMG1lZGlhfGVufDB8fDB8fHww')"
            }}
        >
            {/* Full-width transparent background */}
            <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg max-w-5xl w-full mx-4">
                <h1 className="text-5xl font-bold mb-4 text-gray-800 text-center">Welcome to LibertyPost! 🗽</h1>
                <p className="text-lg mb-6 text-gray-700 text-center">
                    At LibertyPost, we believe in the power of words and the importance of sharing thoughts freely.
                    🌍✨ Our platform is a space where everyone can express themselves without fear.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center p-4 bg-gray-100 bg-opacity-40 rounded-lg shadow-md">
                        <FaComments size={50} className="text-blue-600 mb-2" />
                        <h2 className="text-xl font-semibold">Engage in Conversations 💬</h2>
                        <p className="text-gray-600">
                            Share your opinions and hear from others. Everyone has a voice that deserves to be heard!
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-100 bg-opacity-40 rounded-lg shadow-md">
                        <FaPenFancy size={50} className="text-green-600 mb-2" />
                        <h2 className="text-xl font-semibold">Write Your Concerns ✍️</h2>
                        <p className="text-gray-600">
                            Whether it's an idea or a concern, your words can make a difference.
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-100 bg-opacity-40 rounded-lg shadow-md">
                        <FaShieldAlt size={50} className="text-red-600 mb-2" />
                        <h2 className="text-xl font-semibold">Safety & Moderation 🔒</h2>
                        <p className="text-gray-600">
                            We ensure a safe environment where freedom of speech is protected, while harmful content is moderated.
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-100 bg-opacity-40 rounded-lg shadow-md">
                        <FaUsers size={50} className="text-purple-600 mb-2" />
                        <h2 className="text-xl font-semibold">Join Our Community 👥</h2>
                        <p className="text-gray-600">
                            Connect with like-minded individuals and expand your network of friends and collaborators.
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-gray-700 text-center">
                    Let's work together to create a more open and inclusive world! 🚀🌈
                </p>
            </div>
        </div>
    );
}

export default AboutPageForLibertyPost;
