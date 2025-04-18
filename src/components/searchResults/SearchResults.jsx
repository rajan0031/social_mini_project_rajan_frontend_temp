import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { searchResults } from '../../../utils/searchResultsApis/searchResultsApis';
import IntroSection from '../BlogSearchResultsComponents/IntroSection/IntroSection';
import SearchResultCard from '../BlogSearchResultsComponents/SearchResultCard/SearchResultCard';
import { blogsDetails } from '../../../utils/apiRoutes';
import { FaSearch, FaArrowRight, FaLeaf, FaBookOpen } from 'react-icons/fa'; // Importing icons

function SearchResults() {
    const location = useLocation();
    const searchData = location.state?.searchData;
    const [searchResultsFromDataBase, setSearchResultsFromDataBase] = useState([]);
    const [currentUser, setCurrentUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.post(`${searchResults}`, {
                    searchData: searchData,
                });
                if (response) {
                    setSearchResultsFromDataBase(response.data.response);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchResults();
    }, [searchData]);

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
    }, [navigate]);

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mx-auto mt-10 px-4">
            <IntroSection />
            
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-6">
                    🌱 Search Results for "{searchData}" 🌱
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResultsFromDataBase.length > 0 ? (
                        searchResultsFromDataBase.map((result, index) => (
                            <SearchResultCard
                                key={index}
                                result={result}
                                currentUser={currentUser}
                                onBlogDetails={handleBlogsDetails}
                            />
                        ))
                    ) : (
                        <div className="col-span-full">
                            <p className="text-lg text-gray-600">
                                No results found! 🌿 Please try a different search. 🌼
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10 text-center">
                <button 
                    onClick={() => navigate('/')} 
                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full shadow-md text-lg flex items-center justify-center mx-auto">
                    <FaArrowRight className="mr-2" />
                    Go back to Home 🌱
                </button>
            </div>
        </div>
    );
}

export default SearchResults;
