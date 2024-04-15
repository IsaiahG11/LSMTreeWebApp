import React from "react";
import { useNavigate } from "react-router-dom";
import "../Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="centered-container">
      <h1 style={{ color: "blue", fontSize: "10vw" }}>
        LSM Web App
      </h1>
      <br></br>
      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => navigate("/trans-logs")} style={{ marginLeft: "1vw", marginRight: "1vw", padding: "1vw 2vw" }}>
          Transaction Logs
        </button>
        <button onClick={() => navigate("/components")} style={{ marginLeft: "1vw", marginRight: "1vw", padding: "1vw 2vw" }}>
          Components
        </button>
        <button onClick={() => navigate("/simulation")} style={{ marginLeft: "1vw", marginRight: "1vw", padding: "1vw 2vw" }}>
          Simulation
        </button>
      </div>
    </div>
  );
};

export default Landing;
