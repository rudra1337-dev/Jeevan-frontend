import React from "react";
import "../styles/Loader.css";

export default function MicrochipAnimation() {
  return (
    <div className="microchip-container">
      <svg
        className="microchip-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 200 200"
      >
        <rect className="chip-body" x="50" y="50" width="100" height="100" rx="8" />
        {/* Example pins */}
        <rect className="chip-pin" x="95" y="20" width="10" height="20" />
        <rect className="chip-pin" x="95" y="160" width="10" height="20" />
        {/* Add your full microchip SVG here */}
      </svg>
    </div>
  );
}