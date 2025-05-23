
import { Link } from 'react-router';
import Slider from '../../Components/Slider/Slider';
import Groups from '../../Components/Groups/Groups';
import { FetchContext } from '../../Context/FetchContext';
import { useContext } from 'react';

const Home = () => {
    const {featuredGroups, loading} = useContext(FetchContext)
    

   

const sixData = featuredGroups.slice(0, 6);

if(loading) {
    return <span className="loading loading-bars loading-xl"></span>
}
    return (
        <div className=" bg-gray-50 font-inter antialiased">
            {/* Hero Section */}
            <header className="bg-indigo-600  text-white py-20 px-6 text-center rounded-b-lg shadow-lg">
                <h1 className="text-5xl font-bold mb-4">Find your next hobby</h1>
                <p className="text-xl mb-12">Connect with local groups and explore new interests</p>
                <div className="max-w-7xl mx-auto  w-full gap-8">
                    {/* Dynamically rendered hero images using map */}

                    <Slider heroImagesData={sixData} className="bg-white rounded-xl shadow-lg overflow-hidden"></Slider>

                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                {/* Featured Groups Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Groups</h2>
                    <Groups data={sixData}></Groups>
                   <div className='flex justify-center items-center m-4'>
                     <Link to='/allgroup' className='btn btn-primary'>Load All</Link>
                   </div>
                </section>

                {/* Call to Action Section */}
                <section >
                    <h3 className='text-center text-3xl font-bold'>Call to Action</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">








                        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Join a community of hobbyists</h3>
                            <p className="text-gray-600 mb-6">Meet like-minded people who share your passions and hobbies.</p>
                            <div>

                            </div>

                            <Link to='/allgroup'>
                                <button className="btn bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg font-semibold">Join Now</button>
                            </Link>

                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Share your passion with others</h3>
                            <p className="text-gray-600 mb-6">Create your own group and invite others to join you on your hobby journey.</p>
                            <Link to="/createGroup">
                                <button className="btn bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg font-semibold">Create Group</button>
                            </Link>
                        </div>

                    </div>
                </section>
            </main>

            
        </div>
    );
};

export default Home;