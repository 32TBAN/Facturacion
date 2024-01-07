import React, { useState } from "react";
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
  const validatePassword = (password) => {
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){4,10}$/;
    return passwordRegex.test(password);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar la contraseña antes de agregar el usuario
    if (!validatePassword(password)) {
      alert(
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y tener entre 4 y 10 caracteres."
      );
      return;
    }
    addUser({ email, password, cargo });
    // Limpia los campos después de agregar el usuario
    setEmail("");
    setCargo("");
    setPassword("");
    // Cierra el modal después de agregar el usuario
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Agregar Nuevo Usuario"
    >
      <h2>Agregar Nuevo Usuario</h2>
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
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Usuario
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={closeModal}
        >
          Cancelar
        </button>
      </form>
    </Modal>
  );
};
