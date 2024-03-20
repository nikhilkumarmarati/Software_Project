import React, { useState , useEffect} from "react";
import {Link} from 'react-router-dom';


const Complaints = () => {

  const [data, setData] = useState([]);

  // const Add_data = () => {
  //   setIsAddData(true);
  //   console.log("Button Clicked");
  // }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
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
          <h1>All complaints</h1>
          {data.map((blog) => (
          <div key={blog.id} className="Complaint_content">
            {/* Render your blog content here */}
            <div className="text">
              <p>{blog.Complaint}</p>
            </div>
            
            <Link to = "/Data_form" className="Add_data" >
              <p>Add Data</p>
            </Link>
          </div>
        ))}
        </div>
    </div>
  );
};

export default Complaints;

