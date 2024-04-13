import React,{useState , useContext } from "react";
import { useHistory } from 'react-router-dom';
import {LoginContext} from './Contexts/LoginContext';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin= () =>{
  const [username, setUsername] = useState('');
  const [passw, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setIssignin } = useContext(LoginContext)
  const history = useHistory();

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

const handleSubmit = async (e) => {
  e.preventDefault();
  
    // Make your fetch request here instead of Axios
    fetch('http://localhost:5000/sign__in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UserID: username, password: passw })
    }).then(res => res.json())
    .then(data => {
      if (data.error) {
        notifyA(data.error)
        setError(data.error);
        console.log(error)
      } else {
        notifyB("Signed In Successfully")
        
        console.log(data)
        
        setIssignin(true);
        localStorage.setItem('issignin', true);
        if(data.savedUser.position === "clerk"){
          history.push({

            pathname: "/Clerk_Home",
            state: { user: data.savedUser }
          });        }
          else if(data.savedUser.position === "supervisor"){
            history.push({
              pathname: "/Supervisor",
              state: { user: data.savedUser }
            });        }
          else if(data.savedUser.position === "administrator"){
            history.push({
              pathname: "/Administrator_Home",
              state: { user: data.savedUser }
            });        }
            console.log(data);
      }
      
    })
}
    return (
        
      <div className="Signin">
        <form className="form" onSubmit={handleSubmit}>
          <h1 >SIGN IN</h1>
          {error && ( <div className="error_signin ">{error}</div>)}
          <div className="inputs">
            <div className="input">
              <img src="./person.png" alt=" "></img>
            <input type="text" name="UserID" id="UserID" placeholder="UserID" required
             value={username}  onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div className="input">
              <img src="./password.png" alt=" "></img>
            < input type="password"
              name="password"
              id="password"
              placeholder="Password"
              required value={passw}  onChange={(e)=> setPassword(e.target.value)}/>
              </div>
          </div>
           <button className="submitbutton" type="submit"> Submit</button>
        </form>
      </div>
    );
};

export default  Signin;


