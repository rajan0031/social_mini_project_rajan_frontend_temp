// src/components/Message.jsx

import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Message = ({ msg, from, fromName, toName, handleEdit, handleDelete }) => {
    return (
        <div className={`flex justify-${msg.from === from ? 'end' : 'start'} mb-4`}>
            <div className={`bg-${msg.from === from ? 'blue' : 'green'}-500 text-white p-3 rounded max-w-3/4`}>
                <p className="mb-1">{msg.message}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xs">
                        {msg.from === from ? fromName : toName}
                    </span>
                    {msg.from === from && (
                        <div className="flex space-x-2 justify-between">
                            <button onClick={() => handleEdit(msg)} className="text-xs text-gray-300 hover:text-gray-500">
                                <FaEdit className='w-5 h-5' />
                            </button>
                            <button onClick={() => handleDelete(msg)} className="text-xs text-red-500 hover:text-red-700">
                                <FaTrash className='w-5 h-5' />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
