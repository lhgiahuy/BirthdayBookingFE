import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import EventPage from "../pages/EventPage";
import RootLayout from "../layouts/RootLayout"
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
        path: "/Booking",
        element: <BookingPage />,
      },
    ]
  },



  {
    path: "/login",
    element: <Login />,
  },
]);
