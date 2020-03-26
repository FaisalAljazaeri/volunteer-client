// import all the requir Component for using
import React, { Component } from "react";
import Posts from "../../posts/component/posts";
import UserForm from "./UserForm";
import { getAllUsers, deleteUserById, loginUser, logoutUser } from "../api";

export default class User extends Component {
  constructor(props) {
    super(props);
    //create state for empty input by false and create an arry for users
    this.state = {
      UserLog: false,
      userLogged: "",
      users: [],
      registeredPosts: [],
      unregisteredPosts: [],
      showRegisteredPosts: false,
      userToken: localStorage.getItem("userToken")
    };
  }
  //get all users from API
  componentDidMount() {
    getAllUsers()
      .then(response => {
        this.setState({
          //fetch the data from the arry in response
          users: response.data.users
        });
        console.log("result", response.data.users);
      })
      //if there  any error
      .catch(err => console.log(err));
  }

  logout = () => {
    // logout user
      this.setState({
          UserLog: false,
          userLogged: "",
          registeredPosts: [],
          unregisteredPosts: [],
          userToken: ""
      });

      // Clear the JWT fron Local Storage
      localStorage.removeItem("userToken");
  }

  checkPostRegisteration = (post, userId) => {
    return post.users.find(
      user => user._id === userId
    );
  };

  toggleShowPosts = e => {
    this.setState({
      showRegisteredPosts: !this.state.showRegisteredPosts
    });
  };

  // Get the name of the user by the ID
  getUsername = userId => {
    return this.state.users.find(user => user._id === userId);
  };

  // Method to register a User to a Post and add it to the list of their registered
  // and removing it from the list of unregistered posts
  joinPost = postId => {
    // Remove the post by id from the unregistered posts
    const unregisteredPosts = this.state.unregisteredPosts.filter(
      post => post._id !== postId
    );

    // Get the new post that the user registered for
    const post = this.state.unregisteredPosts.find(post => post._id === postId);

    // Get the current user's name and push it to the list of users
    // registered for the selected Post
    const user = this.getUsername(this.state.userLogged);
    post.users.push(user);

    // After adding the new user to the post, push the post to the list
    // of the registered user posts
    const registeredPosts = [...this.state.registeredPosts, post];

    // Set the changes in both registered and unregistered user posts
    this.setState({
      registeredPosts,
      unregisteredPosts
    });
  };

  // Method unregister to remove the post from the list of user registered
  leavePost = postId => {
    // Remove the post by id from the registered posts
    const registeredPosts = this.state.registeredPosts.filter(
      post => post._id !== postId
    );

    // Get the remove post that the user selected
    const post = this.state.registeredPosts.find(post => post._id === postId);

    // Get the current user's name and push it to the list of users unregistered for the selected Post
    const user = this.getUsername(this.state.userLogged);
    post.users.push(user);

    // After remove the user from the post, remove the post from the list registered posts
    const unregisteredPosts = [...this.state.unregisteredPosts, post];

    // Set the changes in both registered and unregistered user posts
    this.setState({
      unregisteredPosts,
      registeredPosts
    });
  };

  // Make Login Request for the user and check if they are authenticated
  authenticateUser = async user => {
    try {
      const res = await loginUser(user);

      // Store the Recieved JWT in Local Storage
      localStorage.setItem("userToken", res.data.token);

      this.setState({
        UserLog: true,
        userLogged: res.data.user.id,
        userName: res.data.user.name,
        userToken: localStorage.getItem("userToken")
      });

      return true
    }
    catch (err) {
       console.log(err);
    }
  }

  //create method login
  UserLog = async user => {
    // Try Login Request for the submitted User data
    const loginSucess = await this.authenticateUser(user);

    //check if the login is successfull
    if (loginSucess) {
      const registeredPosts = [];
      const unregisteredPosts = [];

      this.props.posts.forEach(post => {
        if (this.checkPostRegisteration(post, this.state.userLogged)) {
          registeredPosts.push(post);
        } else {
          unregisteredPosts.push(post);
        }
      });

      //create setStete if found return true
      this.setState({
        registeredPosts,
        unregisteredPosts
      });
    } else {
      //if the user is not authenticated return nothing
      this.setState({
        UserLog: false
      });
    }
  };

  // Create Delete Function for user
  deleteUser = () => {
    deleteUserById(this.state.userLogged, this.state.userToken)
      .then(response => {
        // Create Varible for control to Array for User
        // & Create ForLoop to check all index
        // if user ID = userlog & delete one index
        const posts = [...this.state.registeredPosts];
        posts.forEach(post => {
          const index = post.users.findIndex(
            userId => this.state.userLogged === userId
          );
          post.users.splice(index, 1);
        });

        this.setState({
          UserLog: false,
          userLogged: "",
          userToken: "",
          registeredPosts: [],
          unregisteredPosts: []
        });

        // Remove JWT from Local Storage
        localStorage.removeItem("userToken");
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  };

  render() {
    const SelectedPosts = this.state.showRegisteredPosts ? (
      <>
        {/* Registred Posts: */}
        <Posts
          posts={this.state.registeredPosts}
          setPosts={this.props.setPosts}
          userId={this.state.userLogged}
          leavePost={this.leavePost}
        />
      </>
    ) : (
      <>
        {/* Unregistered Posts: */}
        <Posts
          posts={this.state.unregisteredPosts}
          setPosts={this.props.setPosts}
          userId={this.state.userLogged}
          joinPost={this.joinPost}
        />
      </>
    );

    const btnText = this.state.showRegisteredPosts
      ? "Show Unregistered Posts"
      : "Show Registered Posts";

    return (
      //send the method UserLog to userform and display the post
      <div>
      {this.state.UserLog ? (
          <>
              <button onClick={this.deleteUser}>Delete User</button>
              <button onClick={this.logout}>Logout</button>
          </>
      ) : (
          <UserForm UserLog={this.UserLog} />
      )}

        <button onClick={this.toggleShowPosts}>{btnText}</button>
        {SelectedPosts}
      </div>
    );
  }
}
