import React from "react";
import { useNavigate } from "react-router-dom";

const Compaction = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Understanding Compaction in LSM Trees</h1>

      <h2>What is Compaction?</h2>
      <p>Compaction is a process in Log-Structured Merge Trees (LSM Trees) where smaller SSTables are merged into larger ones. It is a critical operation for maintaining efficiency, optimizing disk space, and ensuring the integrity of data stored in LSM Trees.</p>

      <h2>Key Features</h2>
      <ul>
          <li><strong>Merges Smaller SSTables into Larger Ones:</strong> Compaction combines multiple smaller SSTables into larger ones, reducing the number of individual SSTables and improving read and write performance.</li>
          <li><strong>Removes Obsolete or Overwritten Data:</strong> During the merge process, compaction identifies and removes any obsolete or overwritten data. This helps to reclaim disk space and ensures that only the most up-to-date data is retained in the LSM Tree.</li>
          <li><strong>Maintains Efficiency and Optimizes Disk Space:</strong> By consolidating SSTables and removing redundant data, compaction helps to optimize disk space usage and minimize fragmentation. This ensures that LSM Trees remain efficient and continue to perform well over time.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Compaction is a fundamental operation in LSM Trees, responsible for merging smaller SSTables, removing obsolete data, and optimizing disk space usage. By performing compaction regularly, LSM Trees can maintain efficiency, ensure data integrity, and deliver optimal performance for various storage systems.</p>


      {/* Button for returning to root */}
      <button onClick={() => navigate("/components")}>
        &larr; Components
      </button>
    </>
  );
};

export default Compaction;
