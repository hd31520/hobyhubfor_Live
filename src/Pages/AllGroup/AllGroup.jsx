import React, { useContext } from 'react';
import { FetchContext } from '../../Context/FetchContext';
import Groups from '../../Components/Groups/Groups';

const AllGroup = () => {
   const {featuredGroups, loading} = useContext(FetchContext)
       if(loading){
           return <span className="loading loading-bars loading-xl"></span>
       }
       return (
           <div className='p-10 '>
            <h2 className='text-3xl text-center font-bold p-5'>All Group</h2>
              <Groups data={featuredGroups}></Groups>
           </div>
       );
};

export default AllGroup;