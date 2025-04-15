import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "../../../stores/LoginStore";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { token, setUser, setToken } = useLoginStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // When token exists (and is valid via rehydration), navigate to home.
  useEffect(() => {
    const isTokenValid = () => {
      const state = useLoginStore.getState();
      return state.token && state.expiry && state.expiry > Date.now();
    };

    if (isTokenValid()) {
      navigate("/home");
    }
  }, [token, navigate]);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response: AxiosResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setUser(response.data.user);
        setToken(response.data.token);
        // Navigation will be triggered by the token effect.
      } else {
        toast.error("Login failed, please try again.");
      }
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error Response:", error.response.data);
          toast.error(error.response.data.message || "Invalid Credentials");
        } else if (error.request) {
          console.error("Error Request:", error.request);
          toast.error("No response from server. Please try again.");
        }
      } else {
        console.error("Error Message:", (error as Error).message);
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {/* <!-- Login Form --> */}
      <div className="login-form mt-4">
        <h6 className="mb-3 text-center">Log in to PBIB Customer Portal</h6>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className={`form-control ${
                focusedInput === "email" ? "form-control-clicked" : ""
              }`}
              type="email"
              id="email"
              placeholder="Email"
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group position-relative">
            <input
              className={`form-control ${
                focusedInput === "password" ? "form-control-clicked" : ""
              }`}
              id="psw-input"
              placeholder="Enter Password"
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className={`position-absolute ${showPassword ? "active" : ""}`}
              id="password-visibility"
              onClick={toggleShowPassword}
              style={{
                cursor: "pointer",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
            </div>
          </div>
          {isLoading ? (
            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled
              style={{ cursor: "not-allowed" }}
            >
              <span
                className="spinner-border spinner-border-sm text-light me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Loading ...
            </button>
          ) : (
            <button className="btn btn-primary w-100" type="submit">
              Sign In
            </button>
          )}
        </form>
      </div>
      {/* <!-- Login Meta --> */}
      <div className="login-meta-data text-center">
        <Link
          className="stretched-link forgot-password d-block mt-3 mb-1"
          to="/forgot-password"
        >
          Forgot Password?
        </Link>
      </div>
    </>
  );
};

export default Login;
