import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Edit_User = () => {
    const location = useLocation();
    const history = useHistory();
    const user = location.state && location.state.user;
    const [password, setPassword] = useState(user.password);
    const [currpassword, setCurrpassword] = useState('');
    const [name, setName] = useState(user.name);
    const [phoneno, setPhoneno] = useState(user.phoneno);
    const [error, setError] = useState(false);
    const [editpwd, setIseditpwd] = useState(false);
    const [verifypwd, setVerifypwd] = useState(false);

    const handlechangepwd = () => {
        if(!editpwd) setIseditpwd(true);
    };

    const handleverifypwd = () => {
        if(currpassword === user.password){
            setVerifypwd(true);
            if(error) setError(false);
        }
        else{
            setError(true);
        }
    };

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
                        pathname: "/Supervisor",
                        state: { supervisor: data }
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
    
    
        return(
        <div className="profile_container">
            <div className="profile">
            {/* <h1>Edit your information here:</h1> */}
                <div className="profilepic"></div>
            <form className="profileform" onSubmit={handleSubmit}>

            {error && ( <div className="error_signin profileerror">Invalid Password</div>)}

                <div className="userid">
                    <input
                        type="text"
                        name="UserID"
                        id="UserID"
                        value={user.UserID}
                        disabled={true} 
                        />
                    <div className="labelline">
                        UserId
                    </div>
                </div>

                {!editpwd && (<div className="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={password}
                        disabled={true}
                        />
                    <div className="labelline">
                        Password
                    </div>
                    <div className="editpasswordlogo" onClick={handlechangepwd}>
                        <img src = "./editpwd.png" alt ="edit" />
                    </div>
                </div>)}

                {editpwd && !verifypwd && (<div className="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        onChange={(e) => setCurrpassword(e.target.value)}
                    />
                    <div className="labelline">
                       CurrentPassword
                    </div>
                    <div className="submitbutton verifypwd" onClick={handleverifypwd}>
                        Next
                    </div>
                </div>)}

                {verifypwd && (<div className="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="labelline">
                       NewPassword
                    </div>
                </div>)}

                <div className="name">
                    <input
                        type="text"
                        name="UserID"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                    />
                    <div className="labelline">
                        Name
                    </div>
                </div>
                <div className="phonenum">
                    <input
                        type="text"
                        name="phoneno"
                        placeholder="Phone no"
                        value={phoneno}
                        onChange={(e) => setPhoneno(e.target.value)}
                        
                    />
                    <div className="labelline">
                        PhoneNumber
                    </div>
                </div>
                <button className="submitbutton" type="submit"> Update </button>
            </form>
        </div>
        </div>
        );
    
};


export default Edit_User;