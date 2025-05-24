import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const GroupDetails = () => {
    const { user, loading } = useContext(AuthContext)
    const data = useLoaderData();
    const [activeTab, setActiveTab] = useState('About');
    const [joined, setJoined] = useState(false);
    const tabs = ['About', 'Discussion', 'Members', 'Media']
    const email = user.email;
    const name = user.displayName;
    const handleAddJoin = (groupId) => {

        const newMember = {
            User_Email: email,
            User_Name: name,
        }

        fetch(`https://hobbyhub-server-phi.vercel.app/groups/addmember/${groupId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMember),
        })
            .then(res => res.json())
            .then(data => {
                  setJoined(true)
                toast.success('Member added successfully!');
            })
            .catch(error => {
                toast.error('Failed to add member.');
            })


    }
     useEffect(() => {
  if (data?.member_name && email) {
    const verify = data.member_name.some(member => member.User_Email === email);
    if (verify) {
      setJoined(true);
    }
  }
}, [data, email]);
   
   


    if (loading) {
        return <span className="loading loading-bars loading-xl"></span>
    }
    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center">
            {/* Banner */}
            <div className="w-full bg-base-300">
                <div className="w-full max-w-5xl mx-auto">
                    <div className="relative h-64 overflow-hidden rounded-b-xl">
                        <img
                            src={data.Image_URL}
                            alt="Group Banner"
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-4 left-4 text-white">
                            <h1 className="text-3xl font-bold drop-shadow">{data.Group_Name}</h1>
                            <p className="text-sm drop-shadow">
                                Public Group • {data.member_number} members
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="w-full max-w-5xl mt-4 px-4">
                <div className="tabs tabs-boxed">
                    {
                        tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
                                onClick={() => setActiveTab(tab)}>
                                {tab}
                            </button>
                        ))
                    }
                </div>
            </div>

            {/* Tab Content */}
            <div className="w-full max-w-5xl px-4 mt-4">
                {activeTab === 'About' && (
                    <div className="bg-base-200 p-4 rounded-xl shadow space-y-2">
                        <h2 className="text-xl font-semibold">Group Information</h2>
                        <p><strong>Hobby:</strong> {data.Hobby_Category}</p>
                        <p><strong>Description:</strong> {data.Description}</p>
                        <p><strong>Meeting Location:</strong> {data.Meeting_Location}</p>
                        <p><strong>Max Members:</strong> {data.Max_Members}</p>
                        <p><strong>Start Date:</strong> {new Date(data.Start_Date).toDateString()}</p>
                        <p><strong>Current Members:</strong> {data.member_number}</p>
                    </div>
                )}

                {activeTab === 'Discussion' && (
                    <div className="space-y-4">
                        {joined ? (
                            <>
                                <div className="bg-base-200 p-4 rounded-xl shadow">
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="What's on your mind?"
                                    ></textarea>
                                    <div className="mt-2 flex justify-end">
                                        <button className="btn btn-primary">Post</button>
                                    </div>
                                </div>

                                <div className="bg-base-200 p-4 rounded-xl shadow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src="https://i.pravatar.cc/100?img=1" alt="User" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold">John Doe</p>
                                            <p className="text-sm text-base-content/70">2 hrs ago</p>
                                        </div>
                                    </div>
                                    <p className="mb-2">
                                        Just started learning React Native with TypeScript. Any good tutorials or resources?
                                    </p>
                                    <div className="flex gap-4 text-sm text-base-content/80 mt-2">
                                        <button className="btn btn-ghost btn-sm">Like</button>
                                        <button className="btn btn-ghost btn-sm">Comment</button>
                                        <button className="btn btn-ghost btn-sm">Share</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-base-200 p-4 rounded-xl shadow">
                                <p className="text-base-content">
                                    You must join the group to participate in the discussion.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'Members' && (
                    <div className="bg-base-200 p-4 rounded-xl shadow">
                        <h3 className="text-lg font-semibold mb-2">Members</h3>
                        <ul className="list-disc list-inside text-base-content">
                            {data.member_name.map((member, index) => (
                                <li key={index}>
                                    {member.User_Name} ({member.User_Email})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'Media' && (
                    <div className="bg-base-200 p-4 rounded-xl shadow">
                        <p className="text-base-content">
                            No media has been shared in this group yet.
                        </p>
                    </div>
                )}
            </div>

            {/* Join Button */}
            <div className="w-full max-w-5xl px-4 mt-4 flex justify-center mb-5">
                <button
                    className={`btn ${joined ? 'btn-disabled' : 'btn-success'}`}
                    onClick={() => handleAddJoin(data._id)}
                >
                    {joined ? 'Joined' : 'Join Group'}
                </button>
            </div>
        </div>
    );
};

export default GroupDetails;
