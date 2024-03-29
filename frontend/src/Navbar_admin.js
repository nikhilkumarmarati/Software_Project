import React , {useContext} from 'react';
import {Link ,useLocation,useHistory} from 'react-router-dom';
import {LoginContext} from './Contexts/LoginContext';
const Navbar_admin = () => {
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
                <Link to={{ pathname: "/Administrator_Home", state: { user: user} }} className="link">Home</Link>
                <Link to={{ pathname: "/Edit_Administrator", state: { user: user} }} className='link'>Edit Profile</Link>
                <Link to={{ pathname: "/update_resources", state: { user : user} }}className="link">Update Resources</Link>
                <div className="link" onClick={handleLogout}>Log out</div>
            </div>
        </nav>
     );
}
 
export default Navbar_admin;