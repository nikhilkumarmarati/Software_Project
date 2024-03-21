import React,{useState } from "react";
import { useHistory } from 'react-router-dom';

const Signin= () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history=useHistory();
  const SubmitRecord = async(e) => {
    e.preventDefault();
    fetch('http://localhost:5001/addClerk',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username:username,
          password:password
        })
      }).then(res=>res.json())
      .then(data=>{console.log(data)})
    history.push('/Clerk_Home');


};
    return (
        
      <div className="Signin">
        <h1 >Enter password and userid</h1>
        <form className="form" onSubmit={SubmitRecord}>
            <div className="userid">
            <label className="userid_label"> UserId:</label>
          <input type="text" required value={username} onChange={(e)=> setUsername(e.target.value)} />
            </div>
          <div className="password">
         <label className="password_label">Password:</label>
         <input type="text" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
         </div>
           <button className="submitbutton" > Submit</button>
        </form>
      </div>
    );
};

export default Signin;