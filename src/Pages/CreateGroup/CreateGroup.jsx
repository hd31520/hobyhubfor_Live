import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

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

const CreateGroup = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const groupData = {
    // You can generate _id here if you want (e.g., with uuid lib) or leave it for backend
    // _id: generateId(),
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
fetch('http://localhost:3000/groups/add',{
    method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(groupData),

})
.then(res => res.json())
.then(data => {
    console.log(data)
     toast.success("Added Group successfully!");

})
.catch(err => {
 toast.error(err);
})
  console.log('Formatted Group Data:', groupData);
    // TODO: Submit groupData to backend
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">Create a Hobby Group</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-4">
          <input
            type="text"
            name="groupName"
            placeholder="Group Name"
            className="flex-1 p-3 border rounded"
            required
          />
          <select
            name="category"
            className="flex-1 p-3 border rounded"
            required
            defaultValue=""
          >
            <option value="" disabled>
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
          rows="4"
          required
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="location"
            placeholder="Meeting Location"
            className="flex-1 p-3 border rounded"
            required
          />
          <input
            type="number"
            name="maxMembers"
            placeholder="Max Members"
            className="flex-1 p-3 border rounded"
            min="1"
            required
          />
        </div>

        <div className="flex gap-4">
          <input
            type="date"
            name="startDate"
            className="flex-1 p-3 border rounded"
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
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
          Create
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
};

export default CreateGroup;
