import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import EventPage from "../pages/EventPage";
import RootLayout from "../layouts/RootLayout"
import ServiceDetail from "../pages/user/ServiceDetail";
import FeedBack from "../pages/Feedback";
import ProfilePage from "../pages/user/ProfilePage";
import HomeHost from "../pages/host/HomeHost";
import OrderManager from "../pages/host/OrderManager";

import OrderDetailsPage from "../pages/user/OrderDetailsPage";
import EditPlace from "../pages/host/EditPlace";
import EditMenu from "../pages/host/EditMenu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/Event",
        element: <EventPage />,
      },
      {
        path: "/ServiceDetail",
        element: <ServiceDetail />,
      },
      {
        path: "/Feedback",
        element: <FeedBack />,
      },
      {
        path: "/Profile",
        element: <ProfilePage />,
      },
      {
        path: "/Homehost",
        element: <HomeHost />,
      },
      {
        path: "/Ordermanager",
        element: <OrderManager />,
      },
      {
        path: "/OrderDetail",
        element: <OrderDetailsPage />,
      },
      {
        path: "/EditPlace",
        element: <EditPlace />,
      },
      {
        path: "/EditMenu",
        element: <EditMenu />,
      },
    ]
  },



  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
