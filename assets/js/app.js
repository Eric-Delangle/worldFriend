import React from 'react';
import ReactDom  from "react-dom";
import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage';
import { HashRouter, Switch, Route  } from 'react-router-dom';
import '../css/app.css';
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import UsersPage from './pages/UsersPage';

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)



// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

const App = ()=> {

    return (

    <HashRouter>
        <Navbar />
        <main>
            <Switch>
                    <Route path="/loginPage" component= {LoginPage}/>
                    <Route path="/CountryPage" component= {CountryPage}/>
                    <Route path="/UsersPage" component= {UsersPage}/>
                    <Route path="/" component= {HomePage}/>
            </Switch>
        </main>
    
    </HashRouter>
    );
}

const rootElement = document.querySelector('#app');
ReactDom.render(<App />, rootElement);