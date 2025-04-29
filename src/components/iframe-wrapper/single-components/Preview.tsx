import React from "react";
import { Navigate } from "react-router-dom";

const Preview: React.FC = () => {
  return (
    <>
      {/* <div className="preview-hero-area">
        <div className="container demo-container direction-rtl">
          <div className="row g-2 align-items-center justify-content-center">
            <div className="text-center">
              <iframe className="shadow-lg" src="/login"></iframe>
            </div>
          </div>
        </div>
      </div> */}

      <Navigate to="/login" replace />
    </>
  );
};

export default Preview;
