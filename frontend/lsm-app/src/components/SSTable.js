import React from "react";
import { useNavigate } from "react-router-dom";

const SSTable = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Understanding SSTables in LSM Trees</h1>

      <h2>What are SSTables?</h2>
      <p>SSTables, short for Sorted String Tables, are persistent storage structures used in Log-Structured Merge Trees (LSM Trees). They serve as the primary storage mechanism for data in LSM Trees, providing durability and efficient read operations.</p>

      <h2>Key Features</h2>
      <ul>
          <li><strong>Sorted String Table:</strong> SSTables store data in sorted order based on keys. This sorted arrangement enables fast and efficient read operations, as it allows for optimized search and retrieval of data.</li>
          <li><strong>The Persistent Memory for LSM Trees:</strong> SSTables serve as the persistent storage layer for LSM Trees. Once data is flushed from memtables, it's stored in SSTables, ensuring durability and long-term data persistence.</li>
          <li><strong>Populated via Flushes of Memtables into SSTables:</strong> Memtables periodically flush their contents into SSTables. This process involves writing the sorted key-value pairs from memtables to SSTables, ensuring that the data is persisted and available for future reads.</li>
          <li><strong>Sorted Data Optimizes Read Operations:</strong> By storing data in sorted order, SSTables facilitate efficient read operations. This optimization reduces the time complexity of read queries, improving the overall performance of LSM Trees.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>SSTables are essential components of LSM Trees, providing durable and efficient storage for data. By leveraging their sorted nature and persistent memory characteristics, SSTables optimize read operations and ensure the reliability of LSM Tree-based storage systems.</p>


      {/* Button for returning to root */}
      <button onClick={() => navigate("/components")}>
        &larr; Components
      </button>
    </>
  );
};

export default SSTable;
