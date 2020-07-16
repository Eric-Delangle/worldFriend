import React, { useState } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import MemberApi from "../services/MemberApi";
import { toast } from "react-toastify";

const RegisterPage = ({ history }) => {

    const [ user, setUser ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        city:"",
        country:"",
        password: "",
        passwordConfirm: "",
        continent:""
    });

    const [ errors, setErrors ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        city:"",
        country:"",
        password: "",
        passwordConfirm: "",
        continent:""
    });

      // Gestion des changements des i nputs dans le formulaire.
      const handleChange = ({ currentTarget }) => {
        const { name, value }= currentTarget;
        setUser({ ...user, [name] : value });
    };

    // Gestion de la soumission de l'utilisateur.
    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};

        if(user.password !== user.passwordConfirm ) {
            apiErrors.passwordConfirm =
            "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            toast.error("Il y a des erreurs dans votre formulaire !");
            return;
        }

        try{
          await MemberApi.register(user);
          setErrors({});
         // flash success
         toast.success("Vous êtes desormais inscrit(e), vous pouvez vous connecter !");
         history.replace('/login');
        } catch (error) {
            
            const { violations } = error.response.data;

            if (violations) {
                
              violations.forEach(violation => {
                apiErrors[violation.propertyPath] = violation.message;
              });
              setErrors(apiErrors);
            }
            toast.error("Il y a des erreurs dans votre formulaire !");
        }
    }

    return ( 
        <>
        <h1>Inscription</h1>
        <form onSubmit= { handleSubmit }>
            <Field 
                name="firstName" 
                label="Prénom" 
                placeholder="Votre prénom" 
                error= { errors.firstName } 
                value= { user.firstName } 
                onChange= { handleChange }
            />
                 <Field 
                name="lastName" 
                label="Nom" 
                placeholder="Votre nom" 
                error= { errors.lastName } 
                value= { user.lastName } 
                onChange= { handleChange }
            />
                 <Field 
                name="email" 
                label="Email" 
                type="email"
                placeholder="Votre email" 
                error= { errors.email } 
                value= { user.email } 
                onChange= { handleChange }
            />

            <Field 
                name="city" 
                label="Ville" 
                placeholder="Votre ville" 
                error= { errors.city } 
                value= { user.city } 
                onChange= { handleChange }
            />
            <Field 
                name="country" 
                label="Pays" 
                placeholder="Votre pays" 
                error= { errors.country } 
                value= { user.country } 
                onChange= { handleChange }
            />

                <Field 
                name="password" 
                label="Mot de passe" 
                type="password"
                placeholder="Votre mot de passe" 
                error= { errors.password } 
                value= { user.password } 
                onChange= { handleChange }
            /> 
                 <Field 
                name="passwordConfirm" 
                label="Confirmation" 
                type="password"
                placeholder="Confirmez votre mot de passe" 
                error= { errors.passwordConfirm } 
                value= { user.passwordConfirm } 
                onChange= { handleChange }
            />
              <Field 
                name="continent" 
                label="Continent" 
                placeholder="Votre continent" 
                error= { errors.continent } 
                value= { user.continent } 
                onChange= { handleChange }
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">
                     Enregistrer
                </button>
                <Link to="/login" className="btn btn-link">J'ai déjà un compte.</Link>
            </div>
        </form>
        </>

     );
}
 
export default RegisterPage;