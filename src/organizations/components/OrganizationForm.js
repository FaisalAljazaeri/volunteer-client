import React, { Component } from "react";
import './organization.css';
export default class OrganizationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: ""
        };
    }
    // Set state with the new value of the input field
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    // Get the data of the organization from the form state
    submitHandler = e => {
        e.preventDefault();
        // The inputed organization in a variable
        const organization = {name: this.state.name, password: this.state.password};
        // Return the state to the original so the input field value is cleared
        this.setState({
            name: "",
            password: ""
        });
        // Call the method of the organization login in the parent
        // and pass it the object of the org to be logged in
        if ( this.props.organizationLogin){
            this.props.organizationLogin(organization);}
            else if (this.props.addnewOrg){
            this.props.addnewOrg(organization);}
          };
    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label className="label-org">Organization Name: </label>
                    <br/>
                    <input
                        name="name"
                        placeholder="Write organization name"
                        value={this.state.name}
                        onChange={this.changeHandler}
                    />
                    <br/>
                    <label className="label-org">Organization Password: </label>
                    <br/>
                    <input
                        name="password"
                        type="password"
                        placeholder="Write organization password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                    />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}