import React from "react";
import { useNavigate } from "react-router-dom";


const Components = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to the Components Page</h1>

      {/* Button for returning to root */}
      <button onClick={() => navigate("/")}>
        Main Menu
      </button>

      {/* Button for Memtable */}
      <button onClick={() => navigate("/components/memtable")}>
        Memtable
      </button>

      {/* Button for SSTable */}
      <button onClick={() => navigate("/components/sstable")}>
        SSTable
      </button>

      {/* Button for Compaction */}
      <button onClick={() => navigate("/components/compaction")}>
        Compaction
      </button>
    </>
  );
};

export default Components;