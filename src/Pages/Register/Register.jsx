import React, { use } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

export default function Register() {
  const { CreateUser } = use(AuthContext);

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUppercase && hasLowercase && isLongEnough;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    if (!validatePassword(password)) {
      toast.error("Password must contain uppercase, lowercase letters and be 6+ chars.");
      return;
    }

    if (!name || !email) {
      toast.error("Name and Email are required.");
      return;
    }

    CreateUser(email, password, name, photoURL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        toast.success("Registered successfully!");
      });

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
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
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
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 underline">
          Login here
        </a>
      </p>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
