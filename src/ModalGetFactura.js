import React from "react";
import Modal from "react-modal";
import { CustomTable } from "./CustomTable";

const customStyles = {
  content: {
    width: "auto",
    background: "transparent",
    border: "none",
  },
};

export const ModalGetFactura = ({
  modalIsOpen,
  setIsOpen,
  columns,
  data,
  id,
  order,
  client,
}) => {
  const [filterText, setFilterText] = React.useState("");

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  };

  const calculateTotal = () => {
    let subtotal = 0;
    data.forEach((detail) => {
      subtotal += detail.cantidad * detail.precio;
    });

    // Considerando un impuesto del 12% y un descuento del 20%
    const total = subtotal * 0.12 * 0.8 + subtotal;
    return {
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
    };
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"> Factura #{order.iD_Orden}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              onClick={closeModal}
            ></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-6">
                <strong>Fecha:</strong> {formatDate(order.fecha)}
              </div>
              <div class="col-6 text-end">
                <strong>Cliente:</strong> {client.nombre} {client.apellido}
              </div>
            </div>
            <div class="card-body d-flex flex-row justify-content-end">
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </form>
            </div>
            <CustomTable colums={columns} data={data} pageNumber={4} />
            <div class="row mt-3">
              <div class="col-6 text-end">
                <strong>Subtotal:</strong>
              </div>
              <div class="col-6 text-start">{calculateTotal().subtotal} $</div>
            </div>
            <div class="row">
              <div class="col-6 text-end">
                <strong>Total:</strong>
              </div>
              <div class="col-6 text-start">{calculateTotal().total} $ + iva%</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
