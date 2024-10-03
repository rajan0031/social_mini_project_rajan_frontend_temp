import React from 'react';

function ChatRoomLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="flex-grow overflow-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {/* Chat messages will go here */}
                {children}
            </div>
            {/* Footer / Input area will be included below and can be styled as needed */}
        </div>
    );
}

export default ChatRoomLayout;
