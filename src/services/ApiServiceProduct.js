import axios from "axios";

const API_BASE_URL_PRODUCTO = "http://localhost:8080/api/v2/productos";

class ApiServiceProduct {
    // Obtener todos los productos
    getAllProductos() {
        return axios.get(API_BASE_URL_PRODUCTO);
    }

    // Obtener un producto por ID
    getProductoById(id) {
        return axios.get(`${API_BASE_URL_PRODUCTO}/${id}`);
    }

    // Crear un nuevo producto
    createProducto(data) {
        return axios.post(API_BASE_URL_PRODUCTO, data);
    }

    // Actualizar un producto existente
    updateProducto(id, data) {
        return axios.put(`${API_BASE_URL_PRODUCTO}/${id}`, data);
    }

    // Eliminar un producto
    deleteProducto(id) {
        return axios.delete(`${API_BASE_URL_PRODUCTO}/${id}`);
    }
}

export default new ApiServiceProduct();