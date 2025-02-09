import axios from "axios";

const instance = axios.create({
    baseURL:"https://dinoapi.brunosouzadev.com/api"
})

export default instance;