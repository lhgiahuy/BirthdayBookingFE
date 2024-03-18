import { useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import EventPage from "./pages/EventPage";
import ServiceDetail from "./pages/user/ServiceDetails";
import FeedBackHost from "./pages/FeedbackHost";
import ProfilePage from "./pages/user/ProfilePage";
import HomeHost from "./pages/host/HomeHost";
import Profile from "./pages/host/Profile";
import OrderHistory from "./pages/user/OrderHistory";
import EditPlace from "./pages/host/EditPlace";
import EditMenu from "./pages/host/EditMenu";
import EditDecoration from "./pages/host/EditDecoration";
import BookingPage from "./pages/user/BookingPage";
import React from "react";
const RootLayout = React.lazy(() => import("./layouts/RootLayout"));
const RootLayoutWithBackground = React.lazy(
  () => import("./layouts/RootLayoutWithBackground")
);
function App() {
  const routes = useRoutes([
    {
      element: <RootLayout />,
      children: [
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
      ],
    },

    {
      element: <RootLayoutWithBackground />,
      children: [
        {
          path: "/",
          element: <EventPage />,
        },
      ],
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
  return routes;
}

export default App;
