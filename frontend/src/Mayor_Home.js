import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Mayor_Home = () => {
  const location = useLocation(); 
  const user = location.state ? location.state.user : null;
  return (
    <div className="blog-list">
      <h1>welcome {user.UserID}</h1>
    </div>
  );
};

export default Mayor_Home;


