import React, { Component } from "react";
import {useHistory} from "react-router-dom";
import {withRouter} from "react-router-dom";

class UniversityLogin extends Component{
  constructor(props){
    super(props)
    this.state={
      username:"",
      password:""
    }
  }

  handleUser(e){
    this.setState({username:e.target.value})
  }
  handlePassword(e){
    this.setState({password:e.target.value})
  }
  render() {
    const mystyle1={
      marginRight: "100px",
      marginTop:"10px"
    };
    const mystyle={
      color: "black",
            backgroundColor: "#6793A3",
            fontFamily: "Arial",
            fontSize: "25px",
            padding: "30px"
    };
    return (
      <div style={mystyle}>
      <form>
      <input style={mystyle1} type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleUser.bind(this)}></input>
      <input style={mystyle1} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword.bind(this)}></input>
      <button type="button" onClick={this.handleLogin.bind(this, window.history)}>Login</button>
      </form>
      </div>
    );
  }
  handleLogin(history){
    console.log("Username:" + this.state.username)
    console.log("Password:" + this.state.password)
    if(this.state.username == "university" && this.state.password == "password"){
      this.props.history.push("/university")
    }
    else(
      alert("Invalud Username or Password")
    )
  }
}

export default UniversityLogin;
