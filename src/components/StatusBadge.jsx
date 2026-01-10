import React from "react";

function StatusBadge({ status }) {
  let bgColor = "#999";
  let label = status;

  if (status === "applied") {
    bgColor = "#28a745"; // green
    label = "Applied";
  } else if (status === "shortlisted") {
    bgColor = "#ffc107"; // yellow
    label = "Shortlisted";
  } else if (status === "rejected") {
    bgColor = "#dc3545"; // red
    label = "Rejected";
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "5px 12px",
        borderRadius: "20px",
        backgroundColor: bgColor,
        color: "#fff",
        fontSize: "13px",
        fontWeight: "bold",
        textTransform: "capitalize",
      }}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
