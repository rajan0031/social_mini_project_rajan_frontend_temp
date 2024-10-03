import { useEffect, useState } from 'react';
import axios from 'axios';
import { userProfile } from '../../utils/apiRoutes'; import {
    FaHome,
    FaMapMarkerAlt,
    FaFlag,
    FaGlobe,
    FaPhone,
    FaBriefcase,
    FaEdit,
    FaUserFriends,
    FaUsers,
    FaComments,
    FaBookmark,
    FaUsersCog,
    FaShieldAlt
} from 'react-icons/fa';

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

        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                {/* Profile Header */}
                <div className="text-center mb-6">
                    <img
                        src={currentUserProfile?.profileImage}
                        alt="Profile"
                        className="rounded-full w-32 h-32 mx-auto mb-4 object-cover shadow-lg"
                    />
                    <h2 className="text-4xl font-bold text-blue-700">{user?.username}'s Profile</h2>
                    <p className="text-gray-500 text-sm">User ID: <span className="font-semibold">{currentUserProfile?.userId}</span></p>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Personal Information */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">Personal Information</h3>
                        <div className="flex flex-col space-y-2 mt-2">
                            <p><FaHome className="inline mr-2 text-blue-500" /> <span className="font-medium">Village:</span> {currentUserProfile?.village}</p>
                            <p><FaMapMarkerAlt className="inline mr-2 text-blue-500" /> <span className="font-medium">District:</span> {currentUserProfile?.districk}</p>
                            <p><FaFlag className="inline mr-2 text-blue-500" /> <span className="font-medium">Pincode:</span> {currentUserProfile?.pincode}</p>
                            <p><FaGlobe className="inline mr-2 text-blue-500" /> <span className="font-medium">State:</span> {currentUserProfile?.state}</p>
                            <p><FaGlobe className="inline mr-2 text-blue-500" /> <span className="font-medium">Country:</span> {currentUserProfile?.country}</p>
                            <p><FaPhone className="inline mr-2 text-blue-500" /> <span className="font-medium">Phone Number:</span> {currentUserProfile?.phoneNumber}</p>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">Professional Information</h3>
                        <p><FaBriefcase className="inline mr-2 text-blue-500" /> <span className="font-medium">Profession:</span> {currentUserProfile?.proffession}</p>
                    </div>

                    {/* About Me Section */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">About Me</h3>
                        <p className="text-gray-700 mt-2">{currentUserProfile?.about}</p>
                    </div>

                    {/* Account Type Section */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">Account Type</h3>
                        <p className={`text-lg ${currentUserProfile?.accountType === 'public' ? 'text-green-500' : 'text-red-500'}`}>
                            <FaShieldAlt className="inline mr-2" /> {currentUserProfile?.accountType}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={handleEditProfile}
                    >
                        <FaEdit className="inline mr-1" /> Edit Profile
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={handleFollowers}
                    >
                        <FaUserFriends className="inline mr-1" /> Followers
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={handleFollowings}
                    >
                        <FaUsers className="inline mr-1" /> Followings
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={handleRecentMessageOfAllUsers}
                    >
                        <FaComments className="inline mr-1" /> Messages
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={handleMySavedPosts}
                    >
                        <FaBookmark className="inline mr-1" /> Saved Posts
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                        onClick={handleMyGroupsLists}
                    >
                        <FaUsersCog className="inline mr-1" /> Groups
                    </button>
                </div>

                {/* Group Creation Section */}
                {!CreateGroupFlag && (
                    <div className="text-center mt-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to connect?</h3>
                        <button
                            onClick={handleGroupCreations}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Create Groups
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>


    );
}

export default UserProfile;