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

export const ModalGetProduct = ({
  modalIsOpen,
  setIsOpen,
  title,
  columns,
  data,
  id,
  handleAdd,
  currentFactura,
}) => {
  const [filterText, setFilterText] = React.useState("");
  const facturaProductosIds = currentFactura.articulos.map((element) => element['codigo']);
  const filteredData =
    data.filter((element) => {
      const dataString = Object.values(element).join(" ").toLowerCase();
      return dataString.includes(filterText.toLowerCase()) && !facturaProductosIds.includes(element['codigo']);
    }) || [];

  const columnsCustom = [
    ...columns,
    {
      label: "Acciones",
      id: "acciones",
    },
  ];

  const dataCustom = filteredData.map((element) => ({
    ...element,
    acciones: (
      <div>
        <button
          type="button"
          class="btn btn btn btn-success"
          onClick={() => handleAdd(element[id])}
        >
          + Agregar
        </button>
      </div>
    ),
  }));

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              onClick={closeModal}
            ></button>
          </div>
          <div class="modal-body">
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
            <CustomTable
              colums={columnsCustom}
              data={dataCustom}
              pageNumber={4}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
