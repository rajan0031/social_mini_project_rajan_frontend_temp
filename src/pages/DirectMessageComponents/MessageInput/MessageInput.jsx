import React from 'react';

function MessageInput({ message, handleInputChange, handleSend, isEditing }) {
    return (
        <div className="bg-white p-4 rounded shadow-md flex items-center fixed bottom-0 left-0 right-0 z-10">
            <input
                onChange={handleInputChange}
                value={message}
                type="text"
                placeholder="Type your message..."
                className="border p-2 rounded w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={handleSend}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
                {isEditing ? 'Edit' : 'Send'}
            </button>
        </div>
    );
}

export default MessageInput;
