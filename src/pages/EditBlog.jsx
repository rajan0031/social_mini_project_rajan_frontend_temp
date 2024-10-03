import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegEdit, FaUserEdit, FaCalendarAlt, FaTags, FaImage, FaStar } from 'react-icons/fa'; // Import relevant icons
import InputField from './EditBlogComponents/InputField/InputField';
import SelectField from './EditBlogComponents/SelectField/SelectField';
import TagSelector from './EditBlogComponents/TagSelector/TagSelector';
import ImageUploader from './EditBlogComponents/ImageUploader/ImageUploader';
import FeaturedToggle from './EditBlogComponents/FeaturedToggle/FeaturedToggle';
import EditorComponent from './EditBlogComponents/EditorComponent/EditorComponent';
import { editBlog } from '../../utils/apiRoutes';

function EditBlog() {
    const location = useLocation();
    const blogDetails = location.state?.blogDetails;
    const id = location.state?.id;
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [imageUrl, setImageURL] = useState('');
    const [featured, setFeatured] = useState(false);
    const [postId, setPostId] = useState("");

    const editor = useRef(null);

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            const userDetails = await localStorage.getItem("blog-user");
            if (!userDetails) {
                navigate("/register");
            }
        }
        fetchUserFromLocal();
    }, [navigate]);

    useEffect(() => {
        if (blogDetails) {
            setTitle(blogDetails.title);
            setAuthor(blogDetails.author);
            setDate(blogDetails.date);
            setCategory(blogDetails.category);
            setContent(blogDetails.content);
            setTags(blogDetails.tags);
            setImageURL(blogDetails.imageUrl);
            setFeatured(blogDetails.featured);
            setPostId(id);
        }
    }, [blogDetails, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userDetails = await JSON.parse(localStorage.getItem('blog-user'));
            if (!userDetails) {
                navigate("/register");
            } else {
                const response = await axios.post(`${editBlog}/:${postId}`, {
                    postId,
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
                    toast.success("Your Blog has been Edited successfully!");
                    navigate("/myblogs");
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="max-w-2xl mx-auto mt-8 p-4 border rounded-md shadow-lg bg-gray-100 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                    <FaRegEdit className="inline-block mr-2" />
                    Edit Your Blog
                </h2>
                <p className="text-gray-600 mb-4">
                    <FaUserEdit className="inline-block mr-1" /> Update your blog details with ease. <br />
                    <FaCalendarAlt className="inline-block mr-1" /> Make sure to provide accurate information for a better experience.
                </p>
                <p className="text-gray-600 mb-4">
                    <FaTags className="inline-block mr-1" /> Use tags wisely to reach your audience effectively. <br />
                    <FaImage className="inline-block mr-1" /> Upload an attractive image to draw attention to your blog.
                </p>
                <p className="text-gray-600 mb-4">
                    <FaStar className="inline-block mr-1" /> Don't forget to feature your blog for more visibility!
                </p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 p-8 border rounded-md shadow-lg bg-white mb-8">
                <InputField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog title" />
                <InputField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter author name" />
                <InputField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <SelectField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <EditorComponent content={content} setContent={setContent} />
                <TagSelector tags={tags} setTags={setTags} />
                <ImageUploader imageUrl={imageUrl} setImageURL={setImageURL} />
                <FeaturedToggle featured={featured} setFeatured={setFeatured} />

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out">
                    Submit
                </button>
            </form>
            <ToastContainer />
        </>
    );
}

export default EditBlog;
