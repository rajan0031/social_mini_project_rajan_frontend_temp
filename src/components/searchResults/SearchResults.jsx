import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { searchResults } from '../../../utils/searchResultsApis/searchResultsApis';
import IntroSection from '../BlogSearchResultsComponents/IntroSection/IntroSection';
import SearchResultCard from '../BlogSearchResultsComponents/SearchResultCard/SearchResultCard';
import { blogsDetails } from '../../../utils/apiRoutes';

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
        <div className="container mx-auto mt-10">
            <IntroSection />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResultsFromDataBase.map((result, index) => (
                    <SearchResultCard
                        key={index}
                        result={result}
                        currentUser={currentUser}
                        onBlogDetails={handleBlogsDetails}
                    />
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
