import React from 'react';

const MessageInput = ({ message, setMessage, handleSendMessage }) => {
    return (
        <div className="bg-gray-800 p-4 flex items-center">
            <input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                placeholder="Enter your message"
                className="flex-grow p-2 rounded border border-gray-300 mr-2"
            />
            <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;
