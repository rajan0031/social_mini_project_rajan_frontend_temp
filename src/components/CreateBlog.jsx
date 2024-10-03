// CreateBlog.js
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { addBlogRoutes } from '../../utils/apiRoutes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Introduction from './CreateBlogComponents/Introduction/Introduction';
import { FaImage, FaUser, FaCalendarAlt, FaTags, FaPencilAlt, FaCheckCircle, FaQuestionCircle, FaClipboardList, FaBan } from 'react-icons/fa';

function CreateBlog() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [imageUrl, setImageURL] = useState('');
    const [featured, setFeatured] = useState(false);

    const editor = useRef(null);

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            const userDetails = await localStorage.getItem("blog-user");
            if (!userDetails) {
                navigate("/register");
            }
        };
        fetchUserFromLocal();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userDetails = await JSON.parse(localStorage.getItem('blog-user'));
            if (!userDetails) {
                navigate("/register");
            } else {
                const response = await axios.post(`${addBlogRoutes}/:${userDetails._id}`, {
                    id: userDetails._id,
                    title,
                    author,
                    date,
                    category,
                    content,
                    tags,
                    imageUrl,
                    featured,
                });

                if (response.data.status) {
                    toast.success(`🎉 ${response.data.message}`);
                    navigate("/myblogs");
                } else {
                    toast.error(`❌ ${response.data.message}`);
                }
            }
        } catch (err) {
            console.log(err);
            toast.error('😢 Error creating blog post');
        }
    };

    const handleTagChange = (tag) => {
        const updatedTags = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
        setTags(updatedTags);
    };

    const tagOptions = [
        'Technology', 'Sports', 'Current Affairs',
        'World Wide', 'Plants', 'Animals',
        'Health', 'Food', 'Travel', 'Fashion', 'Science',
    ];

    return (
        <>
            <Introduction />
            <div className="flex justify-between max-w-6xl mx-auto">
                {/* Left Guidelines */}
                <div className="w-1/3 p-4 bg-blue-50 border border-gray-300 rounded-md shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">
                        📝 What to Write
                    </h3>
                    <ul className="list-disc list-inside">
                        <li className="mb-2">
                            <FaClipboardList className="inline mr-2 text-blue-600" />
                            <strong>Provide Valuable Insights:</strong> Share your unique perspective on the topic! 💡
                        </li>
                        <li className="mb-2">
                            <FaClipboardList className="inline mr-2 text-blue-600" />
                            <strong>Be Clear and Concise:</strong> Keep your language simple and your points clear. ✍️
                        </li>
                        <li className="mb-2">
                            <FaClipboardList className="inline mr-2 text-blue-600" />
                            <strong>Use Engaging Images:</strong> Add relevant images to make your post visually appealing! 🖼️
                        </li>
                        <li className="mb-2">
                            <FaClipboardList className="inline mr-2 text-blue-600" />
                            <strong>Include References:</strong> Cite your sources for credibility. 📚
                        </li>
                        <li>
                            <FaClipboardList className="inline mr-2 text-blue-600" />
                            <strong>Interact with Readers:</strong> Encourage comments and respond to them. 🤝
                        </li>
                    </ul>
                </div>

                {/* Right Guidelines */}
                <div className="w-1/3 p-4 bg-red-50 border border-gray-300 rounded-md shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">
                        🚫 What Not to Write
                    </h3>
                    <ul className="list-disc list-inside">
                        <li className="mb-2">
                            <FaBan className="inline mr-2 text-red-600" />
                            <strong>Avoid Plagiarism:</strong> Always write original content! 🚷
                        </li>
                        <li className="mb-2">
                            <FaBan className="inline mr-2 text-red-600" />
                            <strong>Don’t Use Offensive Language:</strong> Keep it respectful and professional. 🙅‍♂️
                        </li>
                        <li className="mb-2">
                            <FaBan className="inline mr-2 text-red-600" />
                            <strong>Avoid Overly Technical Jargon:</strong> Make it accessible for all readers. 🧩
                        </li>
                        <li className="mb-2">
                            <FaBan className="inline mr-2 text-red-600" />
                            <strong>Don’t Spam:</strong> Avoid unnecessary links and promotions. 🚫
                        </li>
                        <li>
                            <FaBan className="inline mr-2 text-red-600" />
                            <strong>Avoid Long Paragraphs:</strong> Break text into manageable chunks for readability. 📜
                        </li>
                    </ul>
                </div>

                {/* Form Section */}
                <div className="w-1/3">
                    <form onSubmit={handleSubmit} className="p-8 border rounded-md shadow-lg bg-gradient-to-br from-blue-50 to-white mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
                            📝 Create a New Blog
                        </h2>

                        {/* Title Input */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2 flex items-center">
                                <FaPencilAlt className="mr-2 text-blue-600" /> Title <FaQuestionCircle className="ml-2 text-gray-500" title="Enter a catchy title for your blog!" />
                            </label>
                            <input type="text" id="title" placeholder="🌟 Enter blog title" onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md" />
                        </div>

                        {/* Author Input */}
                        <div className="mb-4">
                            <label htmlFor="author" className="block text-gray-700 font-bold mb-2 flex items-center">
                                <FaUser className="mr-2 text-blue-600" /> Author <FaQuestionCircle className="ml-2 text-gray-500" title="Your name or username!" />
                            </label>
                            <input type="text" id="author" placeholder="👤 Enter author name" onChange={(e) => setAuthor(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md" />
                        </div>

                        {/* Date Input */}
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-gray-700 font-bold mb-2 flex items-center">
                                <FaCalendarAlt className="mr-2 text-blue-600" /> Date <FaQuestionCircle className="ml-2 text-gray-500" title="Select the date of the blog!" />
                            </label>
                            <input type="date" id="date" onChange={(e) => setDate(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md" />
                        </div>

                        {/* Category Select */}
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-2 flex items-center">
                                <FaTags className="mr-2 text-blue-600" /> Category <FaQuestionCircle className="ml-2 text-gray-500" title="Choose a relevant category!" />
                            </label>
                            <select id="category" onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md">
                                <option value="" disabled>Select one</option>
                                {tagOptions.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>{option}</option>
                                ))}
                            </select>
                        </div>

                        {/* Content Editor */}
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                            <JoditEditor ref={editor} value={content} onChange={newContent => setContent(newContent)} />
                        </div>

                        {/* Tags Selection */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2 flex items-center">
                                <FaTags className="mr-2 text-blue-600" /> Tags <FaQuestionCircle className="ml-2 text-gray-500" title="Select relevant tags for your blog!" />
                            </label>
                            <div className="flex flex-wrap">
                                {tagOptions.map((tag) => (
                                    <label key={tag} className="inline-flex items-center mr-4 mb-2 cursor-pointer">
                                        <input type="checkbox" checked={tags.includes(tag)} onChange={() => handleTagChange(tag)} className="form-checkbox h-5 w-5 text-blue-500" />
                                        <span className="ml-2 text-gray-800">{tag}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Image URL Input */}
                        <div className="mb-4">
                            <label htmlFor="imageURL" className="block text-gray-700 font-bold mb-2 flex items-center">
                                <FaImage className="mr-2 text-blue-600" /> Image URL <FaQuestionCircle className="ml-2 text-gray-500" title="Provide a link to the blog's featured image!" />
                            </label>
                            <input type="text" id="imageURL" placeholder="🖼️ Enter image URL" onChange={(e) => setImageURL(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md" />
                        </div>

                        {/* Featured Checkbox */}
                        <div className="mb-4 flex items-center">
                            <input type="checkbox" id="featured" checked={featured} onChange={() => setFeatured(!featured)} className="mr-2" />
                            <label htmlFor="featured" className="text-gray-700 font-bold">✨ Featured</label>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full transition duration-300 flex items-center justify-center shadow-lg">
                            <FaCheckCircle className="mr-2" /> 📨 Submit
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default CreateBlog;
