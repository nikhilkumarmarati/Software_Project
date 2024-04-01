import React , {useContext} from 'react';
import {Link ,useLocation,useHistory} from 'react-router-dom';
import {LoginContext} from './Contexts/LoginContext';

const Navbar_Sp = () => {
    const location=useLocation();
    const history = useHistory();
    const user = location.state ? location.state.user : null;
    const { setIssignin } = useContext(LoginContext)

    const handleLogout = () => {
        setIssignin(false);
        localStorage.setItem('issignin', false);
        history.push('/Signin');
        console.log("Loggedout");
      };
    return ( 
        <nav className="Navbar">
            <h1>Public Works Department</h1>
            <div className="links">
                <Link to={{ pathname: "/Supervisor", state: { user: user} }} className="link">Home</Link>
                <Link to={{ pathname: "/Edit_Supervisor", state: { user: user} }} className='link'>Edit Profile</Link>
                <Link to={{ pathname: "/Complaints", state: { user: user} }}className="link">New Complaints</Link>
                <Link to={{pathname:"/Work_schedule",state: { user: user} }} className="link">Work Schedule</Link>
                <Link to={{pathname:"/Completed_works",state: { user: user} }} className="link">Completed Works</Link>
                <div className="link" onClick={handleLogout}>Log out</div>
            </div>
        </nav>
     );
}
 
export default Navbar_Sp;