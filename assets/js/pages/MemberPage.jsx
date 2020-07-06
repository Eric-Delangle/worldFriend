import React, { useEffect, useState} from 'react';
import axios from "axios";

const MemberPage = (id) => {

    const [ users, setUser]= useState({
        lastName: "",
        firstName: "",
        email: "",
        city: "",
        country: "",
        hobbies: ""
    });

    const [ errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        city: "",
        country: "",
        hobbies: ""
    })
    
 


{/* Appel axios pour recevoir les infos de l'utilisateur connecté*/}
useEffect(()=> {
    axios
        .get("http://localhost:8000/api/users" )
        .then(response => response.data["hydra:member"])
        .then(data => setUser(data))
     
}, []);

    return ( 
      
        <>
   
        <div key= { users.id } className="container mt-5">
    <h1>Salut  { users.firstName }</h1>
        <div className="card mb-3">
                <h3 className="card-header">Votre profil</h3>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                </div>
                
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
                <div className="card-footer text-muted">
                    2 days ago
                </div>
                </div>
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Card title</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
                </div>
            </div>
   
        </>
   
     );
}
 
export default MemberPage;