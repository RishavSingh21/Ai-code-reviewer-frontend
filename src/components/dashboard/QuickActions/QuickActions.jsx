import { useNavigate } from "react-router-dom";

import "./QuickActions.css";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">
      <h3 className="section-title">Quick Actions</h3>

      <div className="actions-grid stagger-children">
        <button className="action-card" onClick={() => navigate("/editor")}>
          <span className="action-icon">✨</span>
          <div>
            <strong>New Review</strong>
            <span>Analyze code with AI</span>
          </div>
        </button>

        <button className="action-card" onClick={() => navigate("/batch")}>
          <span className="action-icon">📁</span>
          <div>
            <strong>Batch Review</strong>
            <span>Review multiple files</span>
          </div>
        </button>

        <button className="action-card" onClick={() => navigate("/history")}>
          <span className="action-icon">📜</span>
          <div>
            <strong>Review History</strong>
            <span>Browse past reviews</span>
          </div>
        </button>

        <button className="action-card" onClick={() => navigate("/analytics")}>
          <span className="action-icon">📊</span>
          <div>
            <strong>Analytics</strong>
            <span>Quality trends & insights</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;