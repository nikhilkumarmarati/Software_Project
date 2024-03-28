import React, { useState} from 'react';
import { useHistory ,useLocation} from 'react-router-dom';

const Data_form = () => {
  const history=useHistory();
  const location=useLocation();
  const user = location.state ? location.state.user : null;
  const comp = location.state ? location.state.complaint : null;
    const [priority,setPriortiy] = useState(0);
    const [time,setTime] = useState(0);
    const [Workers,setWorkers] = useState(0);
    const [Civil_Engineers,setCivil_Engineers] = useState(0);
    const [Site_Supervisors,setSite_Supervisors] = useState(0);
    const [Asphalt_in_kg,setAsphalt_in_kg] = useState(0);
    const [Concrete_in_kg,setConcrete_in_kg] = useState(0);
    const [Gravel_in_kg,setGravel_in_kg] = useState(0);
    const [Road_Roller,setRoad_Roller] = useState(0);
    const [Excavators,setExcavators] = useState(0);
    const [Dump_Trucks,setDump_Trucks] = useState(0);
    
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(comp._id);
        try {
          const response = await fetch('http://localhost:5000/data_post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                complaint_id:comp._id,
                priority:priority,
                time:time,
                Workers:Workers,
                Civil_Engineers:Civil_Engineers,
                Site_Supervisors:Site_Supervisors,
                Asphalt_in_kg:Asphalt_in_kg,
                Concrete_in_kg:Concrete_in_kg,
                Gravel_in_kg:Gravel_in_kg,
                Road_Roller:Road_Roller,
                Excavators:Excavators,
                Dump_Trucks:Dump_Trucks
            })
          });
          
          if (!response.ok) {
            throw new Error('Failed to submit complaint');
          }
          const responseData = await response.json();
            history.push({
            pathname:"/Complaints",
            state: {user:user}
        });
        } catch (error) {
          console.error('Error submitting complaint:', error);
        }
      };
    return (
    <div className="Data_form_container">
            <form className="Data_form" onSubmit={handleSubmit}>
            <label>Number of Workers:</label>
            <input type="Number" name="Workers" value = {Workers} onChange={(e)=>setWorkers(e.target.value)} />
            <label>Number of Civil Engineers:</label>
            <input type="Number" name="Civil_Engineers" value = {Civil_Engineers} onChange={(e)=>setCivil_Engineers(e.target.value)} />
            <label>Number of Site Supervisors:</label>
            <input type="Number" name="Site_Supervisors" value = {Site_Supervisors} onChange={(e)=>setSite_Supervisors(e.target.value)} />
            <label>Asphalt in kg:</label>
            <input type="Number" name="Asphalt_in_kg" value = {Asphalt_in_kg} onChange={(e)=>setAsphalt_in_kg(e.target.value)} />
            <label>Concrete in kg:</label>
            <input type="Number" name="Concrete_in_kg" value = {Concrete_in_kg} onChange={(e)=>setConcrete_in_kg(e.target.value)} />
            <label>Gravel in kg:</label>
            <input type="Number" name="Gravel_in_kg" value = {Gravel_in_kg} onChange={(e)=>setGravel_in_kg(e.target.value)} />
            <label>No. of Road Rollers:</label>
            <input type="Number" name="Road_Roller" value = {Road_Roller} onChange={(e)=>setRoad_Roller(e.target.value)} />
            <label>No. of Excavators:</label>
            <input type="Number" name="Excavators" value = {Excavators} onChange={(e)=>setExcavators(e.target.value)} />
            <label>No. of Dump Trucks:</label>
            <input type="Number" name="Dump_Trucks" value = {Dump_Trucks} onChange={(e)=>setDump_Trucks(e.target.value)} />
            <label>Estimated Time:</label>
            <input type="Number" name="time" value = {time} onChange={(e)=>setTime(e.target.value)} />
            <label>Priority:</label>
            <input type="Number" name="priority" value = {priority} onChange={(e)=>setPriortiy(e.target.value)} />
            <button className='submitbutton' type ='submit'>Submit </button>
        </form>
            </div>
    );
    };


export default Data_form;

