import React from "react";
import { useLocation } from "react-router-dom";

const Supervisor_Home = () => {
  const location = useLocation(); 
  const user = location.state ? location.state.user : null;
  return (
    <div className="Supervisor_Home">
      <div className="Supr_cont">
      <h1 style={{color:"black",fontSize:45}}>Welcome {user.name}</h1>
    </div>
    </div>
  );
};

export default Supervisor_Home;


