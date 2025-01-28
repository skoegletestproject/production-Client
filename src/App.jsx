import React, { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useStore } from "./Store/Store";

// Lazy loading components
const LoginPage = React.lazy(() => import("./Pages/LoginPage"));
const SignupPage = React.lazy(() => import("./Pages/SignupPage"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const Layout = React.lazy(() => import("./Layout/Layout"));
const NotFoundPage = React.lazy(() => import("./NotFoundPage"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const Admin = React.lazy(() => import("./Pages/Admin"));

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
