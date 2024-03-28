import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const UpdateResorces = () => {
    const location = useLocation();
    const history = useHistory();

    const [, setData] = useState([]);
    const [Workers, setWorkers] = useState(0);
    const [Civil_Engineers, setCivil_Engineers] = useState(0);
    const [Site_Supervisors, setSite_Supervisors] = useState(0);
    const [Asphalt_in_kg, setAsphalt_in_kg] = useState(0);
    const [Concrete_in_kg, setConcrete_in_kg] = useState(0);
    const [Gravel_in_kg, setGravel_in_kg] = useState(0);
    const [Road_Roller, setRoad_Roller] = useState(0);
    const [Excavators, setExcavators] = useState(0);
    const [Dump_Trucks, setDump_Trucks] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/get_available_resources`);
                const jsonData = await response.json();
                setData(jsonData);
                setWorkers(jsonData.Workers);
                setCivil_Engineers(jsonData.Civil_Engineers);
                setSite_Supervisors(jsonData.Site_Supervisors);
                setAsphalt_in_kg(jsonData.Asphalt_in_kg);
                setConcrete_in_kg(jsonData.Concrete_in_kg);
                setGravel_in_kg(jsonData.Gravel_in_kg);
                setRoad_Roller(jsonData.Road_Roller);
                setExcavators(jsonData.Excavators);
                setDump_Trucks(jsonData.Dump_Trucks);
                console.log(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/update_resources', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Workers: Workers,
                    Civil_Engineers: Civil_Engineers,
                    Site_Supervisors: Site_Supervisors,
                    Asphalt_in_kg: Asphalt_in_kg,
                    Concrete_in_kg: Concrete_in_kg,
                    Gravel_in_kg: Gravel_in_kg,
                    Road_Roller: Road_Roller,
                    Excavators: Excavators,
                    Dump_Trucks: Dump_Trucks
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                history.push({
                    pathname: "/Administrator_Home",
                    state: { user: location.state && location.state.user }
                });
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="Signin">
            <h1>Edit your information here:</h1>
            <form className="Data_form" onSubmit={handleSubmit}>
                <label>Number of Workers:</label>
                <input type="number" name="Workers" value={Workers} onChange={(e) => setWorkers(e.target.value)} />
                <label>Number of Civil Engineers:</label>
                <input type="number" name="Civil_Engineers" value={Civil_Engineers} onChange={(e) => setCivil_Engineers(e.target.value)} />
                <label>Number of Site Supervisors:</label>
                <input type="number" name="Site_Supervisors" value={Site_Supervisors} onChange={(e) => setSite_Supervisors(e.target.value)} />
                <label>Asphalt in kg:</label>
                <input type="number" name="Asphalt_in_kg" value={Asphalt_in_kg} onChange={(e) => setAsphalt_in_kg(e.target.value)} />
                <label>Concrete in kg:</label>
                <input type="number" name="Concrete_in_kg" value={Concrete_in_kg} onChange={(e) => setConcrete_in_kg(e.target.value)} />
                <label>Gravel in kg:</label>
                <input type="number" name="Gravel_in_kg" value={Gravel_in_kg} onChange={(e) => setGravel_in_kg(e.target.value)} />
                <label>No. of Road Rollers:</label>
                <input type="number" name="Road_Roller" value={Road_Roller} onChange={(e) => setRoad_Roller(e.target.value)} />
                <label>No. of Excavators:</label>
                <input type="number" name="Excavators" value={Excavators} onChange={(e) => setExcavators(e.target.value)} />
                <label>No. of Dump Trucks:</label>
                <input type="number" name="Dump_Trucks" value={Dump_Trucks} onChange={(e) => setDump_Trucks(e.target.value)} />
                <button className='submitbutton' type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default UpdateResorces;
