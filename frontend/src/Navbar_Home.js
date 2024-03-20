import React,{useState,useEffect} from 'react';
import {Link,useLocation} from 'react-router-dom';
const Navbar = () => {
  // const [isatclerk,setIsatclerk]=useState(false);
  // const location=useLocation();
  // useEffect(() => {
  //   if (location.pathname === '/Clerkhome') {
  //     setIsatclerk(true);
  //   } else {
  //     setIsatclerk(false);
  //   }
  // }, [location.pathname]);
    return(

        <nav className='Navbar_Home'>
          <h1>Public Works Department</h1>
          <div className="links">
          <Link to="/" className="link">Home</Link>
          <Link to="/Signin" className="link">Sign In</Link>

          {/* {!isatclerk&&(<Link to="/Signin" style={{ 
              color: 'white', 
              backgroundColor: '#f1356d',
              borderRadius: '8px' 
            }}>Sign in</Link>)}
            {isatclerk &&(<Link to="/" style={{ 
              color: 'white', 
              backgroundColor: '#f1356d',
              borderRadius: '8px' 
            }}>Sign out</Link>)

            } */}
          </div>
        </nav>
    );
};

export default Navbar;