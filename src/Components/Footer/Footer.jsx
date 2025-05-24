import React, { useContext } from 'react';
import { CiLinkedin } from 'react-icons/ci';
import { AuthContext } from '../../Context/AuthContext';
import { NavLink } from 'react-router';

const Footer = () => {
    const { user } = useContext(AuthContext);

    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <nav>
                <ul className='decoration-0 space-y-3'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/allgroup">All Groups</NavLink></li>

                    {user ? (
                        <>
                            <li><NavLink to="/createGroup">Create Group</NavLink></li>
                            <li><NavLink to="/myGroup">My Groups</NavLink></li>
                            <div className='flex items-center gap-3 px-2'>
                                <img
                                    className='w-10 h-10 rounded-full'
                                    src={user?.photoURL}
                                    alt="User Avatar"
                                />
                            </div>
                        </>
                    ) : (
                        <li><NavLink to="/login">Login</NavLink></li>
                    )}
                </ul>
            </nav>

            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a href='https://www.linkedin.com/in/md-hridoy-sheikh-b16b01298/' target="_blank" rel="noreferrer">
                        <CiLinkedin className='h-10 w-10' />
                    </a>
                    <a href='https://www.youtube.com/@Hridoy-qb3uf' target="_blank" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a href='https://web.facebook.com/Hridoy3240/' target="_blank" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </div>
            </nav>

            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;
