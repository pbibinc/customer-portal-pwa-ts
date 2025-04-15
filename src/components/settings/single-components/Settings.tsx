import { Link } from "react-router-dom";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { useLoginStore } from "../../../stores/LoginStore";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { theme, handleDarkModeToggle } = useDarkMode();
  const setUser = useLoginStore((state) => state.setUser);
  const setToken = useLoginStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear Zustand state
    setUser(null);
    setToken(null);

    // Also clear sessionStorage just in case (redundancy for safety)
    sessionStorage.removeItem("login-store");

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <div className="page-content-wrapper py-3">
      <div className="container">
        {/* <!-- Setting Card--> */}
        <div className="card mb-3 shadow-sm">
          <div className="card-body direction-rtl">
            <p className="mb-2">Settings</p>
            <div className="single-setting-panel">
              <div className="form-check form-switch mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="darkSwitch"
                  checked={theme === "dark"}
                  onChange={handleDarkModeToggle}
                />
                <label className="form-check-label" htmlFor="darkSwitch">
                  {theme === "dark" ? "Light" : "Dark"} mode
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Setting Card--> */}
        <div className="card mb-3 shadow-sm">
          <div className="card-body direction-rtl">
            <p className="mb-2">Account Setup</p>

            {/* <div className="single-setting-panel">
              <Link to="/user-profile">
                <div className="icon-wrapper">
                  <i className="bi bi-person"></i>
                </div>
                Update Profile
              </Link>
            </div> */}
            <div className="single-setting-panel">
              <Link to="/change-password">
                <div className="icon-wrapper bg-info">
                  <i className="bi bi-lock"></i>
                </div>
                Change Password
              </Link>
            </div>
          </div>
        </div>

        {/* <!-- Setting Card--> */}
        <div className="card shadow-sm">
          <div className="card-body direction-rtl">
            <p className="mb-2">Logout</p>
            <div className="single-setting-panel">
              <Link to="/login" onClick={handleLogout}>
                <div className="icon-wrapper bg-danger">
                  <i className="bi bi-box-arrow-right"></i>
                </div>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
