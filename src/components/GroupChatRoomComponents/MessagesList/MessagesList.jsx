import React from 'react';
import { characterColors } from "../../../Data/ColorData/ColorData"
const MessagesList = ({ messages, localStorageUser }) => {
    return (
        <div className="custom-scrollbar">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex justify-${(msg.currentUserId === localStorageUser._id) ? 'end' : 'start'} mb-4`}
                >
                    <div className={`bg-${msg.currentUserId === localStorageUser._id ? 'blue' : 'green'}-500 text-white p-3 rounded max-w-3/4`}>
                        <p className="mb-1">{msg.messageData}</p>
                        <div className="flex justify-between items-center">
                            <span className={`text-xs text-${characterColors.get(msg.currentUserName[0])}-700`}>
                                {msg.currentUserName}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessagesList;
