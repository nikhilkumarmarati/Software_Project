import {Link} from 'react-router-dom';

const Navbar_Sp = () => {
    return ( 
        <nav className="navbar">
            <h1>Public Works Department</h1>
            <div className="links">
                <Link to="/Supervisor" className="link">Home</Link>
                <Link to="/Complaints" className="link">New Complaints</Link>
                <Link to="/Work_schedule" className="link">Work Schedule</Link>
                <Link to="/Completed_works" className="link">Completed Works</Link>
                <Link to="/Logout" className="link">Log out</Link>
            </div>
        </nav>
     );
}
 
export default Navbar_Sp;