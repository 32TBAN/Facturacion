import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "#utils/auth"; 
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // aquí podrías hacer fetch a tu backend en vez de mock
      if (username.toLowerCase() === "admin" && password === "1234") {
        login({ email: username }); // guardamos usuario en contexto
        navigate("/"); // redirigir a home
      } else {
        setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      setError("Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image"></div>

            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">Iniciar sesión</h3>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleLogin();
                        }}
                      >
                        <div className="form-group mb-3">
                          <input
                            id="inputEmail"
                            type="text"
                            placeholder="Nombre de usuario"
                            required
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            id="inputPassword"
                            type="password"
                            placeholder="Contraseña"
                            required
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        >
                          Iniciar
                        </button>
                      </form>
                      {error && <p className="text-danger">{error}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};