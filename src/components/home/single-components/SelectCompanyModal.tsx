import React, { useEffect } from "react";
import { LeadCompanyInfoProps } from "../../../stores/LeadInfo";
import { Modal } from "bootstrap";

interface SelectCompanyModalProps {
  leads: LeadCompanyInfoProps[];
  setModalInstance: (modal: Modal | null) => void;
  handleSaveChanges: () => void;
  selectedLocalCompanyId: number | null;
  setSelectedLocalCompanyId: (id: number | null) => void;
}

const SelectCompanyModal: React.FC<SelectCompanyModalProps> = ({
  leads,
  setModalInstance,
  handleSaveChanges,
  selectedLocalCompanyId,
  setSelectedLocalCompanyId,
}: SelectCompanyModalProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/js/dist/modal").then(() => {
        const modalElement = document.getElementById("bottomAlignModal");
        if (modalElement) {
          const bsModal = new Modal(modalElement, {
            backdrop: "static",
            keyboard: false,
          });
          setModalInstance(bsModal);
        }
      });
    }
  }, []);

  return (
    <div
      className="modal fade"
      id="bottomAlignModal"
      tabIndex={-1}
      aria-labelledby="bottomAlignModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-bottom">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="bottomAlignModalLabel">
              Select Company
            </h5>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="card">
                <div className="card-body">
                  {/* <!-- Single Plan Check --> */}
                  {leads.map((lead) => (
                    <div
                      className="single-plan-check shadow-sm active-effect"
                      key={lead.id}
                    >
                      <div className="form-check mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="leadCompany"
                          id={lead.company_name}
                          value={lead.id}
                          checked={lead.id === selectedLocalCompanyId}
                          onChange={() => setSelectedLocalCompanyId(lead.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={lead.company_name}
                        >
                          {lead.company_name}
                        </label>
                      </div>
                      <i className="bi bi-person text-primary fz-20 ms-auto"></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCompanyModal;
