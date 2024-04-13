import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Work_schedule = () => {
  const location = useLocation();
  const user = location.state ? location.state.user : null;
  const [data, setData] = useState([]);
  const [flag,setFlag]=useState(false);
  const [complaint, setComplaint] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/allcomplaints?suburb=${user.suburb}&city=${user.city}&status=${"ongoing"}`);
            const jsonData = await response.json();
            setComplaint(jsonData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, [flag]);
  useEffect(() => {
    console.log(user.suburb,user.city);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/workschedule?suburb=${user.suburb}&city=${user.city}&status=ongoing`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handle_completed = async (index) => {
    // setFlag(!flag)
    const needed_resources = complaint[index];
    try {
      console.log(needed_resources._id);
      const response = await fetch(`http://localhost:5000/workschedulecomplete?id=${needed_resources._id}`);
      setFlag(prevFlag => !prevFlag);

    } catch (error) {
      console.error("Error completing work:", error);
    }
  };
  

  return (
    <div className="background-image">
    <div className="page-container">
    <div className="Complaints_container">
      <div className="Complaints_form">
        <h1>Work_schedule </h1>
        {complaint.map((jsonData, index) => (
          <div key={index} className="Complaint_content">
            <div className="rowtexts">
            <div className="text"><div className="sidelabel">Problem :</div> <div className="maintext">{jsonData.Problem}</div></div>
              <button  className="completedbutton" onClick={() => handle_completed(index)}>Work Completed</button>
            
            </div>
              <div className="rowtexts">
              <div className="text"><div className="sidelabel">Address :</div><div className="maintext"> {jsonData.Address}</div></div>
              <div className="text"><div className="sidelabel">Status :</div><div className="maintext">{jsonData.status}</div></div>
              </div>
                
    
          </div>
        ))}
      </div>
      </div>
    </div>
    </div>
  );
};

export default Work_schedule;


