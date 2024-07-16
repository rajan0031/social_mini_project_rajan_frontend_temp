import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dark from "../assets/black.png";
import light from "../assets/light.png";

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
                        <svg className={`${mobileMenuOpen ? 'hidden' : 'block'} w-5 h-5`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                        <svg className={`${mobileMenuOpen ? 'block' : 'hidden'} w-5 h-5`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 1L1 13M1 1l15 12" />
                        </svg>
                    </button>
                </div>
                <div className={`absolute top-16 left-0 w-full bg-white border-r border-gray-200 dark:bg-gray-900 ${mobileMenuOpen ? 'block' : 'hidden'} md:hidden md:relative md:w-auto md:order-1`} id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/myblogs" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Your Blogs posts</Link>
                        </li>
                        <li>
                            <Link to="/createblog" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Blogs</Link>
                        </li>
                        <li>
                            <Link to="/userprofile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Account</Link>
                        </li>
                        <li>
                            <a onClick={handleLogout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Logout</a>
                        </li>
                        <div className="flex items-center">
                            {mode ? (
                                <button onClick={handleModeChange} className="mode-button">
                                    <img className="bg-gray-50 h-5 w-5" src={light} alt="Light Mode" />
                                </button>
                            ) : (
                                <button onClick={handleModeChange} className="mode-button">
                                    <img className="h-5 w-5" src={dark} alt="Dark Mode" />
                                </button>
                            )}
                            <input value={searchData} onChange={handleSearchInputs} type="text" className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg outline-none ml-2" />
                            <button onClick={handleSearchBlog} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ml-2">Search</button>
                        </div>
                    </ul>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/myblogs" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Your Blogs posts</Link>
                        </li>
                        <li>
                            <Link to="/createblog" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Blogs</Link>
                        </li>
                        <li>
                            <Link to="/userprofile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Account</Link>
                        </li>
                        <li>
                            <a onClick={handleLogout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Logout</a>
                        </li>
                        <div className="flex items-center">
                            {mode ? (
                                <button onClick={handleModeChange} className="mode-button">
                                    <img className="bg-gray-50 h-5 w-5" src={light} alt="Light Mode" />
                                </button>
                            ) : (
                                <button onClick={handleModeChange} className="mode-button">
                                    <img className="h-5 w-5" src={dark} alt="Dark Mode" />
                                </button>
                            )}
                            <input value={searchData} onChange={handleSearchInputs} type="text" className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg outline-none ml-2" />
                            <button onClick={handleSearchBlog} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ml-2">Search</button>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
