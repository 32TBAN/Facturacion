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

export const AddClientModal = ({ isOpen, closeModal, addClient }) => {
  const [cédula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dirección, setDireccion] = useState("");
  const [teléfono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías llamar a una función para agregar el nuevo cliente
    console.log(cédula,nombre,apellido,dirección,teléfono)
    addClient({ cédula, nombre, apellido, dirección, teléfono });
    // Limpia los campos después de agregar el cliente
    setCedula("");
    setNombre("");
    setApellido("");
    setDireccion("");
    setTelefono("");
    // Cierra el modal después de agregar el cliente
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Agregar Nuevo Cliente"
    >
      <h2>Agregar Nuevo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cedula" className="form-label">
            Cédula
          </label>
          <input
            type="text"
            className="form-control"
            id="cedula"
            value={cédula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={dirección}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="teléfono" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            id="teléfono"
            value={teléfono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Cliente
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
