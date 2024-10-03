import { useEffect, useState } from 'react';
import axios from 'axios';
import { userProfile } from '../../utils/apiRoutes';
import { FaHome, FaMapMarkerAlt, FaMailBulk, FaGlobe, FaFlag, FaPhone, FaBriefcase, FaEdit, FaUserFriends, FaUserCheck, FaShieldAlt, FaComments, FaBookmark, FaUsers, FaUsersCog } from 'react-icons/fa';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserProfile } from '../../utils/apiRoutes';
import { editUserProfile } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import message from "../assets/message.png";

import AllUsers from '../components/AllUsers/AllUsers';
import accountsSettings from "../assets/accountSetting.png";
import savedPOst from "../assets/saved post.png";
import unsavedPost from "../assets/unsaved post.png";



function UserProfile() {
    const [user, setUser] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const [currentUserProfile, setCurrentUserProfile] = useState();
    const [handleEdit, setHandleEdit] = useState(false);
    const [handleFinalEdit, setHandleFinalEdit] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [CreateGroupFlag, setCreateGroupFlag] = useState(false);



    const navigate = useNavigate();



    // making the useState for the collecting the form data;
    const [profileImage, setProfileImage] = useState("");
    const [village, setVillage] = useState("");
    const [districk, setDistrick] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [proffession, setProfession] = useState("");
    const [about, setAbout] = useState("");
    const [accountType, setAccountType] = useState('');


    // redirect to register page if user is not register in the database

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await localStorage.getItem("blog-user");

                console.log(userDetails);
                if (!userDetails) {
                    navigate("/register");
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchUserFromLocal();
    }, []);






    // checking the user is existing in the database or not

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const localStorageUser = await JSON.parse(localStorage.getItem('blog-user'));
                if (localStorageUser) {

                    setUser(localStorageUser);

                }
                else {
                    toast.error("please register first");
                    navigate("/register");
                }
                // console.log(localStorageUser._id);

                try {

                    const response = await axios.get(`${getUserProfile}/${localStorageUser._id}`);
                    if (response.data.status) {

                        setCurrentUserProfile(response.data.response[0]);
                        // console.log("my user _id is", response.data.response[0].village);
                        setProfileCompleted(true);

                    }

                } catch (err) {
                    console.log(err);
                }

                setUserLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();


    }, []);



    const handleSubmitForm = async (e) => {
        e.preventDefault();


        try {

            const response = await axios.post(`${userProfile}`, {
                profileImage: profileImage,
                userId: user._id,
                village: village,
                districk: districk,
                pincode: pincode,
                state: state,
                country: country,
                phoneNumber: phoneNumber,
                proffession: proffession,
                about: about,
                accountType: accountType,
            });

            if (response.data.status) {
                toast.success("hello your profile is updated successfully");
                setProfileCompleted(true);
                setSubmit(true);
            }

        } catch (err) {
            console.log(err);
        }


    }

    // this below function is for the setting the account type of the user
    const handleAccountTypeChange = (value) => {
        setAccountType(value);
    };


    const handleEditProfile = () => {
        setProfileCompleted(false);
        setProfileImage(currentUserProfile.profileImage);
        setVillage(currentUserProfile.village);
        setDistrick(currentUserProfile.districk);
        setPincode(currentUserProfile.pincode);
        setState(currentUserProfile.state);
        setCountry(currentUserProfile.country);
        setPhoneNumber(currentUserProfile.phoneNumber);
        setProfession(currentUserProfile.proffession);
        setAbout(currentUserProfile.about);
        setAccountType(currentUserProfile.accountType);
        setHandleEdit(true);
    }


    // final edit function;

    const handleFinalEditProfile = async () => {


        try {
            const response = await axios.post(`${editUserProfile}`, {
                profileImage: profileImage,
                userId: user._id,
                village: village,
                districk: districk,
                pincode: pincode,
                state: state,
                country: country,
                phoneNumber: phoneNumber,
                proffession: proffession,
                about: about,
                accountType: accountType,
            });

            if (response.data.status) {
                setHandleFinalEdit(true);
                toast.info("your profile is updated successfully");
                setHandleEdit(false);

            }


        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {

        const fetchUser = async () => {
            try {
                const localStorageUser = await JSON.parse(localStorage.getItem('blog-user'));
                setUser(localStorageUser);
                // console.log(localStorageUser._id);

                try {

                    const response = await axios.get(`${getUserProfile}/${localStorageUser._id}`);
                    if (response.data.status) {

                        setCurrentUserProfile(response.data.response[0]);
                        // console.log("my user _id is", response.data.response[0].village);
                        setProfileCompleted(true);

                    }

                } catch (err) {
                    console.log(err);
                }

                setUserLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();


    }, []);


    // printing the current user


    // handling the my followers

    const handleFollowers = () => {
        navigate("/followers", {
            state: {
                user: user,
            }
        });

    }


    //   // handling the my followers

    const handleFollowings = () => {
        navigate("/followings", {
            state: {
                user: user,
            }
        });

    }


    // end of the  my followers

    // start of the recent message sections


    const handleRecentMessageOfAllUsers = () => {
        navigate("/userrecentmessages", {
            state: {
                user: user,
            }
        });
        // console.log(user._id);
    }

    // end of the recent message section


    // start of the handling all groups that i created 

    const handleMyGroupsLists = () => {
        navigate("/myallgroups", {
            state: {
                user: user,
            }
        })
    }

    // end of the handling all the groups i have created

    // start of the handling the group creations 

    const handleGroupCreations = () => {
        // console.log("Clicked");
        setCreateGroupFlag(true);
    }

    // end of the handling teh group creations ''


    // start of the saving the post in the users profile

    const handleMySavedPosts = () => {
        // console.log("clicked");
        navigate("/mysavedposts");
    }

    // end of the saving the post in the user profile








    return (

        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">

            <div className="bg-white p-10 rounded-lg shadow-lg max-w-xxl transition-transform duration-300 hover:scale-105">
                <div className="text-center mb-6">
                    <img
                        src={currentUserProfile?.profileImage}
                        alt="Profile"
                        className="rounded-full w-24 h-24 mx-auto mb-4 object-cover border-4 border-blue-500 shadow-lg"
                    />
                    <h2 className="text-4xl font-bold text-blue-700">{user?.username}'s Profile</h2>
                    <p className="text-gray-500">User ID: <span className="font-semibold">{currentUserProfile?.userId}</span></p>
                </div>

                <div className="border-t-2 border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <p className="text-gray-700 flex items-center">
                            <FaHome className="text-blue-500 mr-2" />
                            <span className="font-medium">Village:</span> {currentUserProfile?.village}
                        </p>
                        <p className="text-gray-700 flex items-center">
                            <FaMapMarkerAlt className="text-blue-500 mr-2" />
                            <span className="font-medium">District:</span> {currentUserProfile?.district}
                        </p>
                        <p className="text-gray-700 flex items-center">
                            <FaMailBulk className="text-blue-500 mr-2" />
                            <span className="font-medium">Pincode:</span> {currentUserProfile?.pincode}
                        </p>
                        <p className="text-gray-700 flex items-center">
                            <FaGlobe className="text-blue-500 mr-2" />
                            <span className="font-medium">State:</span> {currentUserProfile?.state}
                        </p>
                        <p className="text-gray-700 flex items-center">
                            <FaFlag className="text-blue-500 mr-2" />
                            <span className="font-medium">Country:</span> {currentUserProfile?.country}
                        </p>
                        <p className="text-gray-700 flex items-center">
                            <FaPhone className="text-blue-500 mr-2" />
                            <span className="font-medium">Phone Number:</span> {currentUserProfile?.phoneNumber}
                        </p>
                    </div>
                </div>

                <div className="border-t-2 border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold mb-2">Professional Information</h3>
                    <p className="text-gray-700 flex items-center">
                        <FaBriefcase className="text-blue-500 mr-2" />
                        <span className="font-medium">Profession:</span> {currentUserProfile?.profession}
                    </p>
                </div>

                <div className="border-t-2 border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold mb-2">About Me</h3>
                    <p className="text-gray-700 mb-4">{currentUserProfile?.about}</p>
                    <div className='flex justify-between space-x-4'>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 transform hover:scale-105"
                            onClick={handleEditProfile}
                        >
                            <FaEdit className="inline mr-2" /> Edit Profile
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 transform hover:scale-105"
                            onClick={handleFollowers}
                        >
                            <FaUserFriends className="inline mr-2" /> Followers
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 transform hover:scale-105"
                            onClick={handleFollowings}
                        >
                            <FaUserCheck className="inline mr-2" /> Followings
                        </button>
                    </div>
                </div>

                <div className="border-t-2 border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold mb-2">Account Type</h3>
                    <p className={`text-lg ${currentUserProfile?.accountType === 'public' ? 'text-green-500' : 'text-red-500'}`}>
                        <FaShieldAlt className="inline mr-2" /> {currentUserProfile?.accountType}
                    </p>
                </div>

                <div className='flex justify-between space-x-4 mt-4'>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 transform hover:scale-105"
                        onClick={handleRecentMessageOfAllUsers}
                    >
                        <FaComments className='mr-2' /> Message
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 transform hover:scale-105"
                        onClick={handleMySavedPosts}
                    >
                        <FaBookmark className='mr-2' /> Saved Posts
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 transform hover:scale-105"
                        onClick={handleMyGroupsLists}
                    >
                        <FaUsers className='mr-2' /> Groups
                    </button>
                </div>

                {!CreateGroupFlag && (
                    <div className="flex flex-col items-center justify-center space-y-4 mt-6">
                        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-4">
                            Click below to create groups
                        </h3>
                        <button
                            onClick={handleGroupCreations}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                            <FaUsersCog className="mr-2" /> Create Groups
                        </button>
                    </div>
                )}
            </div>
        </div>



    );
}

export default UserProfile;