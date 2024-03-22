import React,{useState } from "react";
import { useHistory } from 'react-router-dom';

const Signin= () =>{
  const [username, setUsername] = useState('');
  const [passw, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
//   const SubmitRecord = async(e) => {
//     e.preventDefault();
//     // console.log(username);
//     // console.log(password);
//     history.push('/Clerk_Home');
// };
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
        // notifyA(data.error)
        console.log(error)
      } else {
        // notifyB("Signed In Successfully")
        console.log(data)
        // localStorage.setItem("jwt", data.token)
        // localStorage.setItem("user", JSON.stringify(data.user))

        // setUserLogin(true)
        history.push("/Clerk_Home");
      }
      console.log(data)
    })
}
    return (
        
      <div className="Signin">
        <h1 >SIGN IN</h1>
        <div>{error && <p>{error}</p>}</div>
        <form className="form" onSubmit={handleSubmit}>
            <div className="userid">
            <label className="userid_label"> UserId:</label>
          <input type="text" name="UserID" id="UserID" placeholder="UserID" required value={username} onChange={(e)=> setUsername(e.target.value)} />
            </div>
          <div className="password">
         <label className="password_label">Password:</label>
         <input type="password"
              name="password"
              id="password"
              placeholder="Password"
              required value={passw}  onChange={(e)=> setPassword(e.target.value)}/>
         </div>
           <button className="submitbutton" type="submit"> Submit</button>
        </form>
      </div>
    );
};

export default Signin;

//   return (
//     <div>
//       <h2>Sign In</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>User ID:</label>
//           <input type="text" value={userID} onChange={(e) => setUserID(e.target.value)} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// };
