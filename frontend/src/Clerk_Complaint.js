import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';

const Clerk_Complaint=()=>{

  const [location, setLocation] = useState('');
  const [complaint, setComplaint] = useState('');
  const history=useHistory();
  const handleSubmit = async (e) => {
    console.log("Button clicked");
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/complaint_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Address: location,
          Problem: complaint
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }

      // Optionally, you can handle the response from the server
      const responseData = await response.json();
      console.log(responseData);
      
      // Optionally, you can perform additional actions after successful submission

    } catch (error) {
      console.error('Error submitting complaint:', error);
    }

      history.push('/Clerk_Home');
  };
    return(

        <div className="Clerk_Complaint_Container">
          <form className='Clerk_Complaint_form' onSubmit={handleSubmit}>
            <div className="location"><label >Location:</label>
                <input type="text"  
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="Clerk_Complaint_box">
               <label >Complaint:</label>
               <textarea
                  required
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  ></textarea>
            </div>
          <button className='submitbutton' type ='submit'>Submit </button>
           </form>
          
        </div>);
}

export default Clerk_Complaint