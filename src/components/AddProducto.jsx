import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiServiceProduct from "../services/ApiServiceProduct";

const AgregarProducto = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const navigate = useNavigate();

    // Función para manejar el envío del formulario y agregar el producto
    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoProducto = {
            nombre,
            descripcion,
            precio: parseFloat(precio),
        };

        ApiServiceProduct.createProducto(nuevoProducto)
            .then((response) => {
                // Redirigir al listado de productos después de agregar el producto
                navigate("/producto-list");
            })
            .catch((error) => {
                console.error("Error al agregar el producto:", error);
            });
    };

    return (
        <div className="container">
            <h1 className="mt-4">Agregar Nuevo Producto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Guardar Producto
                </button>
            </form>
        </div>
    );
};

export default AgregarProducto;
