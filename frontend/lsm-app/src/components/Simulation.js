import React from "react";
import { useNavigate } from "react-router-dom";

const Simulation = () => {
  const navigate = useNavigate();

  return (
    <>
        <h1>
          This is the Simulation page
        </h1>
        <body>
          <p>This is a text massage.</p>
        </body>
    </>
  );
};

export default Simulation;