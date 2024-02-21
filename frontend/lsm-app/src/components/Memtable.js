import React from "react";
import { useNavigate } from "react-router-dom";

const Memtable = () => {
  const navigate = useNavigate();

  return (
    <>
        <h1>
          This is the Memtable page
        </h1>

        <div>
          <p>This is a text specific to Memtable.</p>
        </div>

        {/* Button for returning to root */}
        <button onClick={() => navigate("/")}>
          Main Menu
        </button>
    </>
  );
};

export default Memtable;
