import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import EventPage from "../pages/EventPage";
import RootLayout from "../layouts/RootLayout"
import ServiceDetail from "../pages/user/ServiceDetails";
import FeedBackHost from "../pages/FeedbackHost";
import HomeHost from "../pages/host/HomeHost";
import Profile from "../pages/host/Profile";
import EditPlace from "../pages/host/EditPlace";
import EditMenu from "../pages/host/EditMenu";
import EditDecoration from "../pages/host/EditDecoration";
import BookingPage from "../pages/user/BookingPage";
import EditProfile from "../pages/user/EditProfile";
import ChangePassword from "../pages/user/ChangePassword";
import OrderDetails from "../pages/user/OrderDetails";
import OrderHistory from "../pages/user/OrderHistory";


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
        path: "/OrderDetails",
        element: <OrderDetails />,
      },
      {
        path: "/Editprofile",
        element: <EditProfile />,
      },
      {
        path: "/Changepassword",
        element: <ChangePassword />,
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
        path: "/OrderHistory",
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
