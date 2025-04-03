import { Navigate } from "react-router-dom";
import AuthLayout from "../auth-layout/_layout";

const WithoutAuthPages = () => {
  const storedData = sessionStorage.getItem("login-store");
  let token: string | null = null;
  let expiry: number | null = null;

  if (storedData) {
    try {
      // Zustand persists the state with a "state" property.
      const parsed = JSON.parse(storedData);
      token = parsed.state?.token || null;
      expiry = parsed.state?.expiry || null;
    } catch (error) {
      console.error("Error parsing session storage data:", error);
    }
  }

  // If a valid token exists, redirect to /home.
  if (token && expiry && Date.now() < expiry) {
    return <Navigate to="/home" />;
  }

  // Otherwise, show the unauthenticated layout.
  return <AuthLayout />;
};

export default WithoutAuthPages;
