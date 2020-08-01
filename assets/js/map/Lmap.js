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
                  const country= [];

                  $.each(req, function(i) {

    
                      let pays =req[i]["country"];
                      let hobbies = req[i];
                      country.push(pays);
                      

                  $.ajax({
                      url: "https://nominatim.openstreetmap.org/search", // URL de Nominatim
                      type: 'get', // Requête de type GET
                      data: "q=" + pays + "&format=json&addressdetails=1&limit=1&polygon_svg=1" // Données envoyées (q -> adresse complète, format -> format attendu pour la réponse, limit -> nombre de réponses attendu, polygon_svg -> fournit les données de polygone de la réponse en svg)
                  }).done(function (response) {
                      if (response != "") {
                          let lat = response[0]['lat'];
                          let lon = response[0]['lon'];
                    
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

export default  Main;