import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/_layout";

const WithAuthPages = () => {
  const storedData = sessionStorage.getItem("login-store");
  let token: string | null = null;
  let expiry: number | null = null;

  if (storedData) {
    try {
      // The persisted data from Zustand is usually stored as a JSON string with a "state" property.
      const parsed = JSON.parse(storedData);
      token = parsed.state?.token || null;
      expiry = parsed.state?.expiry || null;
    } catch (error) {
      console.error("Error parsing session storage data:", error);
    }
  }

  // Check if the token exists and hasn't expired.
  if (token && expiry && Date.now() < expiry) {
    return <MainLayout />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default WithAuthPages;
