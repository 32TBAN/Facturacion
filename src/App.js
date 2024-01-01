import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./commons/navbar";
import axios from "axios";
// import { clientes } from "./constants/clientes";
// import { facturas } from "./constants/facturas";
// import { productos } from "./constants/productos";
import { SaleDescription } from "./SaleDescription";
import { SaleScreen } from "./SaleScreen";
import { UsersScreen } from "./UsersScreen";
import { baseURL } from "./constants/constants";
import { ProductsScreen } from "./ProductsScreen";
import Login from "./login";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";

function App() {
  const [clientes, setClientes] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la animación de carga

  useEffect(() => {
    axios.get(`${baseURL}/Listar`).then((response) => {
      setFacturas(response.data.orden);
      setIsLoading(false); // Indicar que la carga ha finalizado al obtener los datos
    });
    axios.get(`${baseURL}/ListarProductos`).then((response) => {
      setProductos(response.data.producto);
    });
    axios.get(`${baseURL}/ListarUsuarios`).then((response) => {
      setClientes(response.data.usuarios);
    });
  }, []);

  // Si el usuario no está autenticado, mostrar el formulario de inicio de sesión
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(user) => {
          setIsLoggedIn(true);
          setUser(user); // Guardar información del usuario si es necesario
        }}
        clientes={clientes}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} // Configuración de animación inicial
      animate={{ opacity: 1 }} // Configuración de animación al cargar la página
      transition={{ duration: 4 }} // Duración de la animación
    >
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <TailSpin
          type="TailSpin"
          color="#00BFFF"
          height={80}
          width={80}
        />
      </div>
      ) : (
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/venta/:id"
              element={
                <SaleDescription
                  data={facturas}
                  clients={clientes}
                  productos={productos}
                />
              }
            />
            <Route
              path="/venta"
              element={
                <SaleDescription
                  data={facturas}
                  clients={clientes}
                  productos={productos}
                />
              }
            />
            <Route path="/usuarios" element={<UsersScreen data={clientes} />} />
            <Route
              path="/productos"
              element={<ProductsScreen data={productos} />}
            />
            <Route path="/" element={<SaleScreen data={facturas} />} />
          </Routes>
        </div>
      )}
    </motion.div>
  );
}

export default App;
