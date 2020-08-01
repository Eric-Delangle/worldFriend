import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from '../components/Pagination';

const CountryPage = props => {

    const  [users, setPays] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ loading, setLoading ] = useState(true);
    const itemsPerPage = 10;

{/* Appel axios pour recevoir la liste des pays */}
useEffect(()=> {
    axios
        .get("http://localhost:8000/api/users")
        .then(response => response.data["hydra:member"])
        .then(data => setPays(data));
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
        { paginatedUsers.map(user => (
            <ul  key={user.id} className="list-group  mt-5 ml-5 mr-5 ">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                { user.country}
            <span className="badge badge-primary badge-pill">{ user.firstName } { user.lastName }</span>
            </li>
        </ul>
        ))}

{ itemsPerPage < users.length &&  (
<Pagination currentPage = {currentPage} itemsPerPage = {itemsPerPage} length = { users.length} onPageChanged = { handlePageChange}/>
 ) }
        </>
     );
}
 
export default CountryPage;