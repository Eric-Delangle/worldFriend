import React, { useState } from 'react';
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage';
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
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

    const NavbarWithRouter = withRouter(Navbar);


    return (
        /* Le HashRouter me permet de dire qu'on reste sur la meme page mais avec un element different  #/hobbies ou #/users, etc...*/
        /*  C'est le switch qui joue le rôle du router */
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/CountryPage" component={CountryPage} />
                        <Route path="/UsersPage" component={UsersPage} />
                        <PrivateRoute path="/MemberPage" component={MemberPage} />
                        <PrivateRoute path="/edit" component={EditMemberPage} />
                        <Route path="/Register" component={RegisterPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </AuthContext.Provider>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);


// dans cet objet j'appele toutes mes classes

class Main {
    constructor() {
        this.map = new Lmap();
        this.map.initMap();
    }
}

// création de la classe Lmap
class Lmap {
    constructor() {
        this.markers = [];
    }

    // apparition de la map leaflet
    initMap() {
        const lat = 30.00;
        const long = 10.;
        const bounds = [lat, long];
        let mymap;// je crée une variable vide au début
        const markers = [];

        //début de requette
        $(document).ready(function () {

            mymap = L.map('map').setView([lat, long], 2.5);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG9sdnUiLCJhIjoiY2s0c3FmY2FoMTFzMDNlcXVmeXZhdGR1YiJ9.XDjMZFILlUhTvOnBqMAucg', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                //zoomOffset: -2,
                minZoom: 2.5,
                maxBounds: bounds,
                id: 'mapbox/streets-v11',
            }).addTo(mymap);

            let icone = L.icon({ // creation des icones
                iconUrl: '/images/marker.png',
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [-3, -76],
            });

            // requete qui permet de récuperer les inos du membre
            $.ajax({
                url: 'members.json',
                type: 'GET',
                dataType: 'json',


                success: function (response) {

                    const req = response;
                    console.log(req);
                    const country= [];


                    $.each(req, function(i) {

      
                        let pays =req[i]["country"];
                        country.push(pays);
                 console.log(pays);

                    $.ajax({
                        url: "https://nominatim.openstreetmap.org/search", // URL de Nominatim
                        type: 'get', // Requête de type GET
                        data: "q=" + pays + "&format=json&addressdetails=1&limit=1&polygon_svg=1" // Données envoyées (q -> adresse complète, format -> format attendu pour la réponse, limit -> nombre de réponses attendu, polygon_svg -> fournit les données de polygone de la réponse en svg)
                    }).done(function (response) {
                        if (response != "") {
                            let lat = response[0]['lat'];
                            let lon = response[0]['lon'];
                            console.log(lon);
                            console.log(lat);
                           let marker = L.marker([lat, lon], { icon: icone });// creation des markers
                           markersclusters.addLayer(marker);
                        }// fermeture du if
                    })// fermeture du done
                })// fermeture de each
                }// fermeture du success
            })//fermeture de ajax
            let  markersclusters = new L.MarkerClusterGroup(); // Nous initialisons les groupes de marqueurs
            mymap.addLayer(markersclusters);
        })//fermeture de  $(document).ready
    }// fin initmap     
}

new Main();
