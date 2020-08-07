import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import HobbiesApi from '../services/HobbiesApi';
import jwt_decode from "jwt-decode";

const EditLoisirPage = ({ history }) => {

    // je récupere le token 
    const jwt = window.localStorage.getItem("authToken");

    // je le décode
    const decoded = jwt_decode(jwt);

    // j'en extrait l'id
    const userId = decoded.id;

    const [loading, setLoading] = useState(false);

    const [hobbies, setHobbies] = useState([]); // la c'est pour afficher la liste des hobbies

    const [hobbie, setHobbie] = useState( // la c'est pour gérer l'ajout d'un hobbie
        {
            name: ""
        }
    );

    const [errors, setErrors] = useState({
        id: "",
        name: ""

    });

    // Récuperation des hobbies du membre 
    async function fetchHobbies() {
        try {
            const hobbies = await HobbiesApi.findUserHobbies(userId);
            setHobbies(hobbies);
        } catch (error) {
            console.log(error.response);
        }

    }

    // Récupération de la liste des hobbies à chaque chargement du composant.
    useEffect(() => {

        fetchHobbies(userId);

    }, [userId]);

    // Gestion des changements des inputs dans le formulaire.
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setHobbie({ ...hobbies, [name]: value });
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {

            setErrors({});
            HobbiesApi.create({ name: hobbie.hobbies }, userId);
            setHobbie({ name: hobbie.hobbies }, userId);
            fetchHobbies(userId);
            toast.success("Votre loisir a bien été enregistré");

        } catch ({ response }) {

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

        const originalHobbies = [...hobbies.hobbies];
        setHobbies(hobbies.hobbies.filter(hobbies => hobbies.id !== id));

        try {
            await HobbiesApi.deleteHobbie(id);
            toast.success("Le hobbie a bien été supprimé.");
            fetchHobbies(userId);
            history.replace("/editloisir");
        } catch (error) {
            toast.error("Une erreur est survenue");
            setHobbies(originalHobbies);
        }

    }

    return (
        <>
            <h1>Gestion de vos loisirs.</h1>
            <form onSubmit={handleSubmit}>

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
            </form>
            <div className="card-body">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Hobbies</th>
                        </tr>
                    </thead>
                    <tbody className="white">

                        {hobbies.hobbies && hobbies.hobbies.map(hobbie =>

                            <tr className="table-primary" key={hobbie.id}>
                                <td>
                                    {hobbie.name}
                                </td>
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