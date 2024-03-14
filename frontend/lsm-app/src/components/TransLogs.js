import React from "react";
import { useNavigate } from "react-router-dom";

const TransLogs = () => {
  const navigate = useNavigate();

  return (
    <>
        <h1>Understanding Transaction Logs</h1>

        <h2>What are Transaction Logs?</h2>
        <p>Transaction logs are sequential records of operations performed on a database or data storage system. These logs capture various types of operations, such as insertions, searches, and deletions, providing a history of changes made to the data.</p>

        <h2>Operations in Transaction Logs</h2>
        <ul>
            <li><strong>Insert:</strong> Insert or update a key in the database. This operation adds new data or modifies existing data.</li>
            <li><strong>Search:</strong> Search for a key within the database. This operation retrieves data associated with a specific key.</li>
            <li><strong>Delete:</strong> Remove a key from the database. This operation deletes data associated with a specific key.</li>
        </ul>

        <h2>Usage</h2>
        <p>Transaction logs play a crucial role in data management and recovery. They enable features such as rollback, point-in-time recovery, and replication, ensuring data integrity and reliability in database systems.</p>

        <h2>Conclusion</h2>
        <p>Transaction logs provide a detailed record of operations performed on a database, including insertions, searches, and deletions. By maintaining a comprehensive history of changes, transaction logs enable data recovery, replication, and integrity verification in database systems.</p>
  
        <div>
          <p>Here is an example of how our transaction logs are structured and stored:</p>
          <img src={`${process.env.PUBLIC_URL}/transaction-log-template.png`} alt="Template for Transaction"/>
        </div>

        <br>
        </br>

        {/* Button for returning to root */}
        <button onClick={() => navigate("/")}>
        &larr; Home
        </button>
    </>
  );
};

export default TransLogs;
