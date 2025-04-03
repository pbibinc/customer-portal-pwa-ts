import { useState } from "react";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelectedCompanyStore } from "../../../stores/SelectedCompanyStore";

const PolicySlider: React.FC = () => {
  const { selectedCompany } = useSelectedCompanyStore();
  const activePolicies = selectedCompany?.activePolicies ?? [];
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);

  return (
    <div className="container">
      <div className="card mb-3">
        <div className="card-body">
          <h3>Current Policies</h3>
          <div className="testimonial-slide-three-wrapper">
            <Swiper
              loop
              slidesPerView={1}
              spaceBetween={0}
              pagination={{
                el: ".tns-nav",
                clickable: true,
              }}
              modules={[Pagination]}
              className="testimonial-slide3 testimonial-style3"
            >
              {activePolicies.map((policy, index) => {
                const effDate = policy.effective_date
                  ? new Date(policy.effective_date).toDateString()
                  : "N/A";

                const expDate = policy.expiration_date
                  ? new Date(policy.expiration_date).toDateString()
                  : "N/A";

                return (
                  <SwiperSlide key={index} className="single-testimonial-slide">
                    <div className="text-content">
                      <h6 className="mb-2">{policy.policy_number}</h6>
                      <p className="mb-4">
                        {effDate} - {expDate}
                      </p>
                      <span className="d-block" style={{ color: "#8480AE" }}>
                        {policy?.QuotationProduct?.product}
                      </span>
                      <button
                        className="btn btn-primary rounded-pill btn-sm mt-2"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#fullscreenModal"
                        onClick={() => setCurrentFileUrl(policy?.file ?? null)}
                      >
                        View Policy
                      </button>
                    </div>
                  </SwiperSlide>
                );
              })}
              <div className="tns-nav"></div>
            </Swiper>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="fullscreenModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {currentFileUrl ? (
                <EmbedPDF
                  companyIdentifier="react-viewer"
                  mode="inline"
                  style={{ width: "100%", height: "600px" }}
                  documentURL={currentFileUrl}
                />
              ) : (
                <p>No policy file available.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicySlider;
