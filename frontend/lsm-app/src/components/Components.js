import React from "react";
import { useNavigate } from "react-router-dom";

const Components = () => {
  const navigate = useNavigate();

  return (
    <>
        <h1>
          This is the Components page
        </h1>
        <div>
          <p>This is a text.</p>
        </div>
    </>
  );
};

export default Components;