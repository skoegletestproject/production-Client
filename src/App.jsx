import React from "react";
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
  const { isLogin, isAdmin } = useStore();

  const GuestRoute = ({ element }) => {
    return !isLogin ? element : <Navigate to="/" />;
  };

  const ProtectedRoute = ({ element }) => {
    return isLogin ? element : <Navigate to="/login" />;
  };

  const AdminRoute = ({ element }) => {
    return isLogin && isAdmin ? element : <Navigate to="/profile" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={<HomePage />} />,
    },
    {
      path: "/signup",
      element: <GuestRoute element={<SignupPage />} />,
    },
    {
      path: "/login",
      element: <GuestRoute element={<LoginPage />} />,
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
        />
      ),
    },
    {
      path: "/profile",
      element: <ProtectedRoute element={<Profile />} />,
    },
    {
      path: "/mbpannel/admin",
      element: <AdminRoute element={<Layout><Admin /></Layout>} />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
