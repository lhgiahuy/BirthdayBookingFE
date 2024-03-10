import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import EventPage from "../pages/EventPage";
import RootLayout from "../layouts/RootLayout"
import BookingPage from "../pages/user/BookingPage";
import FeedBack from "../pages/Feedback";
import ProfilePage from "../pages/user/ProfilePage";
import HomeHost from "../pages/host/HomeHost";
import OrderManager from "../pages/host/OrderManager";


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
        path: "/Booking",
        element: <BookingPage />,
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
