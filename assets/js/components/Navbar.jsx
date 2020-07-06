import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                <NavLink to="/" className="btn btn-primary">Accueil<span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/CountryPage" className="btn btn-primary">Pays</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/UsersPage" className="btn btn-primary">Utilisateurs</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/MemberPage" className="btn btn-primary">Votre espace</NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Langues</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Hobbies</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Contact</a>
                </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <a className="nav-link" href="#"> Inscription</a>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/loginPage" className="btn btn-primary">Connexion</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger">Déconnexion</button>
                            </li>
                    </ul>
            </div>
            </nav>
     );
}
 
export default Navbar;