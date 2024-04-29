import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Xarrow from "react-xarrows";
import { motion, AnimatePresence } from "framer-motion";
import SkipList from "./SkipList";

const Simulation = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(""); // State to store the uploaded file name
  const [transactionLogs, setTransactionLogs] = useState([]); // Store the transaction log data
  const [simulationIndex, setSimulationIndex] = useState(0);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("transactionLog", file);
    setUploadedFileName(file.name); // Set the file name when the file is selected for upload

    try {
      const response = await fetch("http://localhost:5000/upload", {
        //TODO should this be 3000 or 5000
        method: "POST",
        body: formData,
      });

      console.error(response);

      if (response.ok) {
        const responseBody = await response.json(); // Now safe to parse JSON
        console.log("This is the resbod: " + responseBody[1]);
        setTransactionLogs(responseBody.logs || []); // Assume logs are sent back in the response
        alert("File uploaded successfully!");
        console.log(responseBody.message);
      } else {
        console.error(
          `Upload failed with status: ${response.status} File already exists!`
        );
        alert(`Failed to upload file. Either the file name already exists or you need to reformat your transaction log!`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  function getValue(){
    let value = transactionLogs[simulationIndex];
    setSimulationIndex(lastState => lastState + 1);
    console.log(value);
    return value.data.value;
  }

  function popSSTable(){

    let nodes = SkipList.flushNodes();

    for(let i = 0; i < nodes.length; i++ ){
      console.log(nodes[i].value)
    }
  }

  return (
    <>
      <h1>Custom LSM Tree Simulator:</h1>
      <p>
        Please select the "Browse..." button below to search for your
        transaction log JSON file. Then press the "Upload Transaction Log"
        button to see your transaction log appear below{" "}
      </p>
      <br />
      <div>
        <input
          type="file"
          accept=".json"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleFileUpload}>Upload Transaction Log</button>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            flex: "1 1 25%",
            marginRight: "10px",
            padding: "10px",
            border: "1px solid gray",
            minHeight: "150px",
            fontSize: "1.0vw", // Responsive font size based on viewport width
          }}
        >
          <h2 style={{ fontSize: "2vw" }}>
            Transaction Log: {uploadedFileName || ""}
          </h2>
          <hr />
          <ul>
            {transactionLogs.map((log, index) => (
              <li key={index} style={{ fontSize: "1.5vw" }}>
                {log.operation.toUpperCase()}: key = {log.data.key}
                {log.data.value ? `, value = ${log.data.value}` : ""}
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            flex: "3 1 75%",
            marginLeft: "10px",
            padding: "10px",
            border: "1px solid gray",
            minHeight: "400px",
            fontSize: "1.2vw", // Larger font for larger box
          }}
        >
          <h2 style={{ fontSize: "2vw" }}>Simulation: *sorted by values*</h2>
          <hr />
          <SkipList getValue={getValue} />
        </div>
      </div>
      <button onClick={() => navigate("/")}>Home</button>
    </>
  );
};

export default Simulation;
