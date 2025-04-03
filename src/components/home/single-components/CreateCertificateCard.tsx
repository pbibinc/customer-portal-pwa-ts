import { Link } from "react-router-dom";

const CreateCertificateCard: React.FC = () => {
  return (
    <div className="container">
      <div
        className="card card-bg-img bg-img bg-overlay mb-3"
        style={{ backgroundImage: `url(/assets/img/bg-img/3.jpg)` }}
      >
        <div className="card-body direction-rtl p-4">
          <h2 className="text-white">Create Certificate</h2>
          <p className="mb-4 text-white">
            Creating or requesting certificates has never been easier.
          </p>
          <Link className="btn btn-warning" to="/certificate-form">
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificateCard;
