import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TransLogs = () => {
  const navigate = useNavigate();
  const [activeOperation, setActiveOperation] = useState(null);

  const toggleOperationDesc = (operation) => {
    setActiveOperation(activeOperation === operation ? null : operation);
  };

  const getDescription = () => {
    switch (activeOperation) {
      case 'insert':
        return <p><strong>Insert:</strong> Similar to the Create CRUD operation; Insert adds a key with a value to the database.<br></br>In this example, we have the key 1 with the value 1 being inserted first.</p>;
      case 'update':
        return <p><strong>Update:</strong> Update a key's value in the database. This operation modifies existing data.<br></br>In this example, we are updating key 1 with the value 8.</p>;
      case 'search':
        return <p><strong>Search:</strong> Similar to the Read CRUD operation; Search looks for a key within the database. This operation retrieves the data associated with the specified key.<br></br>In this example, we are searching for key 7.</p>;
      case 'delete':
        return <p><strong>Delete:</strong> Remove a key from the database. This operation deletes data associated with a specific key.<br></br>In this example, key 1 is being deleted.</p>;
      default:
        return null;
    }
  };

  // Common button style
  const buttonStyle = {
    position: 'absolute',
    width: '23px', 
    height: '23px',
    fontSize: '1.25vw',
    borderRadius: '50%',
    backgroundColor: 'green', 
    color: 'white',
    cursor: 'pointer', 
    textAlign: 'center'
  };

  return (
    <>
      <h1>Understanding Transaction Logs</h1>

        <h2>What are Transaction Logs?</h2>
        <p>Transaction logs are sequential records of operations performed on a database or data storage system. These logs capture various types of operations, such as insertions, searches, and deletions, providing a history of changes made to the data.</p>

        <h2>Usage</h2>
        <p>Transaction logs play a crucial role in data management and recovery. They enable features such as rollback, point-in-time recovery, and replication, ensuring data integrity and reliability in database systems.</p>

        <h2>Example</h2>
        <p>Here is an example of how our transaction logs are structured and stored. Our implementation of an LSM Tree will only allow for numerical data with the keys acting as indices and the values acting as the data held in any given index.</p> 
        <p>If you are familiar with the CRUD operations, then this transaction log should be easier to digest. We decided to use "Insert" and "Search" instead of "Create" and "Read" simply to show that operations can vary across implementations. </p>
        <p>Feel free to click on the buttons next to each operation to learn more about them:</p>        

      {/* Other elements */}
      <div style={{ position: 'relative', maxWidth: '800px' }}>
        <img src={`${process.env.PUBLIC_URL}/transaction-log-template.png`} alt="Template for Transaction" style={{ width: '40%', height: 'auto', maxWidth: '300px', maxHeight: '600px' }} />
        
        {/* Button for Insert */}
        <button onClick={() => toggleOperationDesc('insert')} style={{ ...buttonStyle, top: '6.5%', left: '34%' }}>
        </button>

        {/* Button for Update */}
        <button onClick={() => toggleOperationDesc('update')} style={{ ...buttonStyle, top: '31%', left: '34%' }}>
        </button>

        {/* Button for Search */}
        <button onClick={() => toggleOperationDesc('search')} style={{ ...buttonStyle, top: '55.5%', left: '34%' }}>
        </button>

        {/* Button for Delete */}
        <button onClick={() => toggleOperationDesc('delete')} style={{ ...buttonStyle, top: '76%', left: '34%' }}>
        </button>
      
        {/* Description */}
        {activeOperation && (
          <div style={{
            position: 'absolute',
            top: '5%',
            left: '43%',
            fontSize: '2vw',
            backgroundColor: 'green',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'left',
            zIndex: 1000 // Ensures the description is above other elements
          }}>
            {getDescription()}
          </div>
        )}
      </div>

      <h2>Conclusion</h2>
        <p>Transaction logs provide a detailed record of operations performed on a database, including insertions, searches, and deletions. By maintaining a comprehensive history of changes, transaction logs enable data recovery, replication, and integrity verification in database systems.</p>

        <br>
        </br>

        <p>If you want to learn more about how LSM trees work, continue on to the <a href="http://localhost:3000/components">components</a> page</p>
        <p>If you'd like to get started on <a href="http://localhost:3000/simulation">simulating</a> your own custom transaction log, please proceed to the simulation page</p>

        <br></br>

      {/* Conclusion and links */}
      <button onClick={() => navigate("/")}>
        &larr; Home
      </button>
    </>
  );
};

export default TransLogs;
