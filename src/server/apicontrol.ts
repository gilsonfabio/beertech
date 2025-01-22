import axios from "axios";

export const apicontrol = axios.create({
    baseURL: "http://192.168.0.100/"    
})
