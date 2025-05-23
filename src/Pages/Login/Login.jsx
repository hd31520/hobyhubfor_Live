import React, { useState } from 'react';
import { Link } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    // TODO: Add login logic (API/Firebase/etc.)
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
    // TODO: Add Google auth
  };

  

  const handleGithubLogin = () => {
    console.log('Login with GitHub');
    // TODO: Add GitHub auth
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-base-200 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right text-sm">
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="divider">or</div>

        {/* Social Login Buttons */}
        <div className="space-y-2">
          <button onClick={handleGoogleLogin} className="btn btn-outline btn-block">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          

          <button onClick={handleGithubLogin} className="btn btn-outline btn-block">
            <img
              src="https://www.svgrepo.com/show/475654/github-color.svg"
              alt="GitHub"
              className="w-5 h-5 mr-2"
            />
            Continue with GitHub
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="link link-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
