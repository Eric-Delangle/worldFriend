import React, { useState } from 'react';
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage';
import { HashRouter, Switch, Route , withRouter } from 'react-router-dom';
import '../css/app.css';
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import UsersPage from './pages/UsersPage';
import AuthApi from "./services/AuthApi";
import MemberPage from './pages/MemberPage';
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from './pages/RegisterPage';
import EditMemberPage from './pages/EditMemberPage';

//Permet de savoir si on est authentifié au démarrage de l'appli.
AuthApi.setup();

const App = () => {

    // Il faudrait par defaut qu'on demande a Authapi si on est connecté ou pas.
        const [isAuthenticated, setIsAuthenticated] = useState(
        AuthApi.isAuthenticated()
      );
    
      const NavbarWithRouter =  withRouter(Navbar);
    
    
        return ( 
              /* Le HashRouter me permet de dire qu'on reste sur la meme page mais avec un element different  #/hobbies ou #/users, etc...*/
            /*  C'est le switch qui joue le rôle du router */
            <AuthContext.Provider value= { {
                isAuthenticated,
                setIsAuthenticated
            } }>
                <HashRouter>
                    <NavbarWithRouter />
                    <main className="container pt-5">
                        <Switch>
                            <Route path="/login" component= {LoginPage}/>
                            <Route path="/CountryPage" component= {CountryPage}/>
                            <Route path="/UsersPage" component= {UsersPage}/>
                            <PrivateRoute path="/MemberPage" component={ MemberPage }/>
                            <PrivateRoute path="/edit" component={ EditMemberPage }/>
                            <Route path="/Register" component= {RegisterPage}/>
                            <Route path="/" component= {HomePage}/>
                        </Switch>
                    </main>
                </HashRouter>
                <ToastContainer  position={ toast.POSITION.BOTTOM_RIGHT }/>
            </AuthContext.Provider>
        );
    };
    
    const rootElement =  document.querySelector("#app");
    ReactDOM.render(<App />, rootElement);




    