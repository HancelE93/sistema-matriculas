import axios from "axios";

const API = "http://localhost:8080/estudiantes";

export const listarEstudiantes = async () => {
    return await axios.get(API);
};

export const crearEstudiante = async (estudiante) => {
    return await axios.post(API, estudiante);
};