import React, { useState , useEffect} from "react";
import {Link} from 'react-router-dom';
import {  useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Administrator_Home=()=>{
  const location=useLocation();
  const user = location.state ? location.state.user : null;
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/allcomplaints?suburb=${"all"}&city=${"all"}&status=${"pending"}`);
        const jsonData = await response.json();
        
        const resources = await fetch(`http://localhost:5000/getresources?complaint_id=${jsonData._id}"`);
        const resourcesdata = await resources.json();
        const newData = {
          complaints: jsonData,
          resources: resourcesdata
        };
        setData(newData);
        console.log(newData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return(
    <div className="Clerkhome">
      <nav className="somebar">
            <h2>Welcome {user.name}</h2>
        </nav>
        <div className="Complaints_container">
      <div className="Complaints_form">
          <h1>Ongoing Works </h1>
          {data.complaints.map((jsonData,index) => (
          <div key={index} className="Complaint_content">
            <div className="texts">
              <div className="text"><div className="sidelabel">Problem :</div> <div className="maintext">{jsonData.Problem}</div></div>
              <div className="rowtexts">
              <div className="text"><div className="sidelabel">Address :</div><div className="maintext"> {jsonData.Address}</div></div>
              <div className="text"><div className="sidelabel">Status:</div><div className="maintext">{jsonData.status}</div></div>
              <div className="text"><div className="sidelabel">Workers:</div><div className="maintext">{data[index].resources.Workers}</div></div>
              </div>
            </div>
          </div>
        ))}
        </div>
    </div>
    </div>
      
    );
}

export  default Administrator_Home ;