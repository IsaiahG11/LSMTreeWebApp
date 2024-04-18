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
      const response = await fetch('http://localhost:5000/upload', { //TODO should this be 3000 or 5000
        method: 'POST',
        body: formData,
      });

      console.error(response);

        if (response.ok) {
            const responseBody = await response.json();  // Now safe to parse JSON
            alert("File uploaded successfully!");
            console.log(responseBody.message);
        } else {
            console.error(`Upload failed with status: ${response.status} File already exists!`);
            alert(`Failed to upload file. That file name already exists!`);
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
            <h2>Transaction Log: {uploadedFileName || ""}</h2>
            <hr/>
            {/* Placeholder for additional details about the transaction log */}
          </div>
            <div style={{flex: 1, marginLeft: "10px", padding: "10px", border: "1px solid gray", minHeight: "150px"}}>
                <h2>Simulation:</h2>
                <hr/>
                {/* Placeholder for Simulation Visuals */}
            </div>
        </div>
          <button onClick={() => navigate("/")}>Home</button>
      </>
  );
};

export default Simulation;
