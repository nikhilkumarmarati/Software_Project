import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Administrator_Home = () => {
  const location = useLocation();
  const user = location.state ? location.state.user : null;
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(true); 
  const [expandedItems, setExpandedItems] = useState({}); // State to manage collapse/expand

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("start")
        const response = await fetch(`http://localhost:5000/allresources?status=${"ongoing"}`);
        const jsonData = await response.json();
        console.log(jsonData)

        // Fetch additional data for each complaint
        const complaintDataPromises = jsonData.map(item => {
          return Promise.all([
            GetComplaintProblem(item.complaint_id),
            GetComplaintAddress(item.complaint_id)
          ]).then(([problem, address]) => {
            return { ...item, problem, address };
          });
        });

        Promise.all(complaintDataPromises)
          .then(complaints => {
            setData(complaints);
          })
          .catch(error => {
            console.error('Error fetching complaint data:', error);
          });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function GetComplaintProblem(complaint_id) {
    console.log(complaint_id)
    return fetch(`http://localhost:5000/getcomplaint?complaint_id=${complaint_id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          console.log(error)
          return null;
        } else {
          console.log(data)
          return data.Problem;
          
        }
      });
  }

  function GetComplaintAddress(complaint_id) {
    console.log(complaint_id)
    return fetch(`http://localhost:5000/getcomplaint?complaint_id=${complaint_id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          console.log(error)
          return null;
        } else {
          console.log(data)
          return data.Address;
        }
      });
  }
  const toggleItemExpansion = (index) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [index]: !prevState[index] // Toggle expansion state for the given index
    }));
  };

  return (
    <div className="Clerkhome">
      <nav className="somebar">
        <h2>Welcome {user.name}</h2>
      </nav>
      <div className="Complaints_container">
        <div className="Complaints_form">
          <h1>Ongoing Works </h1>
          {/* <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Collapse Details' : 'Expand Details'}
          </button> */}
          {data.map((item, index) => (
            <div key={index} className="Complaint_content">
              <div className="texts">
                {/* <div className="text">
                  <div className="sidelabel">Problem :</div>
                  <div className="maintext">{item.problem}</div>
                </div> */}
                <div className="rowtexts">
                  <div className="text">
                    <div className="sidelabel">Address :</div>
                    <div className="maintext"> {item.address}</div>
                  </div>
                  <div className="text">
                    <div className="sidelabel">Problem :</div>
                    <div className="maintext">{item.problem}</div>
                  </div>
                </div>
                <button className="expand-button" onClick={() => toggleItemExpansion(index)}>
                  {expandedItems[index] ? 'Collapse Details' : 'Expand Details'}
                </button>
                <div className="rowtexts" style={{ display: expandedItems[index] ? 'block' : 'none' }}>
                  
                <div className="text">
                  <div className="sidelabel">Time:</div>
                  <div className="maintext">{item.time}</div>
                </div>
                <div className="text">
                  <div className="sidelabel">Workers:</div>
                  <div className="maintext">{item.Workers}</div>
                </div>
                <div className="text">
                  <div className="sidelabel">Civil Engineers:</div>
                  <div className="maintext">{item.Civil_Engineers}</div>
                </div>
                <div className="text">
                  <div className="sidelabel">Site Supervisors:</div>
                  <div className="maintext">{item.Site_Supervisors}</div>
                </div>
                <div className="text">
                  <div className="sidelabel">Asphalt (kg):</div>
                  <div className="maintext">{item.Asphalt_in_kg}</div>
                </div>
                <div className="text">
                  <div className="sidelabel">Concrete (kg):</div>
                  <div className="maintext">{item.Concrete_in_kg}</div>
                </div>
                <div className="text">
                  <div className="sidelabel">Gravel (kg):</div>
                  <div className="maintext">{item.Gravel_in_kg}</div>
                </div>
                <div className="text">
                  <div className="sidelabel">Road Roller:</div>
                  <div className="maintext">{item.Road_Roller}</div>
                </div>
                <div className="text">
                  <div className="sidelabel">Excavators:</div>
                  <div className="maintext">{item.Excavators}</div>
                </div>
                <div className="text">
                  <div className="sidelabel">Dump Trucks:</div>
                  <div className="maintext">{item.Dump_Trucks}</div>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Administrator_Home;
