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
import PrivateRoute from "./routes/privateRoute";
import Forbidden from "./pages/error/forbidden";
import { ROLE } from "./constants/role";
import EditProfileHost from "./pages/host/EditProfileHost";
import ChangePasswordHost from "./pages/host/ChangePasswordHost";
const RootLayout = React.lazy(() => import("./layouts/RootLayout"));
const RootLayoutWithBackground = React.lazy(
  () => import("./layouts/RootLayoutWithBackground")
);
function App() {
  const routes = useRoutes([
    {
      element: (
        <Suspense>
          <RootLayout />
        </Suspense>
      ),
      children: [
        {
          path: "/Event",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role1]}>
              <EventPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/ServiceDetail",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role1]}>
              <ServiceDetail />
            </PrivateRoute>
          ),
        },
        {
          path: "/Feedback",
          element: <FeedBackHost />,
        },
        {
          path: "/OrderDetails",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role1]}>
              <OrderDetails />
            </PrivateRoute>
          ),
        },
        {
          path: "/Editprofile",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role1]}>
              <EditProfile />
            </PrivateRoute>
          ),
        },
        {
          path: "/Changepassword",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role1]}>
              <ChangePassword />
            </PrivateRoute>
          ),
        },
        {
          path: "/Homehost",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role2]}>
              <HomeHost />
            </PrivateRoute>
          ),
        },
        {
          path: "/EditprofileHost",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role2]}>
              <EditProfileHost />
            </PrivateRoute>
          ),
        },
        {
          path: "/ChangepasswordHost",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role2]}>
              <ChangePasswordHost />
            </PrivateRoute>
          ),
        },
        {
          path: "/Ordermanagement",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role2]}>
              <OrderManagement />
            </PrivateRoute>
          ),
        },
        {
          path: "/OrderHistory",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role1]}>
              <OrderHistory />
            </PrivateRoute>
          ),
        },
        {
          path: "/EditPlace",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role2]}>
              <EditPlace />
            </PrivateRoute>
          ),
        },
        {
          path: "/EditMenu",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role2]}>
              <EditMenu />
            </PrivateRoute>
          ),
        },
        {
          path: "/EditDecoration",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role2]}>
              <EditDecoration />
            </PrivateRoute>
          ),
        },
        {
          path: "/BookingPage",
          element: (
            <PrivateRoute inverted={false} requiredRoles={[ROLE.role1]}>
              <BookingPage />
            </PrivateRoute>
          ),
        },
      ],
    },

    {
      element: (
        <Suspense>
          <RootLayoutWithBackground />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <PrivateRoute inverted={false} requiredRoles={[ROLE.role1]}>
                <EventPage />
              </PrivateRoute>
            </Suspense>
          ),
        },
      ],
    },

    {
      path: "/login",
      element: (
        <PrivateRoute inverted={true}>
          <Login />
        </PrivateRoute>
      ),
    },
    {
      path: "/error",
      element: <Forbidden />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return routes;
}

export default App;
