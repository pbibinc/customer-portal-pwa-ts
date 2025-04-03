import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";
import Header from "./Header";

const Footer: React.FC = () => {
  const { theme, handleDarkModeToggle } = useDarkMode();

  return (
    <div className="page-content-wrapper py-3">
      <div className="container">
        {/* <!-- Setting Card--> */}
        <div className="card mb-3 shadow-sm">
          <div className="card-body direction-rtl">
            <p className="mb-2">Settings</p>

            {/* <div className="single-setting-panel">
          <div className="form-check form-switch mb-2">
              <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  defaultChecked
              />
              <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
              >
                  Availability Status
              </label>
          </div>
          </div> */}

            {/* <div className="single-setting-panel">
          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault2"
              defaultChecked
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault2"
            >
              Send Me Notifications
            </label>
          </div>
        </div> */}

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

            {/* <div className="single-setting-panel">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="rtlSwitch"
              checked={viewMode === "rtl"}
              onChange={handleRTLToggling}
            />
            <label className="form-check-label" htmlFor="rtlSwitch">
              {viewMode === "rtl" ? "LTR" : "RTL"} mode
            </label>
          </div>
        </div> */}
          </div>
        </div>

        {/* <!-- Setting Card--> */}
        <div className="card mb-3 shadow-sm">
          <div className="card-body direction-rtl">
            <p className="mb-2">Account Setup</p>

            <div className="single-setting-panel">
              <Link to="/user-profile">
                <div className="icon-wrapper">
                  <i className="bi bi-person"></i>
                </div>
                Update Profile
              </Link>
            </div>

            {/* <div className="single-setting-panel">
          <Link to="/user-profile">
            <div className="icon-wrapper bg-warning">
              <i className="bi bi-pencil"></i>
            </div>
            Update Bio
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

            {/* <div className="single-setting-panel">
          <Link to="/language">
            <div className="icon-wrapper bg-success">
              <i className="bi bi-globe2"></i>
            </div>
            Language
          </Link>
        </div> */}

            {/* <div className="single-setting-panel">
          <Link to="/privacy-policy">
            <div className="icon-wrapper bg-danger">
              <i className="bi bi-shield-lock"></i>
            </div>
            Privacy Policy
          </Link>
        </div> */}
          </div>
        </div>

        {/* <!-- Setting Card--> */}
        <div className="card shadow-sm">
          <div className="card-body direction-rtl">
            <p className="mb-2">Register & Logout</p>

            {/* <div className="single-setting-panel">
          <Link to="/register">
            <div className="icon-wrapper bg-primary">
              <i className="bi bi-person"></i>
            </div>
            Create New Account
          </Link>
        </div> */}

            <div className="single-setting-panel">
              <Link to="/login">
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

export default Footer;
