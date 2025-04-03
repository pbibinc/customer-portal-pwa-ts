import { Link } from "react-router-dom";

const nav_data = [
  { id: 1, icon: "house", title: "Home", link: "home" },
  { id: 2, icon: "folder2-open", title: "Documents", link: "documents" },
  { id: 3, icon: "gear", title: "Settings", link: "settings" },
];

const FooterTwo = () => {
  return (
    <>
      <div className="footer-nav-area" id="footerNav">
        <div className="container px-0">
          <div className="footer-nav position-relative">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
              {nav_data.map((item, i) => (
                <li key={i}>
                  <Link to={`/${item.link}`}>
                    <i className={`bi bi-${item.icon}`}></i>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterTwo;
