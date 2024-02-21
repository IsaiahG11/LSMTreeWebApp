import React from "react";
import { useNavigate } from "react-router-dom";

const TransLogs = () => {
  const navigate = useNavigate();

  return (
    <>
        <h1>This is the Transaction Logs page</h1>
  
        <div>
          <p>This text is text.</p>
          <img src={`${process.env.PUBLIC_URL}/transaction-log-template.png`} alt="Template for Transaction"/>
        </div>

        {/* Button for returning to root */}
        <button onClick={() => navigate("/")}>
          Main Menu
        </button>
    </>
  );
};

export default TransLogs;
