import React, { useState} from 'react';
import { useHistory ,useLocation,Redirect} from 
'react-router-dom';

const Clerk_Complaint=()=>{
  const loc=useLocation();
  const [location,setLocation]=useState('');
  const [complaint, setComplaint] = useState('');
  const history=useHistory();
  const user = loc.state && loc.state.user;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/complaint_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Address: location,
          Problem: complaint,
          suburb:user.suburb,
          city:user.city,
          status:"new"
        })
      });
    
      
      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }
      const responseData = await response.json();
      console.log(responseData);

    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
    history.push({
      pathname: "/Clerk_Home",
      state: { user: user}
    });
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