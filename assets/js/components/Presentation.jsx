import React from 'react';

const Presentation = (props) => {
    return (
    <div className="jumbotron mt-5 ml-5 mr-5">
    <h1 className="display-3">Bonjour le monde !</h1>
    <p className="lead">Faites vous des amis dans le monde entier et échangez sur des sujets qui vous passionnent.</p>
    <hr className="my-4"/>
  
    <p className="lead">
      <a className="btn btn-primary btn-lg" href="#" role="button">En savoir plus</a>
    </p>
  </div>  );
}
 
export default Presentation;