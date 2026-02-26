import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  showTextAnchor,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            stroke="none"
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: "13px", paddingTop: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>

      {showTextAnchor && (
        <div
          style={{
            position: "absolute",
            top: "43%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>{label}</p>
          <p
            style={{
              color: "#333",
              fontSize: "24px",
              fontWeight: "600",
              margin: 0,
            }}
          >
            {totalAmount}
          </p>
        </div>
      )}
    </div>
  );
};
export default CustomPieChart;
