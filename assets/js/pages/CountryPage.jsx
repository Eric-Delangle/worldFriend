import React, { useEffect, useState } from 'react';
import axios from "axios";

const CountryPage = props => {

    const  [pays, setPays] = useState([]);

{/* Appel axios pour recevoir la liste des pays */}
useEffect(()=> {
    axios
        .get("http://localhost:8000/api/pays")
        .then(response => response.data["hydra:member"])
        .then(data => setPays(data));
}, []);

    return ( 
        <>
        { pays.map(pay => (
            <ul  key={pay.id} className="list-group  mt-5 ml-5 mr-5 ">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                { pay.name}
            <span className="badge badge-primary badge-pill">{ }</span>
            </li>
        </ul>
        ))}
        </>
     );
}
 
export default CountryPage;