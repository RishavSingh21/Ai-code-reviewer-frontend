import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

const LanguageChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <h3>Languages Used</h3>
        <div
          style={{
            height: 280,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#94a3b8",
          }}
        >
          No review data available
        </div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3>Languages Used</h3>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="language"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            label={({ language, percent }) =>
              `${language} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#f1f5f9",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LanguageChart;