import React, {  use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const PrivetRoutes = ({children}) => {
    const {user,loading} = use(AuthContext);
    const location = useLocation();

    if(loading) {
      return  <span className="loading loading-infinity loading-xl"></span>
    }
   else if(!user){
        return <Navigate to="/login" state={{ from: location.pathname }} replace ></Navigate>
    }

    return children;
    
};

export default PrivetRoutes;