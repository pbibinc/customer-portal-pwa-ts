import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  return (
    <div className="register-form mt-4">
      <Link to="/forget-password-success">
        <form
          action="/forget-password-success"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-group text-start mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Enter your email address"
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Reset Password
          </button>
        </form>
      </Link>
    </div>
  );
};

export default ForgotPassword;
