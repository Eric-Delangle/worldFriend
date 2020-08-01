import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';

const EditMemberPage = ({history}) => {

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

    const [ errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        coutry: "",
        hobbies: [{}]
    })

    const [ editing, setEditing] =useState(false);
    const [ loading, setLoading ] = useState(false);

      // Gestion des changements des inputs dans le formulaire.
      const handleChange = ({ currentTarget }) => {
        const { name, value }= currentTarget;
        setUser({ ...user, [name] : value });
    }


      // Gestion de la soumission du formulaire
      const handleSubmit = async event => {
        event.preventDefault();

                    try {
                        setErrors({});
                
                            if (editing) {
                            UsersApi.update(id, user);
                            
                            toast.success("Votre profil a bien été modifié");
                            history.replace("/MemberPage");
                            } 
                            }catch ({ response }) {
                                console.log(response);
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
                        setEditing(true);
                    }

            return (
                <>
                <h1>Modification de votre profil.</h1>
                {!loading && <form onSubmit= { handleSubmit }>
                
                    <Field
                        name="firstName"
                        label="Prénom"
                        placeholder="Votre prénom"
                      //  error={errors.firstName}
                        value={user.firstName}
                        onChange={handleChange}
                    />
                    <Field
                        name="lastName"
                        label="Nom"
                        placeholder="Votre nom"
                      //  error={errors.lastName}
                        value={user.lastName}
                        onChange={handleChange}
                    />
                    <Field
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Votre email"
                      //  error={errors.email}
                        value={user.email}
                        onChange={handleChange}
                    />

                    <Field
                        name="city"
                        label="Ville"
                        placeholder="Votre ville"
                      //  error={errors.city}
                        value={user.city}
                        onChange={handleChange}
                    />
                    <Field
                        name="country"
                        label="Pays"
                        placeholder="Votre pays"
                   //     error={errors.country}
                        value={user.country}
                        onChange={handleChange}
                    />

                    <Field
                        name="password"
                        label="Mot de passe"
                        type="password"
                        placeholder="Votre mot de passe"
                    //    error={errors.password}
                        value={user.password}
                        onChange={handleChange}
                    />
                    <Field
                        name="passwordConfirm"
                        label="Confirmation"
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                     //   error={errors.passwordConfirm}
                        value={user.passwordConfirm}
                        onChange={handleChange}
                    />
    
                    <div className="form-group">
                        <button type="submit" className="btn btn-success">
                            Enregistrer
                        </button>
                        <Link to="/MemberPage" className="btn btn-link">Retourner sur le profil</Link>
                    </div>
                </form>}
    </>
    )
            }

export default EditMemberPage;