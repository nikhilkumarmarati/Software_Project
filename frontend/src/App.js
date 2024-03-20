import React, { useState , useEffect } from "react";
import Navbar_Home from './Navbar_Home'
import Home from './Home'
import Signin from "./Signin";
import Navbar_Clerk from "./Navbar_Clerk.js"
import Clerk_Home from './Clerk_Home'
import Clerk_Complaint from './Clerk_Complaint.js'
import Navbar_Sp from './Navbar_Sp';
import Supervisor from './Supervisor';
import { BrowserRouter as Router ,Route,Switch } from 'react-router-dom';
import Complaints from './Complaints';
import Data_form from './Data_form';
// import NotFound from './NotFound';

function App() {

  return (
    <Router>

    <div className="App">

      <Switch>
        <Route exact path="/" >
          <Navbar_Home />
          <Home />
        </Route>
        <Route path="/Signin" >
          <Navbar_Home />
          <Signin />
        </Route>
      </Switch>

      <Switch>
        <Route  path="/Clerk" >
          <Navbar_Clerk />
          <Clerk_Home />
        </Route>
        <Route path="/Clerk_Complaint" >
          <Navbar_Clerk />
          <Clerk_Complaint />
        </Route>
      </Switch>

        <Switch>
          <Route  path="/Supervisor">
            <Navbar_Sp />
            <Supervisor />
          </Route>
          <Route  path="/Complaints">
            <Navbar_Sp />
            <Complaints />
          </Route>
          <Route path="/Data_Form">
              <Navbar_Sp />
              <Data_form />
            </Route>
          {/* <Route  path="/Signin">
            <Signin />
          </Route>
          <Route path="*">
            <NotFound />
          </Route> */}
      </Switch>

    </div>
    </Router>
    
  );
}

export default App;
