import React from "react";
import { useNavigate } from "react-router-dom";

const TransLogs = () => {
  const navigate = useNavigate();

  return (
    <>
        <h1>This is the Transaction Logs page</h1>
        <div>
          <p>This text is text.</p>
        </div>
    </>
  );
};

export default TransLogs;
