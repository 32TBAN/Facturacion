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

function App() {
  const [clientes, setClientes] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/Listar`).then((response) => {
      setFacturas(response.data.orden);
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
  );
}

export default App;
