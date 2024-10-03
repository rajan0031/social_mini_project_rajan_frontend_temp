import React from 'react';

const GroupHeader = ({ group, navigate }) => {
    const handleGroupInformation = () => {
        navigate("/groupinformation", { state: { group } });
    };

    return (
        <div onClick={handleGroupInformation} className="bg-gray-800 text-white p-4 flex items-center cursor-pointer">
            <img src={group.profileLink} alt="Group Profile" className="h-10 w-10 rounded-full mr-2" />
            <h1 className="text-2xl font-bold">{group.groupName}</h1>
            <p className="text-xs ml-2">Tap here for group info</p>
        </div>
    );
};

export default GroupHeader;
