import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import './navbar.css'
import { ImMenu } from 'react-icons/im';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { GoPersonFill } from 'react-icons/go';

const Navbar = () => {
    const { user, signOutUser, loading } = useContext(AuthContext);

    const navlink = <>
        <NavLink className="mr-5 " to="/">Home</NavLink>
        <NavLink className="mr-5" to="/allgroup">All Groups</NavLink>

        {
            user ?
                <>
                    <NavLink className="mr-5" to="/createGroup">Create Group</NavLink>
                    <NavLink className="mr-5" to="/myGroup">My Groups</NavLink>
                </>

                :
                <NavLink className="mr-5" to="/login">Login</NavLink>

        }





    </>

    const SignOut = (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,  LogOut!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOutUser()
                    .then(() => {
                        toast.success("SignOut SuccessFully");
                    })

            }
        });
    }
    if (loading) {
        return <span className="loading loading-bars loading-xl"></span>
    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">

                    <Link><img src="/logo.png" alt="" /></Link>
                </div>

                <div className="navbar-end">


                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {

                                navlink
                            }

                        </ul>
                    </div>

                    <div className="flex gap-2">
                        {
                            user
                                ? <div className="dropdown dropdown-hover dropdown-end">

                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            {
                                                user.photoURL === "" ?

                                                    <div className='flex justify-center items-center'>
                                                        <GoPersonFill className='h-10 w-10' />
                                                    </div>

                                                    :
                                                    <img
                                                        alt=""
                                                        src={user?.photoURL} />
                                            }

                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                        <li>
                                            <div>
                                                {
                                                    user.photoURL === "" ?

                                                        <div className='flex justify-center items-center'>
                                                            <GoPersonFill className='h-10 w-10' />
                                                        </div>

                                                        :
                                                       <div className='flex flex-col gap-3 justify-center items-center'>
                                                         <img className='rounded-full' src={user?.photoURL} />
                                                         <h3 className='font-bold text-base'>{user.displayName}</h3>
                                                       </div>
                                                }
                                            </div>
                                        </li>
                                        

                                        <li onClick={SignOut} className='btn btn-warning'>Logout</li>
                                    </ul>


                                </div> : ""
                        }
                    </div>
                    <div className="dropdown lg:hidden dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1"><ImMenu /></div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            {
                                navlink
                            }
                        </ul>
                    </div>



                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div >
    );
};

export default Navbar;