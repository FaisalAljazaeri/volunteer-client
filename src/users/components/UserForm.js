import React, { Component } from "react";


export default class UserForm extends Component {
  constructor(props) {
    super(props);
    //create state for empty name and password
    this.state = {
      name: "",
      password: ""
    };
  }
  //create method to take the input from users
  OnchangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  //create method for submit button 
  OnsubmitHandler = e => {
    e.preventDefault();
    // create varible to take the user
    const user = {name: this.state.name, password: this.state.password};
    this.setState({
      name: "",
      password: ""
    }) 
    //props the method Userlog from User 
    if ( this.props.UserLog){
    this.props.UserLog(user);}
    else if (this.props.addnewUser){
    this.props.addnewUser(user);}
  };
  render() {
    return (
        //create form (lable & input & button)
      <div>
        <form onSubmit={this.OnsubmitHandler}>
          <label className="label-user">User Name :</label>
          <br/>
          <input
            name="name"
            placeholder="please write your name "
            value={this.state.name}
            onChange={this.OnchangeHandler}
          />
          <br/>

          <label className="label-user">Password :</label>
          <br/>
          <input 
            name="password"
            type="password"
            placeholder="please write your password "
            value={this.state.password}
            onChange={this.OnchangeHandler}
          />
          <br/>
          <button type="submit">Submit</button>
        </form>
        <br/>
      </div>
    );
  }
}