import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ActivityChart = ({ data }) => {
  return (
    <div className="chart-card">
      <h3>Review Activity</h3>

      {data.length === 0 ? (
        <div
          style={{
            height: 280,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#94a3b8",
          }}
        >
          No activity data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={11}
              tickFormatter={(v) => v.slice(5)}
            />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#f1f5f9",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              strokeWidth={3}
              dot={{ r: 4, fill: "#3b82f6" }}
              activeDot={{ r: 6 }}
              dataKey="count"
              stroke="#3b82f6"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ActivityChart;