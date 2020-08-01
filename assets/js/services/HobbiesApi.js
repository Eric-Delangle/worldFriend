import axios from "axios";
import Cache from "./Cache";
import { HOBBIES_API } from "../config";

// Afficher tous les hobbies
async function findAll () {

    const cachedHobbies= await Cache.get("users");
    if(cachedHobbies) return cachedHobbies;
    return axios 
        .get(HOBBIES_API)
        .then(response => {
            const users = response.data["hydra:member"];
            Cache.set("hobbies", hobbies);
            return hobbies;
        });
}

// Afficher les hobbies d'un utilisateur selon son id
async function find(id) {
    const cachedHobbie = await Cache.get("hobbies." + id);
    if(cachedHobbie) return cachedHobbie;

    return axios
    .get(HOBBIES_API + "/" + id)
    .then(response => {
       const hobbie =  response.data;
       console.log(hobbie);
       Cache.set("user." + id, hobbie);
       return hobbie;
       
    } );
}

// Créer un hobbie
function create (hobbie) {

    console.log(hobbie);
    return axios.post(HOBBIES_API ,  hobbie ).then( async response =>{
        const cachedHobbie = await Cache.get("hobbie" );
        if (cachedHobbie) {
            Cache.set("hobbie" ,  [...cachedHobbie, response.data]);
        }
        console.log(response);
        return response;
    })
}

// Mettre à jour un hobbie
function update (userId, hobbie) {
    return axios.put(HOBBIES_API + "/" + userId ,  hobbie ).then( async response => {
        const cachedHobbies= await Cache.get("hobbies");
        const cachedHobbie = await Cache.get("hobbies." + userId);
        if(cachedHobbie) {
            Cache.set("hobbie." + userId, response.data);
        }

        if (cachedHobbies) {
        const index= cachedHobbies.findIndex(c => c.userId ===  + userId);
        cachedHobbies[index] = response.data;
        }
        return response;
    });
   
}

// Supprimer un hobbie
function deleteHobbie (id) {
    return axios
    .delete(HOBBIES_API + "/" + id );
}

export default {
    findAll,
    find,
    update,
    create,
    deleteHobbie
};