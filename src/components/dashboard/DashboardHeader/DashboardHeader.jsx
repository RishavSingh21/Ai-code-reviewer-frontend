import "./DashboardHeader.css";

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <div>
        <h1>Welcome Back 👋</h1>

        <p>
          Analyze, optimize and improve your code using AI.
        </p>
      </div>

      <div className="dashboard-date">
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default DashboardHeader;