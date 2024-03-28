import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Work_schedule = () => {
  const location = useLocation();
  const user = location.state ? location.state.user : null;
  const [data, setData] = useState([]);
  const [flag,setFlag]=useState(false);
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
  }, [flag]);
  const handle_completed = async (index) => {
    setFlag(!flag)
    const needed_resources = data[index];
    try {
      console.log(needed_resources._id);
      const response = await fetch(`http://localhost:5000/workschedulecomplete?id=${needed_resources._id}`);
    } catch (error) {
      console.error("Error completing work:", error);
    }
  };
  

  return (
    <div className="Complaints_container">
      <div className="Complaints_form">
        <h1>Work_schedule </h1>
        {data.map((jsonData, index) => (
          <div key={index} className="Complaint_content">
            <div className="text">
              <p>city: {jsonData.city}</p>
              <p>suburb: {jsonData.suburb}</p>
              <p>priority:{jsonData.priority}</p>
              <div className="button">
                <button onClick={() => handle_completed(index)}>work completed</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work_schedule;


