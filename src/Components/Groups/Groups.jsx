import React from 'react';
import { Link } from 'react-router';

const Groups = ({ data }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {data.map(group => (
                <div key={group?.id} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
                    <img src={group?.Image_URL} className="w-full h-40 object-cover" />
                    <div className="p-2">
                        <h3 className="text-lg font-semibold text-gray-800">{group?.Group_Name}</h3>
                    </div>
                    <div className='flex p-2 justify-center items-center'>
                        <Link to={`/groupDetails/${group?._id}`} className='btn btn-primary'>View Group Details</Link>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default Groups;