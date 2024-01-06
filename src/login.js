import React, { useState } from "react";
import { motion } from "framer-motion";

const Login = ({ onLogin, users }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    try {
      let usuarioEncontrado = null;
      console.log(users)
      for (const usuario of users) {
        if (
          usuario.email.toLowerCase() === username.toLowerCase()  &&
          usuario.password === password 
        ) {
          usuarioEncontrado = usuario;
          break;
        }
      }

      if (usuarioEncontrado) {
        onLogin(usuarioEncontrado); // Llama a la función onLogin pasada como prop desde App.js
      } else {
        setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      setError(
        "Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Establece la posición inicial y la opacidad
      animate={{ opacity: 1, y: 0 }} // Anima hacia la posición final y la opacidad
      transition={{ duration: 1 }} // Duración de la animación
    >
        <div className="maincontainer">
          <div class="container-fluid">
            <div class="row no-gutter">
              <div class="col-md-6 d-none d-md-flex bg-image"></div>

              <div class="col-md-6 bg-light">
                <div class="login d-flex align-items-center py-5">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-10 col-xl-7 mx-auto">
                        <h3 class="display-4">Iniciar sesión</h3>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                          }}
                        >
                          <div class="form-group mb-3">
                            <input
                              id="inputEmail"
                              type="text"
                              placeholder="Nombre de usuario"
                              required=""
                              class="form-control rounded-pill border-0 shadow-sm px-4"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          <div class="form-group mb-3">
                            <input
                              id="inputPassword"
                              type="password"
                              placeholder="Contraseña"
                              required=""
                              class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          <button
                            type="submit"
                            class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                          >
                            Iniciar
                          </button>
                        </form>
                        {error && <p>{error}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
    /*      <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div>
          <label>Usuario</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>  */
  );
};

export default Login;
