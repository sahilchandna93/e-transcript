import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import University from "./components/university";
import Student from "./components/student";
import UniversityLogin from "./components/universitylogin";
import StudentLogin from "./components/studentlogin";
import "./App.css"

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const mystyle={
      color:"black",
      backgroundColor: "#6793A3",
      fontFamily: "Arial",
      fontSize: "25px",
      padding: "30px"
    };
    const liststyle={
      marginBottom: "20px"
    };
    return (
      <div>
      <nav>
      <p style={mystyle}>To upload a transcript, <Link to={'/universitylogin'} className="nav-link">Login here</Link></p>
      <p style={mystyle}>If you are a student and want to view your transcript, <Link to={'/studentlogin'} className="nav-link">Click here to login</Link></p>
      </nav>
      <Switch>
        <Route path="/university" component={University}/>
        <Route path="/universitylogin" component={UniversityLogin}/>
        <Route path="/student" component={Student}/>
        <Route path="/studentlogin" component={StudentLogin}/>
        </Switch>
      </div>
    );
  }
}

export default App;
