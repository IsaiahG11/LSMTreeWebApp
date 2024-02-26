import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Simulation = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("transactionLog", file);
  
    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
  
      // Attempt to read the response body as text (or JSON if your server responds with JSON)
      const responseBody = await response.text();
  
      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        // Log the status for debugging purposes
        console.error(`Upload failed with status: ${response.status}`);
        
        // Display a more detailed error message from the server's response
        alert(`Failed to upload file. Server responded with status ${response.status}: ${responseBody}`);
      }
    } catch (error) {
      // Network error, request cancellation, or other request issues
      console.error("Error uploading file:", error);
  
      // Provide a more specific error message depending on the error type
      if (error.name === 'AbortError') {
        alert("File upload was aborted.");
      } else if (error.name === 'TypeError') {
        alert("There was a network error. Please check your internet connection.");
      } else {
        // A more generic error message for other cases
        alert(`Error uploading file: ${error.message}`);
      }
    }
  };
  

  return (
    <>
        <h1>This is the Simulation page</h1>
        <div>
          <p>This is a text message.</p>
          {/* File input for uploading JSON */}
          <input type="file" accept=".json" onChange={e => setFile(e.target.files[0])} />
          <button onClick={handleFileUpload}>Upload Transaction Log</button>
        </div>

        {/* Button for returning to root */}
        <button onClick={() => navigate("/")}>
          Main Menu
        </button>
    </>
  );
};

export default Simulation;
