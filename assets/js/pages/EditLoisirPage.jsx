import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import HobbiesApi from '../services/HobbiesApi';
import jwt_decode from "jwt-decode";
import UsersApi from '../services/UsersApi';

const EditLoisirPage = ({ history }) => {

    const [loading, setLoading] = useState(false);
    const [hobbie, setHobbie] = useState([]);
    const [user, setUser] = useState([]);
    const [errors, setErrors] = useState({})

    // je récupere le token 
    const jwt = window.localStorage.getItem("authToken");

    // je le décode
    const decoded = jwt_decode(jwt);

    // j'en extrait l'id
    const id = decoded.id;

    // Gestion des changements des inputs dans le formulaire.
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setHobbie({ ...hobbie, [name]: value });
    }

    // Récuperation des données du membre 
    async function fetchUser(id) {
        try {
            const { firstName, lastName, email, city, country, hobbies } = await UsersApi.find(id);
            setUser({ firstName, lastName, email, city, country, hobbies });
            console.log(hobbies);
     

        } catch (error) {
            console.log(error.response);
        }

    }

    useEffect(() => {

        fetchUser(id);

    }, [id]);

  


    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});

            HobbiesApi.create(hobbie);

            console.log(hobbie);

            toast.success("Votre loisir a bien été enregistré");
            history.replace("/EditLoisirPage");

        } catch ({ response }) {
            console.log(hobbies);
            console.log(user);

            const { violations } = response.data;

            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(errors);
                toast.error("Des erreurs dans votre formulaire !");
            }

        }
        setLoading(true);

    }

    // Gestion de la suppression d'un hobbie.
    const handleDelete = async id => {
        console.log(user.hobbies);
        /*
   user.hobbies && user.hobbies.map(hobbie => { 
            <p key = {hobbie.id}>{console.log(hobbie[user.hobbies = {"hobbies": id}] ) }</p>
        })
        /*
        const originalHobbies = [...hobbies];
        setHobbies(hobbies.filter(hobbie => hobbie.id !== id));
        console.log(originalHobbies);

        try {
            await HobbiesApi.deleteHobbie(id);
            toast.success("Le hobbie a bien été supprimé.");
        } catch (error) {
            toast.error("Une erreur est survenue");
            console.log(error.response);
            console.log(originalHobbies);
            setHobbies(originalHobbies);
        }
*/
    }

    return (
        <>
            <h1>Gestion de vos loisirs.</h1>
            {!loading && <form onSubmit={handleSubmit}>

                <Field
                    name="hobbies"
                    label="Loisirs"
                    placeholder="Ajouter un loisir."
                    error={errors.hobbies}
                    value={hobbie.name}
                    onChange={handleChange}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Enregistrer
                    </button>
                    <Link to="/MemberPage" className="btn btn-link">Retourner sur le profil</Link>
                </div>
            </form>}
            <div className="card-body">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Hobbies</th>
                        </tr>
                    </thead>
                    <tbody className="white">

                        
                            {user.hobbies && user.hobbies.map(hobbie => 
                           
                                <tr className="table-primary">
 
                                    <td key={hobbie.id}>
                                            {hobbie.name}
                                    </td>
                                    <td>{hobbie.id}</td>
                                    <td>
                                        <button onClick={() => handleDelete(hobbie.id)} className="btn btn-sm btn-danger">
                                                Supprimer
                                        </button>
                                    </td>
                                    </tr>
                            )}


                        

                    </tbody>
                </table>
            </div>
        </>
    )
}
export default EditLoisirPage;