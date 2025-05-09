import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const AdsSlider: React.FC = () => {
  return (
    <>
      <div className="tiny-slider-one-wrapper">
        <div
          className="tns-controls"
          aria-label="Carousel Navigation"
          tabIndex={-1}
        >
          <button
            type="button"
            className="prev-button"
            data-controls="prev"
            tabIndex={-1}
            aria-controls="tns1"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            type="button"
            className="next-button"
            data-controls="next"
            tabIndex={-1}
            aria-controls="tns1"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        <div className="tns-nav"></div>

        <Swiper
          loop={true}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          pagination={{
            el: ".tns-nav",
            clickable: true,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          navigation={{
            nextEl: ".next-button",
            prevEl: ".prev-button",
          }}
          className="tiny-slider-one"
        >
          {/* <!-- Single Hero Slide --> */}
          <SwiperSlide>
            <div
              className="single-hero-slide bg-overlay"
              style={{ backgroundImage: `url(/assets/img/bg-img/31.jpg)` }}
            >
              <div className="h-100 d-flex align-items-center text-center">
                <div className="container">
                  <h3 className="text-white mb-1">
                    Visit us on our new website
                  </h3>
                  <a
                    className="btn btn-creative btn-warning"
                    href="https://pbibinc.com"
                    target="_blank"
                  >
                    Click Here
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* <!-- Single Hero Slide --> */}
          <SwiperSlide>
            <div
              className="single-hero-slide bg-overlay"
              style={{ backgroundImage: `url(/assets/img/bg-img/33.jpg)` }}
            >
              <div className="h-100 d-flex align-items-center text-center">
                <div className="container">
                  <h3 className="text-white mb-1">
                    Want to get hassle-free quotation tailored for your
                    business?
                  </h3>
                  <a
                    className="btn btn-creative btn-warning"
                    target="_blank"
                    href="https://quote.pbibinc.com?utm_source=customer_portal&utm_medium=app&utm_campaign=banner"
                  >
                    Click Here
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* <!-- Single Hero Slide --> */}
          <SwiperSlide>
            <div
              className="single-hero-slide bg-overlay"
              style={{ backgroundImage: `url(/assets/img/bg-img/32.jpg)` }}
            >
              <div className="h-100 d-flex align-items-center text-center">
                <div className="container">
                  <h3 className="text-white mb-1">
                    Take a survey form to know what insurances that you don't
                    have that fits on your business
                  </h3>
                  <a
                    className="btn btn-creative btn-warning"
                    target="_blank"
                    href="https://quote.pbibinc.com?utm_source=customer_portal&utm_medium=app&utm_campaign=banner"
                  >
                    Click Here
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default AdsSlider;
