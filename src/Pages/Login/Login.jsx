import React, { use } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router';

import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {

    const navigate = useNavigate();
    const { singInUser, signInWithGitHub, signInWithGoogle } = use(AuthContext);
    const location = useLocation();





    console.log(location)
    const from = location.state?.from || '/';


    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;
        return hasUppercase && hasLowercase && isLongEnough;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (!validatePassword(password)) {
            toast.error("Password must contain uppercase, lowercase letters and be 6+ chars.");
            return;
        }

        if (!email) {
            toast.error(" Email are required.");
            return;
        }

        console.log('Logging in with:', { email, password });
        singInUser(email, password)
            .then(() => {
                // Swal.fire(` ${user.displayName} Login Successfully`);
                Swal.fire("Login Successfully!");

                navigate(from)
            })
            .catch(error => {
                Swal.fire("Login failed:", error.code, error.message, error)
            })
    };
    // Gooogle login
    const handleGoogleLogin = () => {
        console.log('Login with Google');
        signInWithGoogle()
            .then(() => {
                // Swal.fire(` ${user.displayName} Login Successfully`);
                Swal.fire("Login Successfully!");

                navigate(from)
            })
            .catch(error => {
                Swal.fire("Login failed:", error.code, error.message, error)
            })

    };
    // Github Login
    const handleGithubLogin = () => {
        console.log('Login with GitHub');
        signInWithGitHub()
            .then(() => {
                // Swal.fire(` ${user.displayName} Login Successfully`);
                Swal.fire("Login Successfully!");

                navigate(from)
            })
            .catch(error => {
                Swal.fire("Login failed:", error.code, error.message, error)
            })

    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center">
            <div className="w-full max-w-sm p-6 bg-base-200 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full"
                            placeholder="••••••••"
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

                <div className="divider">or</div>

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
