import apiUrl from "../apiConfig";
import axios from "axios";

// Get all Organizations
const getAllOrganizations = () => {
    return axios.get(`${apiUrl}/organizations`);
};
//Add New Organization
const addNewOrganization =(organization)=>{
    return axios.post(`${apiUrl}/organizations`,{organization})
}
// Delete Organization by ID

const deleteOrganization = (id, token) => {
    return axios.delete(
            `${apiUrl}/organizations/${id}`, 
            { 
                headers: 
                { 
                    "Content-type": "application/json", 
                    "x-auth-organizationToken": token 
                } 
            }
        );
  }

// Login Organization
const organizationLogin = organization => {
    return axios.post(
        `${apiUrl}/organizations/login`, 
        {organization},
        {
            withCredentials: true,
            credentials: "include"
        })
}

// Logout Organization
const organizationLogout = () => {
    return axios.get(
        `${apiUrl}/organizations/logout`,
        {
            withCredentials: true,
            credentials: "include"
        }
    )
}

export { 
            getAllOrganizations,
            addNewOrganization,
            deleteOrganization, 
            organizationLogin , 
            organizationLogout
        };
