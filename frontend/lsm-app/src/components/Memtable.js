import React from "react";
import { useNavigate } from "react-router-dom";

const Memtable = () => {
  const navigate = useNavigate();

  return (
    <>

      <h1>Understanding Memtables in LSM Trees</h1>

      <h2>What are Memtables?</h2>
      <p>Memtables, short for Memory Tables, are temporary, in-memory storage structures used in Log-Structured Merge Trees (LSM Trees). They serve as a staging area for incoming data before it's flushed to disk. Memtables play a crucial role in optimizing write performance and maintaining an ordered structure within LSM Trees.</p>

      <h2>Key Features</h2>
      <ul>
          <li><strong>Temporary, In-Memory Storage:</strong> Memtables reside entirely in memory, making them exceptionally fast for write operations. This temporary storage allows for rapid data ingestion and processing without immediate disk I/O overhead.</li>
          <li><strong>Fast Writes:</strong> One of the primary purposes of memtables is to facilitate fast write operations. By storing data in memory, memtables enable high-throughput writes, improving the overall efficiency of the LSM Tree data structure.</li>
          <li><strong>Ordered Structure (Sorted Key-Value Pairs):</strong> Memtables maintain an ordered structure of key-value pairs. This ordering ensures efficient read and write operations by leveraging data locality and facilitating quick searches and lookups.</li>
          <li><strong>Skip List Implementation:</strong> To achieve both fast writes and an ordered structure, memtables often employ a Skip List data structure. Skip Lists enable efficient insertion, deletion, and searching operations with an expected time complexity of O(log n). This implementation further enhances the performance of memtables within LSM Trees.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Memtables are critical components of LSM Trees, providing temporary, high-speed storage for incoming data while ensuring an ordered structure through efficient Skip List implementations. By leveraging these key features, LSM Trees can efficiently handle write-heavy workloads and maintain optimal performance in various storage systems.</p>

      {/* Button for returning to root */}
      <button onClick={() => navigate("/components")}>
        &larr; Components
      </button>

    </>
  );
};

export default Memtable;
