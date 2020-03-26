import React, { Component } from "react";
import Posts from "../../posts/component/posts";
import OrganizationForm from "./OrganizationForm";
import { getAllOrganizations } from "../api";
import PostForm from "../../posts/component/PostForm";
import {deleteOrganization, organizationLogin, organizationLogout} from '../api'
import './organization.css';
export default class Organization extends Component {
    constructor(props) {
        super(props);
        // By default theres no organization logged in, so no posts will render
        this.state = {
            organizations: [],
            currentOrganizationPosts: [],
            organizationLogged: false,
            organizationId: "",
            organizationToken: localStorage.getItem("organizationToken")
        };
    }
    componentDidMount() {
        // Get all Organizations from API and load them in the state
        getAllOrganizations()
            .then(response => {
                this.setState({
                    organizations: response.data.organizations
                });
            })
            .catch(err => console.log(err));
    }

    // Logout Organization
    logout = () => {
        this.setState({
            organizationLogged: false,
            organizationId: "",
            currentOrganizationPosts: "",
            organizationToken: ""
        });

        // Clear the JWT fron Local Storage
        localStorage.removeItem("organizationToken");
    }

    // Try to Login Organization with the submitted data
    authenticateOrganization = async organization => {
        try{
            const res = await organizationLogin(organization);

            // Store the Recieved JWT in Local Storage
            localStorage.setItem("organizationToken", res.data.token);

            this.setState({
                organizationLogged: true,
                organizationId: res.data.organization.id,
                organizationToken: localStorage.getItem("organizationToken")
            });

            return true
        }
        catch(err) {
            console.log(err);
        }
    }

    // Change the state of oaranizations posts so they can be rendered
    organizationLogin = async organization => {
        // Try Login Request for the submitted Organization data
        const loginSucess = await this.authenticateOrganization(organization);

        // check if the organization is authenticated
        // update the current organization to render its posts
        if (loginSucess) {
            // Get all posts by the organization with the ID
            const organizationPosts = this.props.posts.filter(
                post => 
                post.organization._id === this.state.organizationId
            );
            // Since an organization is authenticated by name the state
            // will hold its posts.
            this.setState({
                currentOrganizationPosts: organizationPosts,
            });
        } else {
            // If no organization is found by name don't render any posts
            // and set logged back to false since it's not authenticated
            this.setState({
                currentOrganizationPosts: [],
                organizationLogged: false,
                organizationId: ""
            });
        }
    };
    // Pass the posts array to parent (App) to keep it in the state
    setPosts = posts => {
        this.props.setPosts(posts);
    };
    // Set new organization's posts array
    setOrganizationPosts = posts => {
        this.setState({
            currentOrganizationPosts: posts
        });
    };
    // Add new post to the organization posts state
    addPost = post => {
        this.setState({
            currentOrganizationPosts: [
                ...this.state.currentOrganizationPosts,
                post
            ]
        });
    };
    //Creat Fountain Dlete Organization By Id
    deleteOrg=()=>{
        deleteOrganization(this.state.organizationId, this.state.organizationToken)
        .then(response=>{
            this.setState({
                organizationLogged: false,
                currentOrganizationPosts:[],
                organizationId:"",
                organizationToken: ""
            })

            // Remove JWT from Local Storage
            localStorage.removeItem("organizationToken");
        })
    .catch(error => {
        console.log(error);})
    }
    render() {
        return (
            <div className="div-org">
                { this.state.organizationLogged
                    ? <button onClick={this.logout}>Logout</button>
                    : <OrganizationForm organizationLogin={this.organizationLogin} />
                }

                {/* Render add post form only when an organization is logged in */}
                {this.state.organizationLogged ? (<>
                <button className="delete-org-button" onClick={this.deleteOrg}>Delete organization</button>
                    <PostForm
                        organizationId={this.state.organizationId}
                        addPost={this.addPost}
                    />
                    </>
                ) : (
                    ""
                )}
                <Posts
                    posts={this.state.currentOrganizationPosts}
                    setPosts={this.setPosts}
                    organizationLogged={this.state.organizationLogged}
                    setOrganizationPosts={this.setOrganizationPosts}
                />
            </div>
        );
    }
}