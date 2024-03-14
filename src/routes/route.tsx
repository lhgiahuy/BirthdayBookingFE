import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import EventPage from "../pages/EventPage";
import RootLayout from "../layouts/RootLayout"
import ServiceDetail from "../pages/user/ServiceDetails";
import FeedBackHost from "../pages/FeedbackHost";
import ProfilePage from "../pages/user/ProfilePage";
import HomeHost from "../pages/host/HomeHost";
import Profile from "../pages/host/Profile";

import OrderHistory from "../pages/user/OrderHistory";
import EditPlace from "../pages/host/EditPlace";
import EditMenu from "../pages/host/EditMenu";
import EditDecoration from "../pages/host/EditDecoration";
import BookingPage from "../pages/user/BookingPage";


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
        element: <FeedBackHost />,
      },
      {
        path: "/Profile-user",
        element: <ProfilePage />,
      },
      {
        path: "/Homehost",
        element: <HomeHost />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/OrderDetail",
        element: <OrderHistory />,
      },
      {
        path: "/EditPlace",
        element: <EditPlace />,
      },
      {
        path: "/EditMenu",
        element: <EditMenu />,
      },
      {
        path: "/EditDecoration",
        element: <EditDecoration />,
      },
      {
        path: "/BookingPage",
        element: <BookingPage />,
      },
      {
        path: "/ProfileHost",
        element: <Profile />,
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
