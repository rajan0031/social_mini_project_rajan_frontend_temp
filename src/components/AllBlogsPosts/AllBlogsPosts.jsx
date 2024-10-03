import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllBlogRoutes, blogsDetails, allBlogsByTagName } from '../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { FaTags, FaUserCircle, FaThumbsUp, FaStar } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';

function AllBlogsPosts() {
    const [allPostsFromDataBase, setAllPostsFromDataBase] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));
                if (!userDetails) {
                    navigate("/");
                } else {
                    setCurrentUser(userDetails);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserFromLocal();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${getAllBlogRoutes}`);
                setAllPostsFromDataBase(response.data.blogs);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    };

    const nextPost = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allPostsFromDataBase.length);
    };

    const prevPost = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + allPostsFromDataBase.length) % allPostsFromDataBase.length);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between container mx-auto px-4 bg-slate-500 py-4">
            {/* Left Side Content */}
            <div className="w-full md:w-1/4 bg-white p-4 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">🚀 Welcome to LibertyPost! 🚀</h2>
                <p>
                    We’re excited to revolutionize blogging! 🌟 Write your story, engage with others, and connect with friends!
                    💬
                </p>
                <p className="mt-4">
                    Key Features:
                    <ul className="list-disc list-inside">
                        <li>✅ Write, edit, and delete your posts!</li>
                        <li>💬 Engage with the community—comment, like, and share!</li>
                        <li>🔔 Create or join social groups!</li>
                    </ul>
                </p>
            </div>

            {/* Blog Posts Slider */}
            <div className="flex-grow md:w-1/2 relative">
                <div className="absolute inset-0 flex justify-center items-center">
                    {allPostsFromDataBase.length > 0 && (
                        <div
                            className="border p-4 rounded bg-white shadow-md transform transition-all duration-300"
                            onClick={() => handleBlogsDetails(allPostsFromDataBase[currentIndex]._id)} // Redirect on click
                        >
                            <img src={allPostsFromDataBase[currentIndex].imageUrl} alt={allPostsFromDataBase[currentIndex].title} className="w-full h-32 object-cover mb-4 rounded" />
                            <h2 className="text-xl font-bold mb-2">
                                {allPostsFromDataBase[currentIndex].title} <FaStar className="inline-block text-yellow-500" />
                            </h2>
                            <button className="flex items-center mb-2">
                                <FaUserCircle className="mr-2" />
                                <p className="text-gray-600">{allPostsFromDataBase[currentIndex].author}</p>
                            </button>
                            <p className="text-gray-500 mb-2">{allPostsFromDataBase[currentIndex].category}</p>
                            <div className="flex mt-4 space-x-2">
                                {allPostsFromDataBase[currentIndex].tags.slice(0, 4).map((tag, tagIndex) => (
                                    <button key={tagIndex} className="bg-green-300 hover:bg-green-400 text-green-800 py-1 px-2 rounded transition duration-300 ease-in-out">
                                        <FaTags className="inline-block mr-1" />
                                        <span className="text-xs text-gray-700">{tag}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <FaThumbsUp className="inline-block mr-1" /> Like
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-between mt-4">
                    <button onClick={prevPost} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                        Previous
                    </button>
                    <button onClick={nextPost} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                        Next
                    </button>
                </div>
            </div>

            {/* Right Side Content */}
            <div className="w-full md:w-1/4 bg-white p-4 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">🌟 Key Features of LibertyPost 🌟</h2>
                <p>
                    • Write, edit, and delete your posts! <br />
                    • Engage with the community—comment, like, share! <br />
                    • Create or join social groups! <br />
                    • Chat directly with users, video calling is on the way! <br />
                    • Freedom of Speech with Responsibility!
                </p>
            </div>
        </div>
    );
}

export default AllBlogsPosts;
