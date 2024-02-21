import React from "react";
import { useNavigate } from "react-router-dom";

const Compaction = () => {
  const navigate = useNavigate();

  return (
    <>
        <h1>
          This is the Compaction page
        </h1>

        <div>
          <p>This is a text specific to Compaction.</p>
        </div>

        {/* Button for returning to root */}
        <button onClick={() => navigate("/")}>
          Main Menu
        </button>
    </>
  );
};

export default Compaction;
