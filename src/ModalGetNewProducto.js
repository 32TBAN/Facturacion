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

export const AddProductModal = ({ isOpen, closeModal, addProduct }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ nombre, descripcion, precio, stock });
    setNombre("");
    setDescripcion("");
    setPrecio(0);
    setStock(0);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Agregar Nuevo Producto"
    >
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Producto
        </button>
        <button type="button" className="btn btn-danger ms-2" onClick={closeModal}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
};
