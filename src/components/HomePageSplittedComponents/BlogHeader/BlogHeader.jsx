import React from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const BlogHeader = () => {
    return (
        <div className="bg-slate-500 text-white p-8 rounded-lg shadow-lg text-center mb-6">
            <h1 className="text-4xl font-bold mb-4">Discover the Latest Blogs & Insights</h1>
            <p className="text-lg">
                Dive into a world of creativity and inspiration with blogs on various topics ranging from tech, lifestyle, travel, and more.
                Find your favorite content, connect with passionate authors, and share your thoughts.
                <IoMdInformationCircleOutline size={30} className="inline-block ml-2" />
            </p>
        </div>
    );
};

export default BlogHeader;
