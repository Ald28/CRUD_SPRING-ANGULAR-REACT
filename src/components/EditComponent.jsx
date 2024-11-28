import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

const EditComponent = () => {
    const { id } = useParams(); // Obtener el ID del cliente desde la URL
    const navigate = useNavigate(); // Para redirigir al listado
    const [formData, setFormData] = useState({ nombre: "", apellidos: "", email: "" });
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    useEffect(() => {
        // Cargar los datos del cliente
        ApiService.getClienteById(id)
            .then(response => {
                setFormData(response.data);
                setLoading(false); // Marcar como cargado
            })
            .catch(error => {
                console.error("Error al cargar los datos del cliente:", error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ApiService.updateCliente(id, formData)
            .then(() => {
                console.log("Cliente actualizado con éxito");
                navigate("/listado"); // Redirigir al listado
            })
            .catch(error => {
                console.error("Error al actualizar el cliente:", error);
            });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Editar Cliente</h3>
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
                            <button type="submit" className="btn btn-success me-2">Guardar Cambios</button>
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

export default EditComponent;
