import React, { useEffect, useState, useContext } from 'react';
import UsersApi from '../services/UsersApi';
import HobbiesApi from '../services/HobbiesApi';
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';

const MemberPage = (props) => {


    // je récupere le token 
    const jwt = window.localStorage.getItem("authToken");

    // je le décode
    const decoded = jwt_decode(jwt);

    // j'en extrait l'id
    const id = decoded.id;


    const [user, setUser] = useState([]);


    // Récuperation des données du membre pour l'affichage gràce à l'id. 
    async function fetchUser(id) {
        try {
            const { firstName, lastName, email, city, country, hobbies } = await UsersApi.find(id);
            setUser({ firstName, lastName, email, city, country, hobbies });


        } catch (error) {
            console.log(error.response);
        }

    }


    useEffect(() => {

        fetchUser(id);

    }, [id]);


    return (

        <>
            <div className="jumbotron mt-5 ml-5 mr-5" key={user.id}>

                <h1>Salut  {user.firstName} {user.lastName} </h1>
                <div className="card mb-3">
                    <h3 className="card-header">Votre profil</h3>
                    <div className="card-body">
                        <h5 className="card-title">Centre(s) d'interêt(s)</h5>
                         {/* Une autre option pour rendre conditionnellement quelque chose dans react, consiste à utiliser l' &&opérateur logique:
                         Cela fonctionne parce que dans JavaScript, true && expression s'évalue toujours à expression, et false && expression toujours à false. 
                         Par conséquent, si la condition est vraie, l'élément juste après && apparaîtra dans la sortie. S'il est faux, React l'ignorera et l'ignorera.
                         */}
                        <div key= {user.id}>
                            {user.hobbies && user.hobbies.map(item => {
                                return <div key={item.id}>{item.name}</div>;
                            })}
                        </div>
                        <p>
                            <Link to="/editloisir" className="btn-sm btn-primary">Gérer vos centres d'intérêts</Link>
                        </p>

                        <div id="skype">
                            <p className="ml-5 mt-5">Ici je vais mettre l'encart de visioconférence.</p>
                        </div>
                        <div className="mt-5 mb-3 align-items-center">
                            <p>Ville: {user.city}</p>
                            <p>Pays: {user.country}</p>
                        </div>
                        <div className="mt-5 mb-3 align-items-center">
                            <p>Vos amis:</p>
                        </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center p-5">
                        <h3>Modifier vos informations</h3>
                        <Link to="/edit" className="btn btn-primary">Modifications</Link>
                    </div>
                </div>
            </div>
        </>

    );
}

export default MemberPage;