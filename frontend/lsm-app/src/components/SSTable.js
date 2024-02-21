import React from "react";
import { useNavigate } from "react-router-dom";

const SSTable = () => {
  const navigate = useNavigate();

  return (
    <>
        <h1>
          This is the SSTable page
        </h1>

        <div>
          <p>This is a text specific to SSTable.</p>
        </div>

        {/* Button for returning to root */}
        <button onClick={() => navigate("/")}>
          Main Menu
        </button>
    </>
  );
};

export default SSTable;
