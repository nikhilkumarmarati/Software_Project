import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';

const Clerkhome=()=>{
    const [complaint,setComplaint]=useState(false);
    const addcomplaint=()=>{
       setComplaint(true);
    }
    return(
      <div className="Clerkhome">
        <h1>welcome clerk</h1>
        {!complaint &&(
          <button className='submitbutton' onClick={addcomplaint} > <span style={{ fontSize: '20px' }}>+</span>Complaint</button>
        )}
            
        {complaint &&(
            <div className="fromcomplaint">
            <label >Complaint:</label>
            <form >
                <div className="textarea">
                <textarea cols="30" rows="10" required></textarea>
                </div>
               <div className="location"><label >Location:</label>
              <input type="text"  />
              </div>
          </form>
            
          <button className='submitbutton'>Submit </button>

            </div>
          
        )}
        
      </div>
      
    );
}

export  default Clerkhome ;