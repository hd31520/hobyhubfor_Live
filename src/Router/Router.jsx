import { createBrowserRouter,  } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllGroup from "../Pages/AllGroup/AllGroup";
import CreateGroup from "../Pages/CreateGroup/CreateGroup";

import MyGroup from "../Pages/MyGroup/MyGroup"
import Root from "../LayOut/Root";
import GroupDetails from "../Pages/GroupDetails/GroupDetails";
import PrivetRoutes from "./PrivetRoutes";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'allgroup',
                Component: AllGroup
            },
            {
                path: 'createGroup',
                element: <CreateGroup></CreateGroup>
            },
            {
                path: 'myGroup',
                Component: MyGroup
            },
            {
                path: 'groupDetails/:id',
                  loader: ({ params }) => fetch(`  http://localhost:3000/group/${params.id}`),
                element: <PrivetRoutes><GroupDetails></GroupDetails></PrivetRoutes>,
                
            }
        ]
    },

]);

export default router;