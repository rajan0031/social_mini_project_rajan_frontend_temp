import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';

function Footer() {
    return (
        <div className="bg-white border-t border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600">
            <footer className="p-8 md:flex md:items-center md:justify-between">
                {/* Upper Content Section */}
                <div className="mb-8 md:mb-0">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Join Our LibertyPost Community! 🎉
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Stay updated with the latest insights and engage with diverse topics.
                        Subscribe to our newsletter for exclusive content! 📧
                    </p>
                </div>

                {/* Quick Links */}
                <ul className="flex flex-wrap items-center mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:mt-0">
                    <li><a href="/AboutUs" className="hover:underline me-4 md:me-6">About Us 🌐</a></li>
                    <li><a href="/PrivacyPolicy" className="hover:underline me-4 md:me-6">Privacy Policy 🔒</a></li>
                    <li><a href="/Terms" className="hover:underline me-4 md:me-6">Terms of Service 📜</a></li>
                    <li><a href="/ContactUs" className="hover:underline">Contact Us 📞</a></li>
                </ul>

                {/* Contact Information */}
                <div className="mt-8 md:mt-0">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Contact Us 📫</h3>
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                        <AiFillPhone size={20} />
                        <span>+91 9838208697</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-gray-500 dark:text-gray-400">
                        <IoLocationSharp size={20} />
                        <span>Gurur Jambheshwar University of Science and Technology, Hostel 3, Near Library</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-gray-500 dark:text-gray-400">
                        <MdEmail size={20} />
                        <span><a href="mailto:raykushwaha0031@gmail.com" className="hover:underline">raykushwaha0031@gmail.com</a></span>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-300" aria-label="Facebook">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" className="text-gray-600 hover:text-blue-400 transition-colors duration-300" aria-label="Twitter">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" className="text-gray-600 hover:text-pink-600 transition-colors duration-300" aria-label="Instagram">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-800 transition-colors duration-300" aria-label="LinkedIn">
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </footer>

            {/* Copyright Section */}
            <div className="bg-gray-700 py-4 text-center">
                <p className="text-sm text-gray-200">
                    © {new Date().getFullYear()} LibertyPost. All Rights Reserved. ✨
                </p>
            </div>
        </div>
    );
}

export default Footer;
