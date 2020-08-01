import React, { useEffect, useState} from 'react';
import axios from "axios";
import UsersApi from '../services/UsersApi';
import { ToastContainer, toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";
import Pagination from "../components/Pagination";

const UsersPage = ({ history}) => {

    const  [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ loading, setLoading ] = useState(true);
    const itemsPerPage = 10;
    
   
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
// La pagination des données se fait grâce au composant pagination
//Gestion du changement de page
const  handlePageChange = page => setCurrentPage(page);

// Pagination des données.
const paginatedUsers =  users.length > itemsPerPage ? Pagination.getData( 
    users, 
    currentPage, 
    itemsPerPage
    ) : users;


    return ( 
        <>
            { paginatedUsers.map(user=> (   

                <div className="container mt-0 bg-primary " key ={ user.id }>
                        <table  className="table table-hover ">
                            <thead>
                                <tr  className="white">
                                <th scope="col">Prénom</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Ville</th>
                                <th scope="col">Pays</th>
                                <th scope="col">Continent</th>
                                <th scope="col">Hobbies</th>
                                </tr>
                            </thead>
                            <tbody  className="white">
                                
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



{ itemsPerPage < users.length &&  (
<Pagination currentPage = {currentPage} itemsPerPage = {itemsPerPage} length = { users.length} onPageChanged = { handlePageChange}/>
 ) }

        </>
     );
}
 
export default UsersPage;