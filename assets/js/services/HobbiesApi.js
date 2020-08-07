import axios from "axios";
import Cache from "./Cache";
import { HOBBIES_API } from "../config";
import { USERS_API } from "../config";

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

// Afficher un hobbie en fonction de son id
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

// Afficher la liste des hobbies de l'ustilisateur connecté
async function findUserHobbies(userId) {
    const cachedHobbie = await Cache.get("users." +  userId);
    if(cachedHobbie) return cachedHobbie;

    return axios
    .get(USERS_API + "/"  +  userId)
    .then(response => {
       const hobbie =  response.data;
       Cache.set("user." + userId, hobbie);
       return hobbie;
       
    } );
}

// Créer un hobbie
function create (hobbie, userId) {
    return axios.post(HOBBIES_API,{
        ...hobbie,
        user:  `/api/users/${userId}`
    });
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
    deleteHobbie,
    findUserHobbies
};