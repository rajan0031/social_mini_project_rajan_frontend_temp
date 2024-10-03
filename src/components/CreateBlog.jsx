import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { addBlogRoutes } from '../../utils/apiRoutes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Introduction from './CreateBlogComponents/Introduction/Introduction';
import { FaImage, FaUser, FaCalendarAlt, FaTags, FaPencilAlt, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';

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

    // Check user registration
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
                    toast.success(`${response.data.message}`);
                    navigate("/myblogs");
                } else {
                    toast.error(`${response.data.message}`);
                }
            }
        } catch (err) {
            console.log(err);
            toast.error('Error creating blog post');
        }
    };

    const handleTagChange = (tag) => {
        const updatedTags = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
        setTags(updatedTags);
    };

    const tagOptions = [
        'Technology',
        'Sports',
        'Current Affairs',
        'World Wide',
        'Plants',
        'Animals',
        'Health',
        'Food',
        'Travel',
        'Fashion',
        'Science',
    ];

    return (
        <>
            <Introduction /> {/* Include the Introduction component */}
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                {/* Left and Right Sections */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    {/* Left Section: What to Write */}
                    <div className="flex-1 bg-blue-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2 text-blue-600">📝 What to Write</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Share your unique experiences and insights! 🌟</li>
                            <li>Engage with readers through questions and discussions! 💬</li>
                            <li>Use high-quality images to enhance your content! 🖼️</li>
                            <li>Be clear and concise in your writing! ✍️</li>
                        </ul>
                    </div>

                    {/* Right Section: What Not to Write */}
                    <div className="flex-1 bg-red-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2 text-red-600">🚫 What Not to Write</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Avoid plagiarism or copying others' work! 🚫</li>
                            <li>Do not share false information or rumors! ❌</li>
                            <li>Refrain from using offensive or discriminatory language! 🚫</li>
                            <li>Keep your content free of spammy links! 🔗</li>
                        </ul>
                    </div>
                </div>

                {/* Center Section: Blog Form */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">📚 Create a New Blog</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Input */}
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaPencilAlt className="mr-2 text-blue-600" /> Title
                            </label>
                            <input type="text" id="title" placeholder="Enter blog title" onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md" />
                        </div>

                        {/* Author Input */}
                        <div>
                            <label htmlFor="author" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaUser className="mr-2 text-blue-600" /> Author
                            </label>
                            <input type="text" id="author" placeholder="Enter author name" onChange={(e) => setAuthor(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md" />
                        </div>

                        {/* Date Input */}
                        <div>
                            <label htmlFor="date" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaCalendarAlt className="mr-2 text-blue-600" /> Date
                            </label>
                            <input type="date" id="date" onChange={(e) => setDate(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md" />
                        </div>

                        {/* Category Select */}
                        <div>
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaTags className="mr-2 text-blue-600" /> Category <FaQuestionCircle className="ml-2 text-gray-500" title="Select a relevant category for your blog!" />
                            </label>
                            <select id="category" onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md">
                                <option value="" disabled>Select one</option>
                                {tagOptions.map((option) => (
                                    <option key={option} value={option.toLowerCase()}>{option}</option>
                                ))}
                            </select>
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label htmlFor="content" className="block text-gray-700 font-bold mb-1">Content</label>
                            <JoditEditor ref={editor} value={content} onChange={newContent => setContent(newContent)} />
                        </div>

                        {/* Tags Selection */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-1 flex items-center">
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
                        <div>
                            <label htmlFor="imageURL" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaImage className="mr-2 text-blue-600" /> Image URL <FaQuestionCircle className="ml-2 text-gray-500" title="Provide a link to the blog's featured image!" />
                            </label>
                            <input type="text" id="imageURL" placeholder="🖼️ Enter image URL" onChange={(e) => setImageURL(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md" />
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center">
                            <input type="checkbox" id="featured" checked={featured} onChange={() => setFeatured(!featured)} className="mr-2" />
                            <label htmlFor="featured" className="text-gray-700 font-bold">🌟 Featured</label>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full transition duration-300 flex items-center justify-center">
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
