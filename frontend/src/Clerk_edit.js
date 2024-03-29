import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useHistory , Redirect} from "react-router-dom";

const Clerk_edit = (issigninclerk) => {
    const location = useLocation();
    const history = useHistory();
    const clerk = location.state && location.state.clerk;
    const [password, setPassword] = useState(clerk.password);
    const [name, setName] = useState(clerk.name);
    const [phoneno, setPhoneno] = useState(clerk.phoneno);
   
    if(!clerk.Issignin) {
        <Redirect to="/" />
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/edit_profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ UserID: clerk.UserID, password: password,name:name,phoneno:phoneno})
            });  
            const data = await response.json();   
            if (response.ok) {
                console.log(data);
                history.push({
                    pathname: "/Clerk_Home",
                    state: { clerk: data }
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
            <form className="form" onSubmit={handleSubmit}>
                <div className="userid">
                    <label className="userid_label"> UserId:</label>
                    <input
                        type="text"
                        name="UserID"
                        id="UserID"
                        placeholder="UserID"
                        value={clerk.UserID}
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
                        id="UserID"
                        placeholder="UserID"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                    />
                </div>
                <div className="userid">
                <label className="userid_label"> Phone No:</label>
                    <input
                        type="text"
                        name="UserID"
                        id="UserID"
                        placeholder="UserID"
                        value={phoneno}
                        onChange={(e) => setPhoneno(e.target.value)}
                        
                    />
                </div>


                <button className="submitbutton" type="submit"> Submit</button>
            </form>
        </div>
    );
};

export default Clerk_edit;
