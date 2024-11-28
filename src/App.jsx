import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Inicio from "./views/Inicio";
import Almacen from "./views/Almacen";
import Ventas from "./views/Ventas";
import Compras from "./views/Compras";
import Listado from "./components/ListComponent";
import Editar from "./components/EditComponent"; // Componente para editar
import Agregar from "./components/AddComponent"; // Componente para agregar

const App = () => {
    return (
        <Router>
            <Navigation /> {/* Barra de navegación */}
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/almacen" element={<Almacen />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/compras" element={<Compras />} />
                <Route path="/listado" element={<Listado />} />
                <Route path="/edit/:id" element={<Editar />} /> {/* Ruta para editar */}
                <Route path="/add" element={<Agregar />} /> {/* Ruta para agregar */}
            </Routes>
        </Router>
    );
};

export default App;
