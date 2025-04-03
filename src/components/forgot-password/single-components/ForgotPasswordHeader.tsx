import React from "react";
import { Link } from "react-router-dom";

interface ForgotPasswordHeaderProps {
  links: string;
}

const ForgotPasswordHeader: React.FC<ForgotPasswordHeaderProps> = ({
  links,
}) => {
  return (
    <>
      <div className="login-back-button">
        <Link to={`/${links}`}>
          <i className="bi bi-arrow-left-short"></i>
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordHeader;
