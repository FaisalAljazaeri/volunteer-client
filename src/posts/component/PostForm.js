import React, { Component } from "react";
import { createPost, editPostById } from "./api";
export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      photo: "",
      description: "",
      place: ""
    };
  }
  componentDidMount() {
    // pass method in condition
    if (this.props.editPost) {
      //props data from post
      this.setState({
        title: this.props.title,
        photo: this.props.photo,
        description: this.props.description,
        place: this.props.place
      });
    }
  }
  // Set state with new value when an input field is changed
  chnageHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHanler = e => {
    // Prevent page reload when the form is submitted
    e.preventDefault();
    // Get the input values from the state
    const { title, description, photo, place } = this.state;
    // Make POST request to the API with a new post object
    //create if statment to switch btween add and edit
    // if for Add
    if (this.props.addPost) {
      // Get organization Id from props
      const organization = this.props.organizationId;
      // Create new Post object with the data from inputs
      const newPost = { title, description, photo, place, organization };
      createPost({ post: newPost })
        .then(res => {
          // Add new Post to the Organization state
          this.props.addPost(res.data.post);
        })
        .catch(err => console.log(err));
    }
    //else if for edit
    else if (this.props.editPost) {
      // Create updatedPost that take value from input
      const updatedPost = { title, description, photo, place };
      editPostById(this.props.id, updatedPost)
        .then(res => {
          this.props.editPost(this.props.id, updatedPost);
        })
        .catch(err => console.log(err));
    }
    // Return all the state values to their defaults
    this.setState({
      title: "",
      photo: "",
      description: "",
      place: ""
    });
  };
  render() {
    return (
      <div>
        <form className="form-org" onSubmit={this.submitHanler}>
          <div div className="title">
            <label>Title: </label>
            <input
              name="title"
              value={this.state.title}
              onChange={this.chnageHandler}
              placeholder="Add Title"
            />
          </div>
          <div className="Des">
            <label>Descrip: </label>
            <input
              name="description"
              value={this.state.description}
              onChange={this.chnageHandler}
              placeholder="Add Description"
            />
          </div>
          <div>
            <label>Place: </label>
            <input
              name="place"
              value={this.state.place}
              onChange={this.chnageHandler}
              placeholder="Add Place"
            />
          </div>
          <div>
            <label>Photo: </label>
            <input
              name="photo"
              value={this.state.photo}
              onChange={this.chnageHandler}
              placeholder="Add Photo"
            />
          </div>
          <br/>
          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}