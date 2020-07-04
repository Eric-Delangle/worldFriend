import React, { useEffect, useState} from 'react';
import axios from "axios";

const UsersPage = (props) => {

    const  [users, setUsers] = useState([]);
   
 


{/* Appel axios pour recevoir la liste des users*/}
useEffect(()=> {
    axios
        .get("http://localhost:8000/api/users")
        .then(response => response.data["hydra:member"])
        .then(data => setUsers(data))
     
}, []);

    return ( 
        <>
            { users.map(user=> (   
    
                <div className="container mt-5" key ={ user.id }>
                        <table  className="table table-hover ">
                            <thead>
                                <tr>
                                <th scope="col">Prénom</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Ville</th>
                                <th scope="col">Pays</th>
                                <th scope="col">Continent</th>
                                <th scope="col">Hobbies</th>
                                </tr>
                            </thead>
                            <tbody>
                    
                                <tr className="table-active" > 
                                <td>{ user.firstName} </td>
                                <td>{ user.lastName}</td>
                                <td>{ user.city}</td>
                                <td>{ user.country}</td>
                                <td>{ user.continent}</td>

                                <td>{user.hobbies[0].name}</td>
                         
                               
                            
                                </tr>
                                
                            </tbody>
                            </table> 
                    </div>
            
                ))}

        </>
     );
}
 
export default UsersPage;