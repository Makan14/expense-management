import axios from "axios";

// axios est 1 outils pr appelé ls api
const api = axios.create({
    // je recup le lien dns le fichier d environnement .env avc process.env. et pr éviter de mettre l url de localhost du fichier test.rest (dossier backend)

    baseURL: process.env.NEXT_PUBLIC_API_URL + "api/" 
}); 

// pr exporter ma constante
export default api