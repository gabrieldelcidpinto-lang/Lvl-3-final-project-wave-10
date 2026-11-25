import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import App from "../App";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import { UserAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { session } = UserAuth();

  if (session === undefined) return null;
  return session ? <Outlet /> : <Navigate to="/signin" replace />;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { session } = UserAuth();

  if (session === undefined) return null;
  return session ? <Navigate to="/dashboard" replace /> : children;
}

export const router = createBrowserRouter([
  {
    element: (
      <PublicOnlyRoute>
        <Outlet />
      </PublicOnlyRoute>
    ),
    children: [
      { path: "/", element: <Signup /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/dashboard", element: <App /> }],
  },
]);
