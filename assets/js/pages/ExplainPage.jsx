import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const ExplainPage = (props) => {
    return ( 
        <>
            <div className="jumbotron mt-5 ml-5 mr-5">
                <h1 className="display-3">Fonctionnement.</h1>
                <p className="lead">Parcourez la liste des pays ou des hobbies qui vous plaisent et ajoutez vous des relations.</p>
                <hr className="my-4"/>
  
                    <p className="lead">
                        <NavLink to="/register" className="btn btn-primary">S'inscrire</NavLink>
                        <Link to="/login" className="btn btn-link">J'ai déjà un compte.</Link>
                    </p>
            </div>
        </>
     );
}
 
export default ExplainPage;