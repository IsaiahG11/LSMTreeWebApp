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
      const response = await fetch('/api/upload', { // Ensure this endpoint matches your backend
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <>
        <h1>This is the Simulation page</h1>
        <div>
          <p>This is a text message.</p>
          {/* File input for uploading JSON */}
          <input type="file" onChange={e => setFile(e.target.files[0])} />
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
