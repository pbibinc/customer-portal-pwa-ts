import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosClient from "../../../api/axiosClient";
import { useLoginStore } from "../../../stores/LoginStore";

interface ChangePasswordFormProps {
  current_password: string;
  new_password: string;
  repeat_password: string;
}

const ChangePasswordForm: React.FC = () => {
  const { user } = useLoginStore();
  const userId = user?.id;

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormProps>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const onSubmit: SubmitHandler<ChangePasswordFormProps> = async (data) => {
    const { current_password, new_password, repeat_password } = data;

    if (new_password !== repeat_password) {
      setSubmitStatus({
        type: "error",
        message: "New password and repeat password do not match.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: "" });

      await axiosClient.post(
        "/api/change-password",
        {
          userId,
          current_password,
          new_password,
          new_password_confirmation: repeat_password,
        },
        {
          headers: {
            // Example: Include your auth token if needed
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
        }
      );

      setSubmitStatus({
        type: "success",
        message: "Password successfully updated.",
      });

      reset();
    } catch (error: unknown) {
      setSubmitStatus({
        type: "error",
        message:
          (error as { message: string })?.message ||
          "Failed to change password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-content-wrapper py-3">
      <div className="container">
        <div className="element-heading">
          <h6>Reset Password Form</h6>
        </div>
      </div>
      <div className="container">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {/* Current Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="current_password">
                Current Password
              </label>
              <input
                className="form-control"
                id="current_password"
                type="password"
                placeholder="Enter current password"
                {...register("current_password", {
                  required: "Current password is required",
                })}
              />
              {errors.current_password && (
                <p className="fw-normal mt-2 text-danger">
                  {errors.current_password.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="new_password">
                New Password
              </label>
              <input
                className="form-control"
                id="new_password"
                type="password"
                placeholder="Enter new password"
                {...register("new_password", {
                  required: "New password is required",
                })}
              />
              {errors.new_password && (
                <p className="fw-normal mt-2 text-danger">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            {/* Repeat Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="repeat_password">
                Repeat Password
              </label>
              <input
                className="form-control"
                id="repeat_password"
                type="password"
                placeholder="Repeat new password"
                {...register("repeat_password", {
                  required: "Please confirm your new password",
                })}
              />
              {errors.repeat_password && (
                <p className="fw-normal mt-2 text-danger">
                  {errors.repeat_password.message}
                </p>
              )}
            </div>

            {/* Submission Status */}
            {submitStatus.type && (
              <div
                className={`alert alert-${
                  submitStatus.type === "success" ? "success" : "danger"
                } mt-3`}
                role="alert"
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center mt-3"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                <>
                  Update Password
                  <i className="bi bi-arrow-right fz-16 ms-1"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
