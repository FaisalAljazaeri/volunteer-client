import React from "react";
// import React Route
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import apiURL from "./apiConfig";
import Organization from "./organizations/components/Organization";
import User from "./users/components/User";
import { createNewUser } from "./users/api";
import UserForm from "./users/components/UserForm";
import OrganizationForm from "./organizations/components/OrganizationForm";
import { addNewOrganization } from "./organizations/api";
class App extends React.Component {
  //Creat constructor
  //Definition of an empty array
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    console.log("API URL", apiURL);
  }
  ///Creat setPosts
  setPosts = posts => {
    this.setState({ posts: posts });
  };
//Creat Fountain  to add new User in database
  addnewUser = user => {
    createNewUser(user)
      .then(res => {
        console.log(res.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  };
  //Creat Fountain  to add new Organization in database
  addnewOrg = organization => {
    addNewOrganization(organization)
      .then(res => {
        console.log(res.data.organization);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        {/* //Link Route by Uses Router */}
        <Router>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/User">User</Link>
            <Link to="/Organization">Organization</Link>
          </nav>
          <img src="https://www.9healthfair.org/wp-content/uploads/2018/01/volunteer-1888823_640.png"/>
          {/* <h1> Web Site No Name Yet ..</h1> */}
          <div>
            <Route
              exact
              path="/"
              render={() => <UserForm addnewUser={this.addnewUser} />}
            />
            <Route
              exact
              path="/"
              render={() => <OrganizationForm addnewOrg={this.addnewOrg} />}
            />
            <Route
              path="/User"
              render={() => (
                <User posts={this.state.posts} setPosts={this.setPosts} />
              )}
            />
            <Route
              path="/Organization"
              render={() => (
                <Organization
                  posts={this.state.posts}
                  setPosts={this.setPosts}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;