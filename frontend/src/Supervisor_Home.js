import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Supervisor_Home = () => {
  const location = useLocation(); 
  const user = location.state ? location.state.user : null;
  return (
    <div className="Supervisor_Home">
      <h1>welcome {user.UserID}</h1>
    </div>
  );
};

export default Supervisor_Home;


