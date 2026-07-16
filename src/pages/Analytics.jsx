import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";
import ReviewRadar from "../components/ReviewRadar/ReviewRadar";
import api from "../services/api";
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import "./Analytics.css";

const COLORS = {
  critical: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  suggestion: "#10b981",
};

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <SkeletonLoader type="dashboard" />
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="empty-state">
          <span className="empty-icon">📊</span>
          <h2>No Analytics Data</h2>
          <p>Start reviewing code to see analytics here.</p>
        </div>
      </Layout>
    );
  }

  const tooltipStyle = {
    contentStyle: {
      background: "#1e293b",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      color: "#f1f5f9",
      fontSize: "12px",
    },
  };

  return (
    <Layout>
      <h1 className="page-title">Analytics</h1>
      <p className="page-subtitle">Code quality insights and trends</p>

      {/* Stats Row */}
      <div className="analytics-stats">
        <div className="analytics-stat glass-card">
          <span className="stat-number">{data.stats.totalReviews}</span>
          <span className="stat-label">Total Reviews</span>
        </div>
        <div className="analytics-stat glass-card">
          <span className="stat-number" style={{
            color: data.stats.averageScore >= 70 ? "var(--accent-green)" : "var(--accent-yellow)"
          }}>
            {data.stats.averageScore}%
          </span>
          <span className="stat-label">Average Score</span>
        </div>
        <div className="analytics-stat glass-card">
          <span className="stat-number">{data.stats.languagesUsed}</span>
          <span className="stat-label">Languages</span>
        </div>
        <div className="analytics-stat glass-card">
          <span className="stat-number">{data.stats.todayReviews}</span>
          <span className="stat-label">Today</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="analytics-grid">
        {/* Review Trend */}
        <div className="analytics-card glass-card">
          <h3>Review Activity (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.reviewTrend || []}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickFormatter={(v) => v.slice(5)} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quality Radar */}
        {data.averageSubScores && (
          <div className="analytics-card">
            <ReviewRadar subScores={data.averageSubScores} />
          </div>
        )}

        {/* Score Distribution */}
        {data.scoreDistribution?.length > 0 && (
          <div className="analytics-card glass-card">
            <h3>Score Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.scoreDistribution}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="range" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {data.scoreDistribution.map((entry, index) => {
                    const colors = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#3b82f6"];
                    return <rect key={index} fill={colors[index] || "#3b82f6"} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Common Issues */}
        {data.commonIssues?.length > 0 && (
          <div className="analytics-card glass-card">
            <h3>Common Issues</h3>
            <div className="issues-list">
              {data.commonIssues.map((issue, i) => (
                <div key={i} className="issue-item">
                  <div className="issue-info">
                    <span className={`severity-badge severity-${issue.severity}`}>
                      {issue.severity}
                    </span>
                    <span className="issue-category">{issue.category}</span>
                  </div>
                  <span className="issue-count">{issue.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Language Distribution */}
        {data.languageDistribution?.length > 0 && (
          <div className="analytics-card glass-card">
            <h3>Language Distribution</h3>
            <div className="lang-bars">
              {data.languageDistribution.map((lang, i) => {
                const max = data.languageDistribution[0]?.count || 1;
                const pct = Math.round((lang.count / max) * 100);
                const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
                return (
                  <div key={i} className="lang-bar-item">
                    <div className="lang-bar-label">
                      <span>{lang.language}</span>
                      <span>{lang.count} reviews</span>
                    </div>
                    <div className="lang-bar-track">
                      <div
                        className="lang-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: colors[i % colors.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Activity Heatmap */}
        {data.heatmapData?.length > 0 && (
          <div className="analytics-card glass-card">
            <h3>Activity Heatmap (Last 90 Days)</h3>
            <div className="heatmap-container">
              <div className="heatmap-grid">
                {generateHeatmapDays(data.heatmapData).map((day, i) => (
                  <div
                    key={i}
                    className="heatmap-cell"
                    title={`${day.date}: ${day.count} reviews`}
                    style={{
                      background:
                        day.count === 0
                          ? "rgba(255,255,255,0.03)"
                          : day.count <= 2
                          ? "rgba(59, 130, 246, 0.3)"
                          : day.count <= 5
                          ? "rgba(59, 130, 246, 0.5)"
                          : "rgba(59, 130, 246, 0.8)",
                    }}
                  />
                ))}
              </div>
              <div className="heatmap-legend">
                <span>Less</span>
                <div className="heatmap-cell" style={{ background: "rgba(255,255,255,0.03)" }} />
                <div className="heatmap-cell" style={{ background: "rgba(59,130,246,0.3)" }} />
                <div className="heatmap-cell" style={{ background: "rgba(59,130,246,0.5)" }} />
                <div className="heatmap-cell" style={{ background: "rgba(59,130,246,0.8)" }} />
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

function generateHeatmapDays(heatmapData) {
  const map = {};
  heatmapData.forEach((d) => { map[d.date] = d.count; });

  const days = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    days.push({ date: key, count: map[key] || 0 });
  }
  return days;
}

export default Analytics;
