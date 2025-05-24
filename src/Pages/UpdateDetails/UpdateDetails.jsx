import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const hobbyCategories = [
    'Drawing & Painting',
    'Photography',
    'Video Gaming',
    'Fishing',
    'Running',
    'Cooking',
    'Reading',
    'Writing',
    'Other',
];

const UpdateDetails = () => {
    const { user } = useContext(AuthContext);
    const data = useLoaderData();
    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const groupData = {

            Group_Name: formData.get('groupName'),
            Hobby_Category: formData.get('category'),
            Description: formData.get('description'),
            Meeting_Location: formData.get('location'),
            Max_Members: Number(formData.get('maxMembers')),
            Start_Date: formData.get('startDate'),
            Image_URL: formData.get('imageUrl'),
            member_name: [
                {
                    User_Name: user?.displayName || '',
                    User_Email: user?.email || '',
                },
            ],

        };



        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,  Update This!"
        }).then((result) => {
            if (result.isConfirmed) {

                 fetch(`https://hobbyhub-server-phi.vercel.app/groups/${data._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ groupData })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Updated ", data)
                toast.success("Update Group successfully!");

            })
            .catch(err => console.error(err));


              

            }
        });




       

        // TODO: Submit groupData to backend
    };
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-3xl font-bold mb-6 text-center">Update {data.Group_Name} Group</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="groupName"
                        placeholder="Group Name"
                        defaultValue={data.Group_Name}
                        className="flex-1 p-3 border rounded"
                        required
                    />
                    <select
                        name="category"
                        className="flex-1 p-3 border rounded"
                        required

                    >
                        <option defaultValue={data.Hobby_Category} disabled>
                            Select Hobby Category
                        </option>
                        {hobbyCategories.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full p-3 border rounded"
                    defaultValue={data.Description}
                    rows="4"
                    required
                />

                <div className="flex gap-4">
                    <input
                        type="text"
                        name="location"
                        placeholder="Meeting Location"
                        className="flex-1 p-3 border rounded"
                        defaultValue={data.Meeting_Location}
                        required
                    />
                    <input
                        type="number"
                        name="maxMembers"
                        placeholder="Max Members"
                        className="flex-1 p-3 border rounded"
                        defaultValue={data.Max_Members}
                        min="1"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <input
                        type="date"
                        name="startDate"
                        className="flex-1 p-3 border rounded"
                        defaultValue={data.Start_Date}
                        required
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        defaultValue={data.Image_URL}
                        className="flex-1 p-3 border rounded"
                    />
                </div>

                <div className="flex gap-4">
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="flex-1 p-3 border rounded bg-gray-100"
                        placeholder="User Name"
                    />
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="flex-1 p-3 border rounded bg-gray-100"
                        placeholder="User Email"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                >
                    Update
                </button>
            </form>
            <Toaster position="top-right" reverseOrder={false} />

        </div>
    );
};

export default UpdateDetails;