// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoginStore } from "../stores/LoginStore";
import { useLeadStore } from "../stores/LeadStore";
import { useSelectedCompanyStore } from "../stores/SelectedCompanyStore";
import LogoLight from "@assets/img/logo_light.jpg";
import LogoDark from "@assets/img/logo_dark.png";
import { useDarkModeStore } from "../stores/DarkModeStore";

const Header: React.FC = () => {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     import("bootstrap/dist/js/bootstrap");
  //   }
  // }, []);

  const { theme } = useDarkModeStore();
  const { user } = useLoginStore();
  const { leads } = useLeadStore();
  const { selectedCompany, setSelectedCompany } = useSelectedCompanyStore();

  // const { theme, mounted } = useDarkModeStore((state) => ({
  //   theme: state.theme,
  //   mounted: state.mounted,
  // }));

  // useEffect(() => {
  //   useDarkModeStore.getState().init(); // 👈 only once, safe!
  // }, []);

  // if (!mounted) {
  //   return null;
  // }

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
                <img src={theme === "dark" ? LogoDark : LogoLight} alt="Logo" />
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
                <div className="d-flex justify-content-center align-items-center p-3">
                  <select
                    className="form-select form-select-sm"
                    style={{ textAlign: "center" }}
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

            <div className="social-info-wrap">
              <a href="https://www.facebook.com/pbibins" target="_blank">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/pbibins/" target="_blank">
                <i className="bi bi-instagram"></i>
              </a>
            </div>

            <div className="copyright-info">
              <p>
                <span id="copyrightYear"></span>
                {new Date().getFullYear()} © Pascal Burke Insurance Brokerage
                Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
