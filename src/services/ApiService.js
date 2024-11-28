import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/clientes";

class ApiService {
    // Obtener todos los clientes
    getAllClientes() {
        return axios.get(API_BASE_URL);
    }

    // Obtener cliente por ID
    getClienteById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    }

    // Crear un nuevo cliente
    createCliente(data) {
        return axios.post(API_BASE_URL, data);
    }

    // Actualizar un cliente existente
    updateCliente(id, data) {
        return axios.put(`${API_BASE_URL}/${id}`, data);
    }

    // Eliminar un cliente
    deleteCliente(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }
}

export default new ApiService();
