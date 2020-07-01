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
        <ul className="list-group  mt-5 ml-5 mr-5 ">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Europe
            <span className="badge badge-primary badge-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Afrique
            <span className="badge badge-primary badge-pill">6</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Asie
            <span className="badge badge-primary badge-pill">4</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Amérique du nord
            <span className="badge badge-primary badge-pill">7</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                 Amérique du sud
             <span className="badge badge-primary badge-pill">9</span>
            </li>
        </ul>
        </>
     );
}
 
export default ListeContinents;