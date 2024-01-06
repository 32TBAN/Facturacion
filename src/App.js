import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./commons/navbar";
import axios from "axios";
import { SaleDescription } from "./SaleDescription";
import { SaleScreen } from "./SaleScreen";
import { UsersScreen } from "./UsersScreen";
import { baseURL } from "./constants/constants";
import { ProductsScreen } from "./ProductsScreen";
import Login from "./login";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";
import { ClientScreen } from "./ClientScreen";

function App() {
  const [users, setUsers] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la animación de carga

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restaurar los datos del usuario
      setIsLoggedIn(true); // Establecer el estado de autenticación como verdadero
    }
    setIsLoading(false);

    axios.get(`${baseURL}/Listar`).then((response) => {
      setFacturas(response.data.orden);
      setIsLoading(false); // Indicar que la carga ha finalizado al obtener los datos
    });
    axios.get(`${baseURL}/ListarProductos`).then((response) => {
      setProductos(response.data.producto);
    });
    axios.get(`${baseURL}/ListarUsuarios`).then((response) => {
      setUsers(response.data.usuarios);
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < facturas.length; i++) {
      let detalle = async () => {
        const response = await axios.get(
          `${baseURL}/ListarDetalleOrden?id=${facturas[i]?.iD_Orden}`
        );
        facturas[i].articulos = response.data.detalle.map((detalle) => {
          detalle.precio = detalle.precio_Total;
          for (let i = 0; i < productos.length; i++) {
            if (detalle.iD_Producto == productos[i].iD_Producto) {
              detalle.descripcion = productos[i].nombre;
              detalle.existencia = productos[i].stock;
              detalle.existenciaFixed = productos[i].stock;
            }
          }
          return detalle;
        });
      };
      detalle();
    }
  });
  //console.log(facturas)
  // Si el usuario no está autenticado, mostrar el formulario de inicio de sesión
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(user) => {//Todo 
          setIsLoggedIn(true);
          setUser(user); // Guardar información del usuario si es necesario
          // Guardar información del usuario en localStorage
          localStorage.setItem("user", JSON.stringify(user));
        }}
        users={users}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} // Configuración de animación inicial
      animate={{ opacity: 1 }} // Configuración de animación al cargar la página
      transition={{ duration: 1 }} // Duración de la animación
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TailSpin type="TailSpin" color="#00BFFF" height={80} width={80} />
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
                  clients={users}
                  productos={productos}
                  dataUser={user}
                />
              }
            />
            <Route
              path="/venta"
              element={
                <SaleDescription
                  data={facturas}
                  clients={users}
                  productos={productos}
                  dataUser={user}
                />
              }
            />
            <Route
              path="/usuarios"
              element={<UsersScreen data={users} dataUser={user} />} 
            />
            <Route
              path="/productos"
              element={<ProductsScreen data={productos} dataUser={user} />}
            />
            <Route
              path="/clientes"
              element={<ClientScreen data={users} dataUser={user} />}
            />
            <Route
              path="/"
              element={<SaleScreen data={facturas} dataUser={user} />}//TODO: agregar los permisos
            />
          </Routes>
        </div>
      )}
    </motion.div>
  );
}

export default App;
