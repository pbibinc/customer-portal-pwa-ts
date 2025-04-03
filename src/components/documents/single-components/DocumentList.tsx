import React from "react";
import { Link } from "react-router-dom";
import list_structure from "../single-components/list_structure";

interface ListingProps {
  category: string;
  icon: string;
  description: string;
  items: Items[];
}

interface Items {
  name: string;
  href: string;
}

const DocumentList: React.FC<ListingProps> = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  // const filteredElements = list_structure
  //   .map((element) => ({
  //     ...element,
  //     items: element.items.filter((item) =>
  //       item.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     ),
  //   }))
  //   .filter((element) => element.items.length > 0);

  return (
    <div className="page-content-wrapper py-3" id="elementsSearchList">
      <div className="container">
        {/* <div className="card">
          <div className="card-body p-3">
            <div className="form-group mb-0">
              <input
                type="text"
                id="elementsSearchInput"
                placeholder="Search element..."
                className="form-control"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div> */}

        {list_structure.map((item, index) => (
          <React.Fragment key={index}>
            <div className="affan-element-item">
              <div className="element-heading-wrapper">
                <i className={item.icon}></i>
                <div className="heading-text">
                  <h6 className="mb-1">{item.category}</h6>
                  <span>{item.description}</span>
                </div>
              </div>
            </div>

            {item.items.map((link, i) => (
              <Link key={i} className="affan-element-item" to={link.href}>
                {link.name}
                <i className="bi bi-caret-right-fill fz-12"></i>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <nav aria-label="Page navigation example">
              <ul className="pagination direction-rtl pagination-two">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <i className="bi bi-chevron-left"></i>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    9
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <i className="bi bi-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
