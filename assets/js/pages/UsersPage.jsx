import React, { useEffect, useState} from 'react';
import axios from "axios";
import UsersApi from '../services/UsersApi';
import { ToastContainer, toast } from "react-toastify";

const UsersPage = ({ history}) => {

    const  [users, setUsers] = useState([]);
   
   // Récuperation de  la liste des utilisateurs. 
   const fetchUsers = async () => { 
    try { 
        const data  = await UsersApi.findAll();
        setUsers(data);
       // setLoading(false);
    } catch (error) {
        toast.error("La liste des utilisateurs n'a pas pu être chargée");
       history.replace("/homePage");
    }
}


{/* Appel UsersApi pour recevoir la liste des users*/}
useEffect(  ()=> {
fetchUsers();
     
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

                                { user.hobbies.map( hobbie => 
                                    <td >{hobbie.name}</td>
                                )}
                         
                                </tr>
                                
                            </tbody>
                            </table> 
                    </div>
            
                ))}

        </>
     );
}
 
export default UsersPage;