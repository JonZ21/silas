import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="w-10 h-10">
      <div className="container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default Loading;
