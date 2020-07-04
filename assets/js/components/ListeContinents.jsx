import React, { useEffect, useState } from 'react';
import axios from "axios";

const ListeContinents = (props) => {

    const  [continents, setContinents] = useState([]);

{/* Appel axios pour recevoir la liste des continents */}
useEffect(()=> {
    axios
        .get("http://localhost:8000/api/continents")
        .then(response => response.data["hydra:member"])
        .then(data => setContinents(data));
}, []);

    return ( 
        <>
        { continents.map(continent=> (  

        <ul className="list-group  mt-5 ml-5 mr-5 " key= { continent.id }>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                { continent.name }
            <span className="badge badge-primary badge-pill">{ continent.pays.length}</span>
            </li>
        </ul>
        ))}
        </>
     );
}
 
export default ListeContinents;