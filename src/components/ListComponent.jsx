import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

const ListComponent = () => {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate(); // Para redirigir

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = () => {
        ApiService.getAllClientes()
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
            ApiService.deleteCliente(id)
                .then(() => {
                    console.log(`Cliente con ID ${id} eliminado`);
                    fetchClientes();
                })
                .catch(error => {
                    console.error("Error al eliminar cliente:", error);
                });
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-primary">Listado de Clientes</h2>
                <button
                    onClick={() => navigate("/add")}
                    className="btn btn-success"
                >
                    Agregar Cliente
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No hay clientes disponibles.
                                </td>
                            </tr>
                        ) : (
                            clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.apellidos}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => navigate(`/edit/${cliente.id}`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(cliente.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListComponent;
