import { Link } from "react-router-dom";

const CertificateHistoryCard: React.FC = () => {
  return (
    <div className="container">
      <div
        className="card bg-primary mb-3 bg-img"
        style={{ backgroundImage: `url(/assets/img/core-img/1.png)` }}
      >
        <div className="card-body direction-rtl p-4">
          <h2 className="text-white">Certificate History</h2>
          <p className="mb-4 text-white">View all of your certificates here.</p>
          <Link className="btn btn-warning" to="/certificate-list">
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CertificateHistoryCard;
