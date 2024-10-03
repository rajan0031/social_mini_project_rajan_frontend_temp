import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllBlogRoutes, blogsDetails, allBlogsByTagName } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import SuggestedUsers from '../components/HomePageSplittedComponents/SuggestedUsers/SuggestedUsers';
import BlogList from '../components/HomePageSplittedComponents/BlogList/BlogList';
import RecentUsers from '../components/HomePageSplittedComponents/RecentUsers/RecentUsers';
import BlogHeader from '../components/HomePageSplittedComponents/BlogHeader/BlogHeader';
import BlogPost from '../components/HomePageSplittedComponents/BlogPost/BlogPost';

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [likesMap, setLikesMap] = useState({});
    const [likeCountMap, setLikeCountMap] = useState({});
    const [currentUser, setCurrentUser] = useState();
    const [expandedTagPosts, setExpandedTagPosts] = useState({});
    const [visiblePosts, setVisiblePosts] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            const storedUser = localStorage.getItem("blog-user");
            if (!storedUser) {
                navigate("/");
                return;
            }
            const userDetails = JSON.parse(storedUser);
            setCurrentUser(userDetails);
        };
        fetchUserFromLocal();
    }, []);

    const getAllBlogs = async () => {
        try {
            const response = await axios.get(getAllBlogRoutes);
            const blogsData = response.data.blogs;
            setBlogs(blogsData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    useEffect(() => {
        if (visiblePosts < blogs.length) {
            const timer = setTimeout(() => {
                setVisiblePosts(prev => prev + 3);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [visiblePosts, blogs.length]);

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    };

    const handleTags = async (tag) => {
        try {
            const response = await axios.get(`${allBlogsByTagName}/${tag}`);
            const blogByTag = response.data.blog;
            navigate(`/tag/${tag}`, { state: { blogByTag, tag } });
        } catch (err) {
            console.log(err);
        }
    };

    const handleLikes = (blogId) => {
        setLikesMap(prev => ({ ...prev, [blogId]: !prev[blogId] }));
        setLikeCountMap(prev => {
            const currentLikes = prev[blogId] || 0;
            return { ...prev, [blogId]: likesMap[blogId] ? currentLikes - 1 : currentLikes + 1 };
        });
    };

    const handleAuthorProfile = (blog) => {
        if (currentUser && blog.id === currentUser._id) {
            navigate('/userprofile');
        } else {
            navigate("/allusersprofiles", {
                state: {
                    id: blog.id,
                    currentUserId: currentUser ? currentUser._id : null,
                    author: blog.author,
                }
            });
        }
    };

    const toggleShowMoreTags = (blogId) => {
        setExpandedTagPosts((prevState) => ({
            ...prevState,
            [blogId]: !prevState[blogId],
        }));
    };

    return (
        <div className="container mx-auto flex flex-col md:flex-row">
            {/* Show SuggestedUsers only on medium and larger screens */}
            <div className="hidden md:block">
                <SuggestedUsers />
            </div>
            <div className="w-full md:w-1/2 overflow-y-scroll h-screen">
                <BlogHeader />
                <BlogList
                    blogs={blogs}
                    visiblePosts={visiblePosts}
                    handleBlogsDetails={handleBlogsDetails}
                    handleTags={handleTags}
                    handleLikes={handleLikes}
                    likeCountMap={likeCountMap}
                    handleAuthorProfile={handleAuthorProfile}
                    toggleShowMoreTags={toggleShowMoreTags}
                    expandedTagPosts={expandedTagPosts}
                />
            </div>
            {/* Show RecentUsers only on medium and larger screens */}
            <div className="hidden md:block">
                <RecentUsers />
            </div>
        </div>
    );
}

export default Home;
