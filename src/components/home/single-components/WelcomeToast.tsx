import { useEffect, useState } from "react";
import { useLoginStore } from "../../../stores/LoginStore";

const WelcomeToast: React.FC = () => {
  const { user } = useLoginStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasShownToast = localStorage.getItem("hasShownWelcomeToast");

    if (!hasShownToast) {
      setShow(true);
      localStorage.setItem("hasShownWelcomeToast", "true");
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`toast toast-autohide custom-toast-1 toast-success home-page-toast show`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-delay="7000"
      data-bs-autohide="true"
    >
      <div className="toast-body">
        <i className="bi bi-bookmark-check text-white h1 mb-0"></i>
        <div className="toast-text ms-3 me-2">
          <p className="mb-1 text-white">Welcome {user?.name}!</p>
        </div>
      </div>
      <button
        onClick={() => setShow(false)}
        className="btn btn-close btn-close-white position-absolute p-1"
        type="button"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default WelcomeToast;
