import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Clerk_Home = () => {
  const location = useLocation();
  const user = location.state ? location.state.user : null;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/allcomplaints?suburb=${user.suburb}&city=${user.city}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (complaintId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
          
        });
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:5000/deletecomplaint/${complaintId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to delete complaint');
          }
          setData(data.filter(complaint => complaint._id !== complaintId));
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      }
    });
    
  };
  
  return (
    <div className="background-image">
    <div className="page-container">
    <div className="Clerkhome">
      <nav className="somebar">
        <h2>Welcome {user.name}</h2>
        <div className="extralinks">
          <Link to={{ pathname: "/Clerk_Complaint", state: { user: user } }} className='submitbutton Add_complaint'>+Complaint</Link>
        </div>
      </nav>
        <div className="Complaints_form">
          <h1>All complaints</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            data.map((jsonData, index) => (
              <div key={index} className="Complaint_content">
                <div className="texts">
                  <div className="rowtexts">
                  <div className="text">
                      <div className="sidelabel">Problem :</div>
                      <div className="maintext"> {jsonData.Problem}</div>
                    </div>
                    {jsonData.status === "new" && (
                      
                      <button className="delete-button" onClick={() => handleDelete(jsonData._id)}>Delete</button>
                       
                    )}
                  </div>
                  <div className="rowtexts">
                    <div className="text">
                      <div className="sidelabel">Address :</div>
                      <div className="maintext"> {jsonData.Address}</div>
                    </div>
                    <div className="text">
                      <div className="sidelabel">Status :</div>
                      <div className="maintext">{jsonData.status}</div>
                    </div>
                    {/* Render delete button for each complaint */}
                    
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Clerk_Home;
