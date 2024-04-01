import React, { useState , useEffect} from "react";
import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


const Complaints = () => {
  const location=useLocation();
  const user = location.state ? location.state.user : null;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/allcomplaints?suburb=${user.suburb}&city=${user.city}&status=${"new"}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="Complaints_container">
      <div className="Complaints_form">
          <h1>New complaints </h1>
          {data.map((jsonData,index) => (
          <div key={index} className="Complaint_content">
            {/* Render your blog content here */}
            <div className="text">
              <p>Address: {jsonData.Address}</p>
              
              <p>Problem: {jsonData.Problem}</p>
            </div>
            
            <Link to ={{ pathname: "/Data_form", state: { complaint: jsonData,user:user} }} className="Add_data" >
              <p>Add Data</p>
            </Link>
          </div>
        ))}
        </div>
    </div>
  );
};

export default Complaints;

