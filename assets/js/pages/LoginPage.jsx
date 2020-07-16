import React, { useState, useContext } from "react";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";
import AuthApi from "../services/AuthApi";
import AuthContext from "../contexts/AuthContext";


const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState( {
        username: "",
        password: ""
    })
  
    const[error, setError] = useState("");

    // Gestion des champs
        const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value });
    }

    // Gestion du submit 
        const handleSubmit = async event => {
        event.preventDefault();
       try {
           await AuthApi.authenticate(credentials);
           setError("");
           setIsAuthenticated(true);
           toast.success("Vous êtes desormais connecté(e) !")
           history.replace("/MemberPage ");
           } catch(error) {
           setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas.");
           toast.error("Une erreur est survenue !");
       }
    }
    return ( 
    <>
    <div className="jumbotron mt-5 ml-5 mr-5">
        <h1>Connectez vous au monde !</h1>
        <form onSubmit= { handleSubmit }>

            <Field  
                label="Adresse email" 
                name="username" 
                value= { credentials.username} 
                onChange= { handleChange }
                 placeholder="Adresse email de connexion"
                 error = { error }
            />
            
            <Field
                name="password"
                label="Mot de passe"
                value={ credentials.password}
                onChange= { handleChange }
                type="password" 
                error=""
            />
            
            <div className="form-group">
                <button type="submit" className="btn btn-success">
                    Connexion
                </button>
            </div>
        </form>
        </div>
    </>
     );
}
 
export default LoginPage;