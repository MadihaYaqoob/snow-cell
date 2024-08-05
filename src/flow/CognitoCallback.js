import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CognitoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CognitoCallback: Tokens should be set by the backend");
    navigate("/"); // Redirect to the home page after setting tokens
  }, [navigate]);

  return <div>Loading...</div>;
};

export default CognitoCallback;
