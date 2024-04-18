import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Simulation = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(""); // State to store the uploaded file name

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("transactionLog", file);
    setUploadedFileName(file.name); // Set the file name when the file is selected for upload

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      const responseBody = await response.json();
      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        console.error(`Upload failed with status: ${response.status}`);
        alert(`Failed to upload file. Server responded with status ${response.status}: ${responseBody.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };


  return (
      <>
        <h1>Custom LSM Tree Simulator:</h1>
        <p>Please select the "Browse..." button below to search for your transaction log JSON file. Then press the
          "Upload Transaction Log" button to see your transaction log appear below </p>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <input type="file" accept=".json" onChange={e => setFile(e.target.files[0])}/>
          <button onClick={handleFileUpload}>Upload Transaction Log</button>
        </div>
        <br></br>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
          <div style={{flex: 1, marginRight: "10px", padding: "10px", border: "1px solid gray", minHeight: "150px"}}>
            <h2>Transaction Log: {uploadedFileName || "No file uploaded"}</h2>
            <hr/>
            {/* Placeholder for additional details about the transaction log */}
          </div>
          <div style={{flex: 1, marginLeft: "10px", padding: "10px", border: "1px solid gray", minHeight: "150px"}}>
            {/* Placeholder for additional UI components or information */}
          </div>
        </div>
        <button onClick={() => navigate("/")}>Home</button>
      </>
  );
};

export default Simulation;
