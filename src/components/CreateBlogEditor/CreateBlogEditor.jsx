import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { FaPen, FaRegFileAlt, FaTags } from 'react-icons/fa'; // Importing relevant icons
import { ToastContainer, toast } from 'react-toastify';

const CreateBlogEditor = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    const config = {
        placeholder: "Start typing your post content...",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        toast.success('Your blog post has been created successfully! 🎉'); // Notify user on submission
    };

    return (
        <div className="container mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Share Your Thoughts! 📝</h1>
            <p className="text-lg text-gray-600 text-center mb-6">
                Start writing your blog post below. Whether it's an idea, a story, or an experience, your voice matters!
                Let your creativity flow and connect with others. 🌟
            </p>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                        <FaPen className="mr-2 text-gray-600" /> Post Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter post title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                        <FaRegFileAlt className="mr-2 text-gray-600" /> Post Content
                    </label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={newContent => setContent(newContent)}
                        config={config}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                        <FaTags className="mr-2 text-gray-600" /> Post Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Post
                    </button>
                    <button
                        type="reset"
                        className="ml-4 bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Reset
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateBlogEditor;
