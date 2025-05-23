import React, { use, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

export default function Register() {

  const {CreateUser} = use(AuthContext);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUppercase && hasLowercase && isLongEnough;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!validatePassword(password)) {
      toast.error("Password must contain uppercase, lowercase letters and be 6+ chars.");
      return;
    }

    if (!name || !email) {
      toast.error("Name and Email are required.");
      return;
    }

    CreateUser(email,password)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      toast.success(`Registered successfully!`);
    })
    

  
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          value={formData.photoURL}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?
        <a href="/login" className="text-blue-500 underline">
          Login here
        </a>

      </p>
       <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
