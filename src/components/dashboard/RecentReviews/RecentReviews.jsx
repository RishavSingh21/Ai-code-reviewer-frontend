import { useNavigate } from "react-router-dom";
import "./RecentReviews.css";

const RecentReviews = ({ reviews }) => {
  const navigate = useNavigate();

  const getScoreColor = (score) => {
    if (score >= 80) return "var(--accent-green)";
    if (score >= 60) return "var(--accent-yellow)";
    return "var(--accent-red)";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const openReview = (review) => {
    sessionStorage.setItem("review", JSON.stringify(review));
    navigate("/result");
  };

  return (
    <div className="recent-card glass-card">
      <h3 className="section-title">Recent Reviews</h3>

      {!reviews || reviews.length === 0 ? (
        <p className="recent-empty">No reviews yet — start reviewing code!</p>
      ) : (
        <div className="recent-list stagger-children">
          {reviews.map((review) => (
            <div
              className="recent-row"
              key={review._id}
              onClick={() => openReview(review)}
            >
              <div className="recent-info">
                <span className="recent-lang-badge">{review.language}</span>
                <span className="recent-date">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="recent-score-wrapper">
                <span className="recent-label" style={{ color: getScoreColor(review.aiFeedback?.score || 0) }}>
                  {getScoreLabel(review.aiFeedback?.score || 0)}
                </span>
                <div className="recent-score-bar">
                  <div
                    className="recent-score-fill"
                    style={{
                      width: `${review.aiFeedback?.score || 0}%`,
                      background: getScoreColor(review.aiFeedback?.score || 0),
                    }}
                  />
                </div>
                <span className="recent-score-num" style={{ color: getScoreColor(review.aiFeedback?.score || 0) }}>
                  {review.aiFeedback?.score || 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentReviews;