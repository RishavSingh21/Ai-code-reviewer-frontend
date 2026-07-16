import "./SkeletonLoader.css";

const SkeletonLoader = ({ type = "dashboard" }) => {
  if (type === "dashboard") {
    return (
      <div className="skeleton-dashboard">
        <div className="skeleton-header">
          <div className="skeleton" style={{ width: "220px", height: "32px" }} />
          <div className="skeleton" style={{ width: "300px", height: "16px", marginTop: "8px" }} />
        </div>

        <div className="skeleton-stats">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-stat-card">
              <div className="skeleton" style={{ width: "48px", height: "48px", borderRadius: "12px" }} />
              <div>
                <div className="skeleton" style={{ width: "80px", height: "28px" }} />
                <div className="skeleton" style={{ width: "100px", height: "14px", marginTop: "6px" }} />
              </div>
            </div>
          ))}
        </div>

        <div className="skeleton-charts">
          <div className="skeleton-chart">
            <div className="skeleton" style={{ width: "140px", height: "20px" }} />
            <div className="skeleton" style={{ width: "100%", height: "250px", marginTop: "16px" }} />
          </div>
          <div className="skeleton-chart">
            <div className="skeleton" style={{ width: "140px", height: "20px" }} />
            <div className="skeleton" style={{ width: "100%", height: "250px", marginTop: "16px" }} />
          </div>
        </div>
      </div>
    );
  }

  if (type === "result") {
    return (
      <div className="skeleton-result">
        <div className="skeleton" style={{ width: "200px", height: "32px" }} />
        <div className="skeleton" style={{ width: "100%", height: "80px", marginTop: "16px" }} />
        <div className="skeleton" style={{ width: "100%", height: "200px", marginTop: "16px" }} />
        <div className="skeleton" style={{ width: "100%", height: "300px", marginTop: "16px" }} />
      </div>
    );
  }

  if (type === "history") {
    return (
      <div className="skeleton-history">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton-history-card">
            <div>
              <div className="skeleton" style={{ width: "120px", height: "20px" }} />
              <div className="skeleton" style={{ width: "80px", height: "14px", marginTop: "6px" }} />
            </div>
            <div className="skeleton" style={{ width: "100px", height: "32px" }} />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
