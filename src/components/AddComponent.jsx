import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

const AddComponent = () => {
    const navigate = useNavigate(); // Para redirigir al listado
    const [formData, setFormData] = useState({ nombre: "", apellidos: "", email: "" }); // Estado del formulario

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ApiService.createCliente(formData)
            .then(() => {
                console.log("Cliente creado con éxito");
                navigate("/listado"); // Redirigir al listado después de guardar
            })
            .catch(error => {
                console.error("Error al crear cliente:", error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h3 className="mb-0">Agregar Nuevo Cliente</h3>
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
                            <button type="submit" className="btn btn-success me-2">Guardar</button>
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

export default AddComponent;
