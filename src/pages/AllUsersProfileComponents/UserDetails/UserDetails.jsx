import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaPhone, FaUser } from 'react-icons/fa';

const UserDetails = ({ userDetails, author }) => {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
                <FaUser className="mr-2 text-blue-500" />
                {userDetails.about}
            </h2>
            <p className="text-red-600 mb-2">Account Type: @{author}</p>
            <div className="text-gray-600">
                <p className="mb-2"><FaBriefcase className="inline mr-2" /> Profession: {userDetails.profession}</p>
                <p className="mb-2"><FaMapMarkerAlt className="inline mr-2" /> Location: {userDetails.village}, {userDetails.district}, {userDetails.state}, {userDetails.country}</p>
                <p className="mb-2"><FaPhone className="inline mr-2" /> Phone Number: {userDetails.phoneNumber}</p>
                <p className="mb-2">Pincode: {userDetails.pincode}</p>
            </div>
        </div>
    );
};

export default UserDetails;
