import axios from "axios";
import { MEMBER_API } from "../config";

function register (user) {
    return axios.post(MEMBER_API , user);
}

export default {
    register
}