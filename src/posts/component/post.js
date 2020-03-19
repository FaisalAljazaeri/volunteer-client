import React from "react";
import "./post.css";
import PostForm from "./PostForm";
//Creat class Post
class Post extends React.Component {
  constructor(props) {
    super(props);
    // To pass preprty editFormActive for button to be by defulte  false
    this.state = {
      editFormActive: false
    };
  }
  // Call parent method to delete post by ID
  deletePost = () => {
    this.props.deletePost(this.props.id);
  };
  //add method to update and write condition to switch either false or true
  updatePost = e => {
    this.setState({
      editFormActive: !this.state.editFormActive
    });
  };
  //edit method
  editPost = (id, post) => {
    this.props.editPost(id, post);
  };

  // Method to resgiter a User to a Post by ID
  joinPost = () => {
    this.props.joinPost(this.props.id);
  };

  // Method to unresgiter
  leavePost = () => {
    this.props.leavePost(this.props.id);
  };

  render() {
    // Delete button that appears if the organization that made the post
    // is logged in
    // add the method to Edit button
    const buttons = this.props.organizationLogged ? (
      <div>
        <button className="edit-button" onClick={this.updatePost}>Edit Post</button>
        <button onClick={this.deletePost}>Delete Post</button>
      </div>
    ) : (
      ""
    );


    // Button to display for a user and if they click they can join the post
    const joinPostButton = this.props.joinPost ? (
      <button onClick={this.joinPost}>Join</button>
    ) : (
      ""
    );

    // button to remove the post that has resgiter before
    const leavePostButton = this.props.leavePost ? (
      <button onClick={this.leavePost}>Leave</button>
    ) : (
      ""
    );


    //Definition allUsers To show all users through it
    const allUsers = this.props.users.map((user, index) => (
      <p key={index}>{user.name}</p>
    ));
    return (
      <div className="post" style={this.state.editFormActive ? {height : "800px"} : {}}>
        {/* Title & Photo & Description & Place & Organization.name*/}
        <h2>{this.props.title}</h2>
        <p className="icon">
          <img src={this.props.photo} alt={this.props.title} />
        </p>
        <p>
          <strong>Description: </strong>
          {this.props.description}
        </p>
        <p>
          <strong>Place: </strong>
          {this.props.place}
        </p>
        <p>{this.props.organization.name}</p>
        <strong>Users:</strong>
        {allUsers}
        {buttons}
        {joinPostButton} {leavePostButton}
        {this.state.editFormActive ? (
          //render the data as props to PostForm
          <PostForm
            title={this.props.title}
            photo={this.props.photo}
            description={this.props.description}
            place={this.props.place}
            id={this.props.id}
            editPost={this.editPost}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Post;