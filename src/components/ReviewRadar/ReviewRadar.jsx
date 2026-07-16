import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import "./ReviewRadar.css";

const ReviewRadar = ({ subScores }) => {
  if (!subScores) return null;

  const data = [
    { subject: "Security", score: subScores.security || 0 },
    { subject: "Performance", score: subScores.performance || 0 },
    { subject: "Readability", score: subScores.readability || 0 },
    { subject: "Best Practices", score: subScores.bestPractices || 0 },
    { subject: "Maintainability", score: subScores.maintainability || 0 },
  ];

  return (
    <div className="radar-card glass-card">
      <h3>Quality Breakdown</h3>

      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="rgba(255,255,255,0.08)" />

          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />

          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#64748b", fontSize: 10 }}
          />

          <Radar
            name="Score"
            dataKey="score"
            stroke="#3b82f6"
            fill="rgba(59, 130, 246, 0.25)"
            strokeWidth={2}
          />

          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="radar-scores">
        {data.map((item) => (
          <div key={item.subject} className="radar-score-item">
            <span className="radar-label">{item.subject}</span>
            <div className="radar-bar-track">
              <div
                className="radar-bar-fill"
                style={{
                  width: `${item.score}%`,
                  background:
                    item.score >= 80
                      ? "var(--accent-green)"
                      : item.score >= 60
                      ? "var(--accent-yellow)"
                      : "var(--accent-red)",
                }}
              />
            </div>
            <span className="radar-value">{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewRadar;
