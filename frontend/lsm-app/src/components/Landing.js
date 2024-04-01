import React from "react";
import { useNavigate } from "react-router-dom";
import "../Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 style={{ color: "blue" }}>
              LSM Web App
          </h1>
          <button onClick={() => navigate("/trans-logs")}>
              Transaction Logs
          </button>
          <button onClick={() => navigate("/components")}>
              Components
          </button>
          <button onClick={() => navigate("/simulation")}>
              Simulation
          </button>
    </>
  );
};

export default Landing;