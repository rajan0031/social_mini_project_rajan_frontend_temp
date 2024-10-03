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
                        Join Our Community! 🎉
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Stay updated with the latest blog posts and insights.
                        Subscribe to our newsletter for exclusive content and offers!
                        <span role="img" aria-label="email">📧</span>
                    </p>
                </div>

                {/* Quick Links */}
                <ul className="flex flex-wrap items-center mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:mt-0">
                    <li><a href="#" className="hover:underline me-4 md:me-6">About Us 🌐</a></li>
                    <li><a href="#" className="hover:underline me-4 md:me-6">Privacy Policy 🔒</a></li>
                    <li><a href="#" className="hover:underline me-4 md:me-6">Terms of Service 📜</a></li>
                    <li><a href="#" className="hover:underline">Contact Us 📞</a></li>
                </ul>

                {/* Contact Information */}
                <div className="mt-8 md:mt-0">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Contact Us 📫</h3>
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                        <AiFillPhone size={20} />
                        <span>+1 (234) 567-8901</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-gray-500 dark:text-gray-400">
                        <IoLocationSharp size={20} />
                        <span>1234 Blog St, Blog City, BC 12345</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-gray-500 dark:text-gray-400">
                        <MdEmail size={20} />
                        <span>contact@yourwebsite.com</span>
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
                    <a href="mailto:contact@yourwebsite.com" className="text-gray-600 hover:text-gray-800 transition-colors duration-300" aria-label="Email">
                        <MdEmail size={24} />
                    </a>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
                    © 2023 <a href="https://flowbite.com/" className="hover:underline">YourWebsite™</a>. All Rights Reserved. ✨
                </div>
            </footer>
        </div>
    );
}

export default Footer;
