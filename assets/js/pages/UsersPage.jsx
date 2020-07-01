import React, { useEffect, useState} from 'react';

import axios from "axios";

const UsersPage = (props) => {

    const  [users, setUsers] = useState([]);
    const  [hobbies, setHobbies] = useState([]);

{/* Appel axios pour recevoir la liste des pays */}
useEffect(()=> {
    axios
        .get("http://localhost:8000/api/users")
        .then(response => response.data["hydra:member"])
        .then(data => setUsers(data));
}, []);

{/* Appel axios pour recevoir la liste des hobbies de l'utilisateur */}
useEffect(()=> {
     axios
        .get("http://localhost:8000/api/hobbies")   
    /* .then(response => console.log(response) ) */
        .then(response => response.data["hydra:member"])
        .then(data => setHobbies(data));
}, []);


    return ( 
        <>
           
        <div className="container mt-5">
                <table  className="table table-hover ">
                    <thead>
                        <tr>
                        <th scope="col">Prénom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Ville</th>
                        <th scope="col">Pays</th>
                        <th scope="col">Hobbies</th>
                        </tr>
                    </thead>
                    <tbody>
                    { users.map(user => (
                        <tr key={user.id} className="table-active">
                        <td>{ user.firstName} </td>
                        <td>{ user.lastName}</td>
                        <td>{ user.city}</td>
                        <td>{ user.country}</td>
                        { hobbies.map(hobbie => (
                        <td key={hobbie.id} >{ hobbie.name }</td>
                        ))}
                        </tr>
                          ))}
                    </tbody>
                    </table> 
            </div>
      

        </>
     );
}
 
export default UsersPage;