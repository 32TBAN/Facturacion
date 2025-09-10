import React, { useState } from "react";
import Modal from "react-modal";
import { CustomTable } from "#components/CustomTable";

const customStyles: Modal.Styles = {
  content: {
    width: "auto",
    background: "transparent",
    border: "none",
  },
};

// Definimos los tipos de props
interface Column {
  label: string;
  id: string;
}

interface ModalGetClientProps<T extends Record<string, any>> {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  columns: Column[];
  data: T[];
  id: keyof T; // la key que identifica al registro
  handleAdd: (id: T[keyof T]) => void;
}

export function ModalGetClient<T extends Record<string, any>>({
  modalIsOpen,
  setIsOpen,
  title,
  columns,
  data,
  id,
  handleAdd,
}: ModalGetClientProps<T>) {
  const [filterText, setFilterText] = useState("");

  const filteredData =
    data.filter((element) => {
      const dataString = Object.values(element).join(" ").toLowerCase();
      return dataString.includes(filterText.toLowerCase());
    }) || [];

  const columnsCustom: Column[] = [
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
          className="btn btn-success"
          onClick={() => handleAdd(element[id])}
        >
          + Agregar
        </button>
      </div>
    ),
  }));

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="card-body d-flex flex-row justify-content-end">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  aria-label="Search"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </form>
            </div>
            <CustomTable colums={columnsCustom} data={dataCustom} pageNumber={4} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
