import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelectedCompanyStore } from "../../../stores/SelectedCompanyStore";

const PolicySlider: React.FC = () => {
  const { selectedCompany } = useSelectedCompanyStore();
  const activePolicies = selectedCompany?.activePolicies ?? [];

  const openPolicyInNewTab = (fileUrl: string | null) => {
    if (!fileUrl) return;

    const urlParts = fileUrl.split("/");
    const basePath = urlParts.slice(0, -1).join("/");
    const encodedFileName = encodeURIComponent(urlParts.pop()!);
    const finalUrl = `${
      import.meta.env.VITE_BASE_URL
    }/${basePath}/${encodedFileName}`;

    console.log(finalUrl);

    window.open(finalUrl, "_blank");
  };

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
                        onClick={() => openPolicyInNewTab(policy.file ?? null)}
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
    </div>
  );
};

export default PolicySlider;
