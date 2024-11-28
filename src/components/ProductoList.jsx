import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiServiceProduct from "../services/ApiServiceProduct";

const ProductoList = () => {
    const [productos, setProductos] = useState([]); // Estado para almacenar los productos
    const navigate = useNavigate(); // Hook para navegación

    // Obtener los productos desde la API
    useEffect(() => {
        ApiServiceProduct.getAllProductos()
            .then(response => {
                setProductos(response.data); // Almacenar los productos en el estado
            })
            .catch(error => {
                console.error("Error al obtener los productos:", error);
            });
    }, []); // El array vacío asegura que se ejecuta solo al montar el componente

    // Manejar el clic en un producto (navegar al detalle, por ejemplo)
    const handleVerDetalle = (id) => {
        navigate(`/editar-producto/${id}`);
    };

    // Función para eliminar un producto
    const handleEliminar = (id) => {
        ApiServiceProduct.deleteProducto(id)
            .then(() => {
                // Actualiza la lista de productos eliminando el producto que se ha eliminado
                setProductos(productos.filter(producto => producto.id !== id));
            })
            .catch(error => {
                console.error("Error al eliminar el producto:", error);
            });
    };

    // Navegar a la página de agregar producto
    const handleAgregarProducto = () => {
        navigate("/agregar-producto");
    };

    return (
        <div className="container">
            <h1 className="mt-4">Lista de Productos</h1>
            {/* Botón para agregar un nuevo producto */}
            <button className="btn btn-success mb-3" onClick={handleAgregarProducto}>
                Agregar Nuevo Producto
            </button>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? (
                        productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.precio}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleVerDetalle(producto.id)}
                                    >
                                        Ver Detalle
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleEliminar(producto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No hay productos disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductoList;
