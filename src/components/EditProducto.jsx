import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiServiceProduct from "../services/ApiServiceProduct";

const EditProducto = () => {
    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
    });
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const navigate = useNavigate(); // Hook para navegación

    // Obtener los detalles del producto al cargar el componente
    useEffect(() => {
        ApiServiceProduct.getProductoById(id)
            .then((response) => {
                setProducto(response.data); // Almacenar los detalles del producto en el estado
            })
            .catch((error) => {
                console.error("Error al obtener el producto:", error);
            });
    }, [id]); // Se ejecuta cuando el ID cambia

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prevProducto) => ({
            ...prevProducto,
            [name]: value,
        }));
    };

    // Función para guardar los cambios del producto
    const handleGuardar = () => {
        ApiServiceProduct.updateProducto(id, producto)
            .then(() => {
                // Navegar al listado de productos después de guardar
                navigate("/producto-list");
            })
            .catch((error) => {
                console.error("Error al actualizar el producto:", error);
            });
    };

    return (
        <div className="container">
            <h1 className="mt-4">Editar Producto</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                        Descripción
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">
                        Precio
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="precio"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleGuardar}
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditProducto;
