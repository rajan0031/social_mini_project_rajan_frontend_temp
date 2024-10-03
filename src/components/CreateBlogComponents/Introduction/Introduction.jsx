// Introduction.js
import React from 'react';
import { FaPenFancy, FaClipboardList, FaRegImages } from 'react-icons/fa';

const Introduction = () => {
    return (
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center">
                Create Your Blog Post <FaPenFancy className="ml-2" />
            </h2>
            <p className="mb-2 text-gray-700">
                Welcome to the blog creation tool! This page allows you to write and share your thoughts with the world. Please fill in the details below to create an engaging blog post.
            </p>
            <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li className="flex items-center">
                    <FaClipboardList className="mr-2" />
                    <span>Write a captivating title and content.</span>
                </li>
                <li className="flex items-center">
                    <FaRegImages className="mr-2" />
                    <span>Include an image to make your post visually appealing.</span>
                </li>
                <li className="flex items-center">
                    <FaClipboardList className="mr-2" />
                    <span>Add relevant tags to help readers find your blog.</span>
                </li>
            </ul>
            <p className="text-gray-600">
                Once you're ready, hit the "Submit" button to publish your blog post!
            </p>
        </div>
    );
};

export default Introduction;
