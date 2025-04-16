import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../contexts/Auth/AuthCntext";

export default function ProtectedRoute() {
  console.log("protect route");
  const { isLogedin } = UseAuth();

  if (!isLogedin) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
