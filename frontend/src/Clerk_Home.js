import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';

const Clerk_Home=()=>{
  
  return(
    <div className="Clerkhome">
        <h1>welcome clerk</h1>
        <Link to="/Clerk_Complaint" className='submitbutton Add_complaint'>
          +Complaint
        </Link>
    </div>
      
    );
}

export  default Clerk_Home ;