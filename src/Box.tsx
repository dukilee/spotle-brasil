import React from "react";
import "./Box.css";

type BoxProps = {
  title: string;
  number: string;
  status?: "default" | "success" | "warning" | "error";
};

const InfoBox: React.FC<BoxProps> = ({ title, number, status = "default" }) => {
  return (
    <div className={`info-box ${status}`}>
      <div className="info-title">{title}</div>
      <div className="info-number">{number}</div>
    </div>
  );
};

export default InfoBox;