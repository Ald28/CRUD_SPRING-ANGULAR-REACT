import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../services/ApiService"; // Servicio de API para clientes

const ClienteForm = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        email: "",
    });
    const { id } = useParams(); // Obtener el ID del cliente desde la URL
    const navigate = useNavigate(); // Para redirigir al listado

    // Si hay un ID, obtener los datos del cliente para editar
    useEffect(() => {
        if (id) {
            ApiService.getClienteById(id) // Método para obtener cliente por ID
                .then((response) => {
                    console.log("Cliente obtenido:", response.data);
                    setFormData(response.data); // Llenar el formulario con los datos del cliente
                })
                .catch((error) => {
                    console.error("Error al obtener el cliente:", error);
                });
        }
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Manejar el envío del formulario (crear o actualizar)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            // Actualizar cliente existente
            ApiService.updateCliente(id, formData)
                .then(() => {
                    console.log("Cliente actualizado con éxito");
                    navigate("/listado"); // Redirigir al listado
                })
                .catch((error) => {
                    console.error("Error al actualizar cliente:", error);
                });
        } else {
            // Crear nuevo cliente
            ApiService.createCliente(formData)
                .then(() => {
                    console.log("Cliente creado con éxito");
                    navigate("/listado"); // Redirigir al listado
                })
                .catch((error) => {
                    console.error("Error al crear cliente:", error);
                });
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h3 className="mb-0">
                        {id ? "Editar Cliente" : "Agregar Nuevo Cliente"}
                    </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className="form-control"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellidos" className="form-label">Apellidos:</label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                className="form-control"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success me-2">
                                {id ? "Guardar Cambios" : "Guardar"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => navigate("/listado")}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClienteForm;
