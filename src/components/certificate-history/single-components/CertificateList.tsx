import React, { useState, useMemo } from "react";
import { useLeadStore } from "../../../stores/LeadStore";

const CertificateList: React.FC = () => {
  const { leads } = useLeadStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const allCertificates = useMemo(() => {
    return leads.flatMap(
      (lead) =>
        lead.certificate?.map((cert) => ({
          ...cert,
          leadId: lead.id,
        })) || []
    );
  }, [leads]);

  const totalPages = Math.ceil(allCertificates.length / perPage);

  const paginatedCertificates = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return allCertificates.slice(start, start + perPage);
  }, [allCertificates, currentPage, perPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getEncodedMediaUrl = (filepath: string): string => {
    const parts = filepath.split("/");
    const basePath = parts.slice(0, -1).join("/");
    const encodedFile = encodeURIComponent(parts.pop()!);
    return `${basePath}/${encodedFile}`;
  };

  return (
    <div className="page-content-wrapper py-3 rk_table_2 rk_table">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
              <div className="dataTable-top d-flex justify-content-between">
                <div className="dataTable-dropdown">
                  <label>
                    <select
                      className="dataTable-selector"
                      value={perPage}
                      onChange={(e) => {
                        setPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      {[10, 20, 30, 40, 50].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="dataTable-container">
                <table className="w-100 dataTable-table" id="dataTable">
                  <thead>
                    <tr>
                      <th style={{ padding: "8px" }}>
                        <a href="#" className="dataTable-sorter">
                          Date Requested
                        </a>
                      </th>
                      <th style={{ padding: "8px" }}>
                        <a href="#" className="dataTable-sorter">
                          Cert Holder
                        </a>
                      </th>
                      <th style={{ padding: "8px" }}>
                        <a href="#" className="dataTable-sorter">
                          Notes
                        </a>
                      </th>
                      <th style={{ padding: "8px" }}>
                        <a href="#" className="dataTable-sorter">
                          File
                        </a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCertificates.map((cert, index) => (
                      <tr key={index}>
                        <td>{cert.requested_date}</td>
                        <td>{cert.cert_holder}</td>
                        <td>{cert.status}</td>
                        <td>
                          {cert.media && (
                            <a
                              href={getEncodedMediaUrl(
                                `${import.meta.env.VITE_BASE_URL}/${
                                  cert.media.filepath
                                }`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Created: ${new Date(
                                cert.media.created_at
                              ).toLocaleString()}`}
                              style={{
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <i
                                className="bi bi-file-earmark-pdf-fill"
                                style={{ fontSize: "1.2rem", color: "red" }}
                              ></i>
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="dataTable-bottom">
                <div className="dataTable-info mb-2">
                  Showing{" "}
                  {Math.min(
                    (currentPage - 1) * perPage + 1,
                    allCertificates.length
                  )}{" "}
                  to {Math.min(currentPage * perPage, allCertificates.length)}{" "}
                  of {allCertificates.length} entries
                </div>
                <div
                  className="d-flex justify-content-center gap-2 align-items-center dataTable-pagination"
                  style={{ listStyle: "none" }}
                >
                  <li className="pager">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                    >
                      <i className="bi bi-arrow-left-short"></i>
                    </a>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <li
                        key={page}
                        className={page === currentPage ? "active" : ""}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </a>
                      </li>
                    )
                  )}
                  <li className="pager">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }}
                    >
                      <i className="bi bi-arrow-right-short"></i>
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateList;
