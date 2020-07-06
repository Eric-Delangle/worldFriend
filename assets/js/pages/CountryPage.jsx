import React, { useEffect, useState } from 'react';
import axios from "axios";

const CountryPage = props => {

    const  [users, setPays] = useState([]);

{/* Appel axios pour recevoir la liste des pays */}
useEffect(()=> {
    axios
        .get("http://localhost:8000/api/users")
        .then(response => response.data["hydra:member"])
        .then(data => setPays(data));
}, []);

    return ( 
        <>
        { users.map(user => (
            <ul  key={user.id} className="list-group  mt-5 ml-5 mr-5 ">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                { user.country}
            <span className="badge badge-primary badge-pill">{ user.firstName } { user.lastName }</span>
            </li>
        </ul>
        ))}
        </>
     );
}
 
export default CountryPage;