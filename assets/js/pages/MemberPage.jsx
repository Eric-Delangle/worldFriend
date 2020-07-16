import React, { useEffect, useState, useContext } from 'react';
import UsersApi from '../services/UsersApi';
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import AuthApi from '../services/AuthApi';
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { USERS_API } from '../config';
import { Link } from 'react-router-dom';


const MemberPage = ({ history }) => {

    // je récupere le token 
    const jwt = window.localStorage.getItem("authToken");

    // je le décode
    const decoded = jwt_decode(jwt);

    // j'en extrait l'id
    const id = decoded.id;

//const infos= [];

    const [user, setUser] = useState([
        {
            firstName: "",
            lastName: "",
            email: "",
            city: "",
            coutry: "",
            hobbies: [{}]
        }
    ]);


    // Récuperation des données du membre pour l'affichage gràce à l'id. 
     async function fetchUser (id)  {
        try {
            const { firstName, lastName, email, city, country, hobbies } = await UsersApi.find(id);
            setUser({ firstName, lastName, email, city, country, hobbies });

        } catch (error) {

            toast.error("Votre espace n'a pas pu être chargé.");
            history.replace("/homePage");
        }

    }
    
    useEffect(() => {
        fetchUser(id);
       
    }, [id]);

    const infos =[ user.firstName, user.lastName, user.email, user.city, user.country, user.hobbies];


      for(let i in infos[0]){
    
             console.log(infos[i][0].name);
       
       
          var passions =  infos[i][0].name;
     
     }
 

    return (
  
        <>

            <div className="container mt-5">

                <h1>Salut  {user.firstName} {user.lastName} </h1>
                <div className="card mb-3">
                    <h3 className="card-header">Votre profil</h3>
                    <div className="card-body">
                        <h5 className="card-title">Centre(s) d'interêt(s)</h5>
                        <p>
                                
                                     {passions}
                             
                       </p>
                        
                        <div id="skype">
                            <p className="ml-5 mt-5">Ici je vais mettre l'encart de visioconférence.</p>
                        </div>
                        <div className="mt-5 mb-3 align-items-center">
                            <p>Ville: { user.city }</p>
                            <p>Pays: { user.country }</p>
                        </div>
                    </div>

                    
                </div>
               
            </div>
            <div className="mb-3 d-flex justify-content-between align-items-center">
            <h3>Modifier vos informations</h3>
            <Link  to="/edit"  className="btn btn-primary">Modifications</Link>
        </div>
        </>

    );
}

export default MemberPage;