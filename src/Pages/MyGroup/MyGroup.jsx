import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router';

const MyGroup = () => {
  const [groups, setGroups] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const userEmail = user?.email;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`https://hobbyt-hub-server.vercel.app/user/${userEmail}`);
        if (!res.ok) throw new Error("Failed to fetch groups");
        const data = await res.json();
        setGroups(data);
      } catch (error) {
        toast.error("Fetch failed");
        console.error(error);
      }
    };

    if (userEmail) fetchGroups();
  }, [userEmail]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This group will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://hobbyt-hub-server.vercel.app/groups/${id}`, {
            method: 'DELETE'
          });

          if (!res.ok) {
            const text = await res.text();
            throw new Error(`Delete failed: ${text}`);
          }

          const data = await res.json();
          toast.success(data.message || "Deleted successfully");
          setGroups(groups.filter(group => group._id !== id));
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete");
        }
      }
    });
  };

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Created Groups</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Group Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Location</th>
            <th className="py-2 px-4">Start Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{group.Group_Name}</td>
              <td className="py-2 px-4">{group.Hobby_Category}</td>
              <td className="py-2 px-4">{group.Meeting_Location}</td>
              <td className="py-2 px-4">{group.Start_Date}</td>
              <td className="py-2 px-4 space-x-2">
                <Link to={`/updateGroup/${group._id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(group._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MyGroup;
