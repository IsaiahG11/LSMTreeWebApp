import React from "react";
import { useNavigate } from "react-router-dom";

const Simulation = () => {
  const navigate = useNavigate();

  return (
    <>
        <h1>
          This is the Simulation page
        </h1>
        <div>
          <p>This is a text massage.</p>
        </div>

        {/* Button for returning to root */}
        <button onClick={() => navigate("/")}>
          Main Menu
        </button>

    </>
  );
};

export default Simulation;