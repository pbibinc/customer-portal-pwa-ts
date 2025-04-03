import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="preview-footer-area py-4">
        <div className="container demo-container direction-rtl h-100 d-flex align-items-center justify-content-center">
          <p className="mb-0">
            <span id="copyrightYear"></span> Copyright{" "}
            {new Date().getFullYear()} Made with ❤️ by IT
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
