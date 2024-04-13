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

  const notifyA = () => toast.error("Signin Failed")
  const notifyB = () => {
    return new Promise((resolve, reject) => {
      console.log("Ohhh");
      toast.success("SigningIn Successfully");
      try {
        setTimeout(() => {
          console.log("YEss");
          resolve(); // Resolve the promise after the timeout
        }, 5000);
      } catch (error) {
        console.error("Error displaying toast:", error);
        reject(error); // Reject the promise if there was an error
      }
    });
  };  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make your fetch request here instead of Axios
      const response = await fetch('http://localhost:5000/sign__in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ UserID: username, password: passw })
      });
      const data = await response.json();
  
      if (data.error) {
        notifyA(data.error);
        setError(data.error);
      } else {
        await notifyB(); // Wait for the toast to show
  
        console.log("khhh");
  
        setIssignin(true);
        localStorage.setItem('issignin', true);
  
        if (data.savedUser.position === "clerk") {
          history.push({
            pathname: "/Clerk_Home",
            state: { user: data.savedUser }
          });
        } else if (data.savedUser.position === "supervisor") {
          history.push({
            pathname: "/Supervisor",
            state: { user: data.savedUser }
          });
        } else if (data.savedUser.position === "administrator") {
          history.push({
            pathname: "/Administrator_Home",
            state: { user: data.savedUser }
          });
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("An unexpected error occurred. Please try again later.");
      notifyA("An unexpected error occurred. Please try again later.");
    }
  };
  
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
        <ToastContainer />
      </div>
    );
};

export default  Signin;


