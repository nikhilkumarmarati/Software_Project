// import React, { useState , useEffect} from "react";
// import { Link } from 'react-router-dom';
// import { useLocation,Redirect } from "react-router-dom/cjs/react-router-dom.min";

// const Clerk_Home = () => {
//   const location = useLocation();
//   const user = location.state ? location.state.user : null;
//   const [data, setData] = useState([]);

//   const UserDeleteButton = ({ userId }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);

//     const handleDelete = () => {
//       setIsLoading(true);
//       setError(null);
//       setSuccessMessage(null);

//       fetch(`http://localhost:5000/deletecomplaint/${userId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then(response => {
//           setIsLoading(false);
//           if (!response.ok) {
//             throw new Error('An error occurred while deleting the user.');
//           }
//           setSuccessMessage('User deleted successfully!');
          
//         window.location.reload();
//           // You can also update your component state or perform any other action as needed
//         })
//         .catch(error => {
//           setIsLoading(false);
//           setError(error.message);
//         });
//     };

//     return (
//       <div>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//         {successMessage && <p>{successMessage}</p>}
//         <button onClick={handleDelete} disabled={isLoading}>
//           Delete User
//         </button>
//       </div>
//     );
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/allcomplaints?suburb=${user.suburb}&city=${user.city}`);
//         const jsonData = await response.json();
//         setData(jsonData);
//         console.log(jsonData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="Clerkhome">
//       <nav className="somebar">
//         <h2>Welcome {user.name}</h2>
//         <div className="extralinks">
//           <Link to={{ pathname: "/Clerk_Complaint", state: { user: user} }} className='submitbutton Add_complaint'>+Complaint</Link>
//         </div>
//       </nav>
//       <div className="Complaints_container">
//         <div className="Complaints_form">
//           <h1>All complaints </h1>
//           {data.map((jsonData, index) => (
//             <div key={index} className="Complaint_content">
//               <div className="texts">
//                 <div className="text">
//                   <div className="sidelabel">Problem :</div>
//                   <div className="maintext">{jsonData.Problem}</div>
//                 </div>
//                 <div className="rowtexts">
//                   <div className="text">
//                     <div className="sidelabel">Address :</div>
//                     <div className="maintext"> {jsonData.Address}</div>
//                   </div>
//                   <div className="text">
//                     <div className="sidelabel">Status :</div>
//                     <div className="maintext">{jsonData.status}</div>
//                   </div>
//                   {/* Render delete button for each complaint */}
//                   {jsonData.status ==="new"&&(<UserDeleteButton userId={jsonData._id} />)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Clerk_Home;
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

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
      // Filter out the deleted complaint from the data
      setData(data.filter(complaint => complaint._id !== complaintId));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="Clerkhome">
      <nav className="somebar">
        <h2>Welcome {user.name}</h2>
        <div className="extralinks">
          <Link to={{ pathname: "/Clerk_Complaint", state: { user: user } }} className='submitbutton Add_complaint'>+Complaint</Link>
        </div>
      </nav>
      <div className="Complaints_container">
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
  );
}

export default Clerk_Home;
