import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Edit_User = () => {
    const location = useLocation();
    const history = useHistory();
    const user = location.state && location.state.user;
    const [password, setPassword] = useState(user.password);
    const [name, setName] = useState(user.name);
    const [phoneno, setPhoneno] = useState(user.phoneno);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/edit_profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ UserID: user.UserID, password: password,name:name,phoneno:phoneno})
            });  
            const data = await response.json();   
            if (response.ok) {
                console.log(data);
            
                if(data.position === "clerk"){
                    history.push({
                        pathname: "/Clerk_Home",
                        state: { clerk: data }
                    });
                }
                else if(data.position === "supervisor"){
                    history.push({
                        pathname: "/Supervisor_Home",
                        state: { supervisor: data }
                    });
                }
                else if(data.position === "mayor"){
                    history.push({
                        pathname: "/Mayor_Home",
                        state: { mayor: data }
                    });
                }
                else if(data.position === "administrator"){
                    history.push({
                        pathname: "/Administrator_Home",
                        state: { administrator: data }
                    });
                }
            } else {
                console.log(data.error); 
            }
        } catch (error) {
            console.error("Error:", error); 
        }
    };
    
    if(user.position==="administrator"){
        return(
            <div className="Signin">
            <h1>Edit your information here:</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="userid">
                    <label className="userid_label"> UserId:</label>
                    <input
                        type="text"
                        name="UserID"
                        id="UserID"
                        placeholder="UserID"
                        value={user.UserID}
                        disabled={true} 
                    />
                </div>
                <div className="password">
                    <label className="password_label">Password:</label>
                    <input
                        type="text" // Change type to "text" for visibility
                        name="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="submitbutton" type="submit"> Submit</button>
                </form>
        </div>
        );
    }
    else{
        return(
            <div className="Signin">
            <h1>Edit your information here:</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="userid">
                    <label className="userid_label"> UserId:</label>
                    <input
                        type="text"
                        name="UserID"
                        id="UserID"
                        placeholder="UserID"
                        value={user.UserID}
                        disabled={true} 
                    />
                </div>
                <div className="password">
                    <label className="password_label">Password:</label>
                    <input
                        type="text" // Change type to "text" for visibility
                        name="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="userid">
                <label className="userid_label"> Name:</label>
                    <input
                        type="text"
                        name="UserID"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                    />
                </div>
                <div className="userid">
                <label className="userid_label"> Phone No:</label>
                    <input
                        type="text"
                        name="phoneno"
                        placeholder="Phone no"
                        value={phoneno}
                        onChange={(e) => setPhoneno(e.target.value)}
                        
                    />
                </div>
                <button className="submitbutton" type="submit"> Submit</button>
            </form>
        </div>
        );
    }
};


export default Edit_User;