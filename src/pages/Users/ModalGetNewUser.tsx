import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
  },
};

export const AddUserModal = ({ isOpen, closeModal, addUser }) => {
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Modal.setAppElement("#root"); // recomendado para accesibilidad
  }, []);

  const validatePassword = (password: string) => {
    // Al menos: 1 minúscula, 1 mayúscula, 1 número, 1 carácter especial, longitud 4-10
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){4,10}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "⚠️ La contraseña debe tener mayúscula, minúscula, número, caracter especial y 4-10 caracteres."
      );
      return;
    }

    addUser({ email, password, cargo });

    // Reset form
    setEmail("");
    setCargo("");
    setPassword("");
    setError("");

    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Agregar Nuevo Usuario"
    >
      <h4 className="mb-3">Agregar Nuevo Usuario</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cargo" className="form-label">
            Cargo
          </label>
          <select
            className="form-select"
            id="cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          >
            <option value="">Seleccionar Cargo</option>
            <option value="Admin">Admin</option>
            <option value="Ninguno">Ninguno</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${error ? "is-invalid" : ""}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!email || !cargo || !password}
          >
            Agregar Usuario
          </button>
        </div>
      </form>
    </Modal>
  );
};
