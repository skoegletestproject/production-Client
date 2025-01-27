import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useStore } from "./Store/Store";

import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import Layout from "./Layout/Layout";
import NotFoundPage from "./NotFoundPage";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";

export default function App() {
  const { isLogin } = useStore();

  const GuestRoute = ({ element, to }) => {
    return !isLogin ? element : <Navigate to={to} />;
  };

  const ProtectedRoute = ({ element, to }) => {
    return isLogin ? element : <Navigate to={to} />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={<HomePage />} to="/login" />,
    },
    {
      path: "/signup",
      element: <GuestRoute element={<SignupPage />} to="/" />,
    },
    {
      path: "/login",
      element: <GuestRoute element={<LoginPage />} to="/" />,
    },
    {
      path: "/live",
      element: (
        <ProtectedRoute
          element={
            <Layout>
              <h1>Live</h1>
            </Layout>
          }
          to="/login"
        />
      ),
    },
    {
      path: "/profile",
      element: <ProtectedRoute element={<Profile />} to="/login" />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },{
      path:"/mbpannel/admin",
      element: <Layout><Admin/></Layout>
    }
  ]);

  return <RouterProvider router={router} />;
}
