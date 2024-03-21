import React from 'react'

const Clerk_Complaint=()=>{
    
    return(

        <div className="Clerk_Complaint_Container">
          <form className='Clerk_Complaint_form'>
            <div className="location"><label >Location:</label>
                <input type="text"  />
            </div>
            <div className="Clerk_Complaint_box">
               <label >Complaint:</label>
               <textarea required></textarea>
            </div>
           </form>
          
          <div className='submitbutton'>Submit </div>
        </div>);
}

export default Clerk_Complaint