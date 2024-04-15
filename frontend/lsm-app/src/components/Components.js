import React from "react";
import { useNavigate } from "react-router-dom";


const Components = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Understanding LSM Trees</h1>

      <p>Log-Structured Merge Trees (LSM Trees) are a popular data structure used in modern database systems for efficient storage and retrieval of data. LSM Trees comprise three key components that work together to achieve high performance and scalability: Memtables, SSTables, and Compaction.</p>

      <h2>Memtables</h2>
      <p>Memtables serve as temporary, in-memory storage structures within LSM Trees. They facilitate fast write operations by buffering incoming data before flushing it to persistent storage.</p>

      <h2>SSTables</h2>
      <p>SSTables, or Sorted String Tables, are the persistent storage layer of LSM Trees. They store data in sorted order based on keys, optimizing read operations and providing durability.</p>

      <h2>Compaction</h2>
      <p>Compaction is the process of merging smaller SSTables into larger ones to maintain efficiency and optimize disk space usage. It removes obsolete or overwritten data during the merge operation.</p>

      <h2>Conclusion</h2>
      <p>Memtables, SSTables, and Compaction are integral components of LSM Trees, working together to provide fast write and read operations, durability, and efficient disk space usage. Understanding how these components interact is key to leveraging the benefits of LSM Trees in various storage systems.</p>

      <p>For more in-depth information on each component, explore the following pages:</p>

      {/* Button for Memtable */}
      <button onClick={() => navigate("/components/memtable")} style={{ marginLeft: "1vw", marginRight: "1vw"}}>
        Memtable
      </button>

      {/* Button for SSTable */}
      <button onClick={() => navigate("/components/sstable")} style={{ marginLeft: "1vw", marginRight: "1vw"}}>
        SSTable
      </button>

      {/* Button for Compaction */}
      <button onClick={() => navigate("/components/compaction")} style={{ marginLeft: "1vw", marginRight: "1vw"}}>
        Compaction
      </button>
      
      <br></br>
      <br></br>
        
      {/* Button for returning to root */}
      <button onClick={() => navigate("/")} style={{ marginLeft: "1vw", marginRight: "1vw"}}>
      &larr; Home
      </button>
    </>
  );
};

export default Components;