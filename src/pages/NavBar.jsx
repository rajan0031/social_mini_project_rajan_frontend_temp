import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiEdit, FiUser, FiLogOut, FiSearch } from 'react-icons/fi'; // Importing icons
import { MdLightMode, MdDarkMode } from 'react-icons/md'; // Light/Dark mode icons
import dark from "../assets/black.png"; // Fallback icons for dark/light mode
import light from "../assets/light.png"; // Fallback icons for dark/light mode

function NavBar() {
    const [mode, setMode] = useState(false);
    const [searchData, setSearchData] = useState("");
    const [currentUser, setCurrentUser] = useState();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('blog-user');
            navigate("/register");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = JSON.parse(localStorage.getItem("blog-user"));
                if (!userDetails) {
                    navigate("/register");
                } else {
                    setCurrentUser(userDetails);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserFromLocal();
    }, []);

    const handleModeChange = () => {
        setMode(!mode);
    };

    const handleSearchInputs = (e) => {
        setSearchData(e.target.value);
    };

    const handleSearchBlog = () => {
        navigate("/searchresults", {
            state: {
                searchData: searchData
            }
        });
        setSearchData("");
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded={mobileMenuOpen}
                        onClick={toggleMobileMenu}
                    >
                        <span className="sr-only">Open user menu</span>
                        {mobileMenuOpen ? (
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 1L1 13M1 1l15 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className={`absolute top-16 left-0 w-full bg-white border-r border-gray-200 dark:bg-gray-900 ${mobileMenuOpen ? 'block' : 'hidden'} md:hidden md:relative md:w-auto md:order-1`} id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/" className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200">
                                <FiHome className="mr-2" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/myblogs" className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200">
                                <FiEdit className="mr-2" /> Your Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/createblog" className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200">
                                <FiEdit className="mr-2" /> Create Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/userprofile" className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200">
                                <FiUser className="mr-2" /> My Account
                            </Link>
                        </li>
                        <li>
                            <a onClick={handleLogout} className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200">
                                <FiLogOut className="mr-2" /> Logout
                            </a>
                        </li>
                        <div className="flex items-center">
                            {mode ? (
                                <button onClick={handleModeChange} className="mode-button text-blue-600 hover:text-blue-800 transition duration-200">
                                    <MdLightMode className="h-5 w-5" />
                                </button>
                            ) : (
                                <button onClick={handleModeChange} className="mode-button text-blue-600 hover:text-blue-800 transition duration-200">
                                    <MdDarkMode className="h-5 w-5" />
                                </button>
                            )}
                            <div className="relative ml-2">
                                <input
                                    value={searchData}
                                    onChange={handleSearchInputs}
                                    type="text"
                                    className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg outline-none"
                                    placeholder="Search..."
                                />
                                <button onClick={handleSearchBlog} className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 transition duration-200">
                                    <FiSearch />
                                </button>
                            </div>
                        </div>
                    </ul>
                </div>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/" className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200" aria-current="page">
                                <FiHome className="mr-2" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/myblogs" className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200">
                                <FiEdit className="mr-2" /> Your Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/createblog" className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200">
                                <FiEdit className="mr-2" /> Create Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/userprofile" className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200">
                                <FiUser className="mr-2" /> My Account
                            </Link>
                        </li>
                        <li>
                            <a onClick={handleLogout} className="flex items-center py-2 px-3 text-blue-600 rounded hover:bg-blue-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-200">
                                <FiLogOut className="mr-2" /> Logout
                            </a>
                        </li>
                        <div className="flex items-center">
                            {mode ? (
                                <button onClick={handleModeChange} className="mode-button text-blue-600 hover:text-blue-800 transition duration-200">
                                    <MdLightMode className="h-5 w-5" />
                                </button>
                            ) : (
                                <button onClick={handleModeChange} className="mode-button text-blue-600 hover:text-blue-800 transition duration-200">
                                    <MdDarkMode className="h-5 w-5" />
                                </button>
                            )}
                            <div className="relative ml-2">
                                <input
                                    value={searchData}
                                    onChange={handleSearchInputs}
                                    type="text"
                                    className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg outline-none"
                                    placeholder="Search..."
                                />
                                <button onClick={handleSearchBlog} className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 transition duration-200">
                                    <FiSearch />
                                </button>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
