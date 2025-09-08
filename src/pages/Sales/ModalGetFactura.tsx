import React, { useState } from "react";
import Modal from "react-modal";
import { CustomTable } from "#components/CustomTable";

interface ModalGetFacturaProps {
  modalIsOpen: boolean;
  setIsOpen: (value: boolean) => void;
  columns: { id: string; label: string }[];
  data: any[];
  id: string;
  order: any;
  client: any;
}

const customStyles = {
  content: {
    width: "auto",
    background: "transparent",
    border: "none",
  },
};

export const ModalGetFactura: React.FC<ModalGetFacturaProps> = ({
  modalIsOpen,
  setIsOpen,
  columns,
  data,
  order,
  client,
}) => {
  const [filterText, setFilterText] = useState("");

  const formatDate = (date?: string | number | Date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  // console.log(data)
  const calculateTotal = () => {
    let subtotal = 0;
    let iva = 0;
    data.forEach((detail) => {
      // console.log(detail)
      subtotal += detail.cantidad * detail.precio * 0.88;
      iva += detail.cantidad * detail.precio * 0.12;
    });
    const total = subtotal + iva;
    return { subtotal: subtotal.toFixed(2), total: total.toFixed(2) };
  };

  const filteredData = data.filter((d) =>
    Object.values(d)
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const closeModal = () => setIsOpen(false);
  // console.log(columns)
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Factura #{order?.id || "-"}</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-6">
                <strong>Fecha:</strong> {formatDate(order?.fecha)}
              </div>
              <div className="col-6 text-end">
                <strong>Cliente:</strong> {order?.cliente}
              </div>
            </div>

            <div className="card-body d-flex flex-row justify-content-end">
              <input
                className="form-control w-25"
                type="search"
                placeholder="Buscar"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>

            <CustomTable colums={columns} data={filteredData} pageNumber={4} />

            <div className="row mt-3">
              <div className="col-6 text-end">
                <strong>Subtotal:</strong>
              </div>
              <div className="col-6 text-start">{calculateTotal().subtotal} $</div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                <strong>Total:</strong>
              </div>
              <div className="col-6 text-start">{calculateTotal().total} $ + IVA%</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
