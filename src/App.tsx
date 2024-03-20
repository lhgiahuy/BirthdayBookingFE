import { useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import EventPage from "./pages/EventPage";
import ServiceDetail from "./pages/user/ServiceDetails";
import FeedBackHost from "./pages/FeedbackHost";
import HomeHost from "./pages/host/HomeHost";
import Profile from "./pages/host/OrderManagement";
import OrderHistory from "./pages/user/OrderHistory";
import EditPlace from "./pages/host/EditPlace";
import EditMenu from "./pages/host/EditMenu";
import EditDecoration from "./pages/host/EditDecoration";
import BookingPage from "./pages/user/BookingPage";
import React, { Suspense } from "react";
import ChangePassword from "./pages/user/ChangePassword";
import EditProfile from "./pages/user/EditProfile";
import OrderDetails from "./pages/user/OrderDetails";
import OrderManagement from "./pages/host/OrderManagement";
import TestUpload from "./pages/user/TestUpload";
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
          path: "/Ordermanagement",
          element: <OrderManagement />,
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
        {
          path: "/TestUpload",
          element: <TestUpload />
        }
      ],
    },

    {
      element: (
        <Suspense>
          <RootLayoutWithBackground />,
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <EventPage />,
            </Suspense>
          ),
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
