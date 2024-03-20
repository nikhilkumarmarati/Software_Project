import React,{useState } from "react";
import { useHistory } from 'react-router-dom';

const Signin= () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const history=useHistory();
  const SubmitRecord = async(e) => {
    e.preventDefault();
    // console.log(username);
    // console.log(password);
    // history.push('/Clerkhome');


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