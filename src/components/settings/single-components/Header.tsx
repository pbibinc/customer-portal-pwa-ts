import { Link } from "react-router-dom";
// import { useDarkMode } from "../../hooks/useDarkMode";
// import { useRTLMode } from "../../hooks/useRTLMode";
// import HeaderSeven from "../../layouts/headers/HeaderSeven";
// import FooterTwo from "../../layouts/footers/FooterTwo";
// import ScrollTop from "../common/ScrollTop";

const Header: React.FC = () => {
  return (
    <div className="header-area" id="headerArea">
      <div className="container">
        {/* <!-- Header Content--> */}
        <div className="header-content header-style-four position-relative d-flex align-items-center justify-content-between">
          {/* <!-- Back Button--> */}
          <div className="back-button">
            <Link to="/home">
              <i className="bi bi-arrow-left-short"></i>
            </Link>
          </div>

          {/* <!-- Page Title--> */}
          <div className="page-heading">
            <h6 className="mb-0">Settings</h6>
          </div>

          {/* <!-- User Profile--> */}
          <div className="user-profile-wrapper">
            <a className="user-profile-trigger-btn" href="#">
              <img src="/assets/img/bg-img/20.jpg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
