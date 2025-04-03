// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDarkModeStore } from "../stores/DarkModeStore";
import { useLoginStore } from "../stores/LoginStore";
import { useLeadStore } from "../stores/LeadStore";
import { useSelectedCompanyStore } from "../stores/SelectedCompanyStore";
import Logo from "@assets/img/logopbibinc.png";

const Header: React.FC = () => {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     import("bootstrap/dist/js/bootstrap");
  //   }
  // }, []);

  const { theme, handleDarkModeToggle } = useDarkModeStore();
  const { user } = useLoginStore();
  const { leads } = useLeadStore();
  const { selectedCompany, setSelectedCompany } = useSelectedCompanyStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = Number(e.target.value);
    const foundLead = leads.find((ld) => ld.id === newId);
    setSelectedCompany(foundLead || null);
  };

  return (
    <>
      <div className="header-area" id="headerArea">
        <div className="container">
          <div className="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
            <div className="logo-wrapper">
              <Link to="/home">
                <img src={Logo} alt="" />
              </Link>
            </div>
            <div
              className="navbar--toggler"
              id="affanNavbarToggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#affanOffcanvas"
              aria-controls="affanOffcanvas"
            >
              <span className="d-block"></span>
              <span className="d-block"></span>
              <span className="d-block"></span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start"
        id="affanOffcanvas"
        data-bs-scroll="true"
        tabIndex={-1}
        aria-labelledby="affanOffcanvsLabel"
      >
        <button
          className="btn-close btn-close-white text-reset"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>

        <div className="offcanvas-body p-0">
          <div className="sidenav-wrapper">
            <div className="sidenav-profile bg-gradient">
              <div className="sidenav-style1"></div>

              {/* <div className="user-profile">
                <img src="/assets/img/bg-img/2.jpg" alt="" />
              </div> */}

              <div className="user-info">
                <h6 className="user-name mb-3">{user?.name}</h6>
                <div className="d-flex justify-content-center align-items-center">
                  <select
                    className="form-select form-select-sm w-50"
                    value={selectedCompany?.id ?? ""}
                    onChange={handleChange}
                  >
                    <option>Select Company</option>
                    {leads?.map((lead) => (
                      <option key={lead.id} value={lead.id}>
                        {lead.company_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* <ul className="sidenav-nav ps-0">
              <li>
                <Link to="/home">
                  <i className="bi bi-house-door"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/elements">
                  <i className="bi bi-folder2-open"></i> Elements
                  <span className="badge bg-danger rounded-pill ms-2">
                    220+
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/pages">
                  <i className="bi bi-collection"></i> Pages
                  <span className="badge bg-success rounded-pill ms-2">
                    100+
                  </span>
                </Link>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-cart-check"></i> Shop
                </a>
                <ul>
                  <li>
                    <Link to="/shop-grid"> Shop Grid</Link>
                  </li>
                  <li>
                    <Link to="/shop-list"> Shop List</Link>
                  </li>
                  <li>
                    <Link to="/shop-details"> Shop Details</Link>
                  </li>
                  <li>
                    <Link to="/cart"> Cart</Link>
                  </li>
                  <li>
                    <Link to="/checkout"> Checkout</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/settings">
                  <i className="bi bi-gear"></i> Settings
                </Link>
              </li>
              <li>
                <div className="night-mode-nav">
                  <i className="bi bi-moon"></i>
                  {theme === "dark" ? "Light" : "Dark"} Mode
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input form-check-success"
                      id="darkSwitch"
                      type="checkbox"
                      checked={theme === "dark"}
                      onChange={handleDarkModeToggle}
                    />
                  </div>
                </div>
              </li>
              <li>
                <Link to="/login">
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Link>
              </li>
            </ul> */}

            <div className="social-info-wrap">
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
              {/* <a href="#">
                <i className="bi bi-"></i>
              </a> */}
            </div>

            <div className="copyright-info">
              <p>
                <span id="copyrightYear"></span>
                {new Date().getFullYear()} © Made by{" "}
                <a
                  target="_blank"
                  href="https://themeforest.net/user/rk_theme/portfolio"
                >
                  rk theme
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
