import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="custom-container">
        <div className="text-center px-4">
          <img
            className="login-intro-img"
            src="/assets/img/bg-img/36.png"
            alt=""
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
