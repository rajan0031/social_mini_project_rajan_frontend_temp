import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import read from "../../../../src/assets/read.png";

const SearchResultCard = ({ result, currentUser, onBlogDetails }) => {
    const navigate = useNavigate();
    const [showAllTags, setShowAllTags] = useState(false);

    const handleTags = (tag) => {
        navigate(`/tag/${tag}`);
    };

    const handleAuthorProfile = (blog) => {
        if (blog.id === currentUser._id) {
            navigate('/userprofile');
        } else {
            navigate("/allusersprofiles", {
                state: {
                    id: blog.id,
                    currentUserId: currentUser._id,
                    author: blog.author,
                }
            });
        }
    };

    const handleCardClick = () => {
        onBlogDetails(result._id);
    };

    const toggleTags = () => {
        setShowAllTags(prev => !prev);
    };

    return (
        <div 
            className="border p-4 rounded bg-white shadow hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={handleCardClick} // Make the entire card clickable
        >
            <img src={result.imageUrl} alt={result.title} className="w-full h-32 object-cover mb-4 rounded" />
            <h2 className="text-xl font-bold mb-2">{result.title}</h2>
            <button onClick={() => handleAuthorProfile(result)}>
                <p className="text-gray-600 mb-2">{result.author}</p>
            </button>
            <p className="text-gray-500">{result.category}</p>
            <div className="flex mt-4 space-x-2 flex-wrap">
                {result.tags.slice(0, showAllTags ? result.tags.length : 4).map((tag, tagIndex) => (
                    <button
                        key={tagIndex}
                        onClick={() => handleTags(tag)}
                        className="bg-green-300 hover:bg-green-400 text-green-800 py-1 px-2 rounded transition duration-300 ease-in-out mb-1"
                    >
                        <span className="px-2 py-1 text-xs text-gray-700 rounded">{tag}</span>
                    </button>
                ))}
                {result.tags.length > 4 && !showAllTags && (
                    <button 
                        onClick={toggleTags}
                        className="text-blue-500 text-sm underline"
                    >
                        Show More
                    </button>
                )}
                {showAllTags && (
                    <button 
                        onClick={toggleTags}
                        className="text-blue-500 text-sm underline"
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchResultCard;
