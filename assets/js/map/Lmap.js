// création de la classe Lmap
class Lmap 
{ 
  constructor () {
   
  
    this.markers = [];
  }

  // apparition de la map leaflet
    initMap() {
    const lat = 0;
    const long = 0;
    const bounds = [lat, long];
    const markers = [];
  
           
         const mymap = L.map('map').setView([lat, long], 6.4);
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG9sdnUiLCJhIjoiY2s0c3FmY2FoMTFzMDNlcXVmeXZhdGR1YiJ9.XDjMZFILlUhTvOnBqMAucg', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          minZoom: 6,
          maxBounds: bounds,
          id: 'mapbox/streets-v11',
          }).addTo(mymap);
          let icone =  L.icon({ // creation des icones
            iconUrl: '/images/marker3.png',
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [-3, -76],
          });

    }// fin initmap     
}