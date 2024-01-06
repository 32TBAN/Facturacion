import React from 'react'
import { clientesColumns } from './constants/clientes';
import { CustomTable } from './CustomTable';
import axios from "axios";
import { AddClientModal } from './ModalGetNewClinet'; 

export const ClientScreen = ({data}) => {
  const [filterText, setFilterText] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const filteredData = data.filter((element) => {
    const facturaString = Object.values(element).join(" ").toLowerCase();
    return facturaString.includes(filterText.toLowerCase());
}) || [];

const handleAddClient = () => {
  setModalIsOpen(true); // Abre el modal al hacer clic en el botón "Agregar"
};

const handleCloseModal = () => {
  setModalIsOpen(false); // Cierra el modal
};

const handleAddClientSubmit = (clientData) => {
  const response = async (clientData) => {
    const customConfig = {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      "http://facturacionapirestcgjl.somee.com/Orden/AñadirCliente",
      [clientData],
      customConfig
    );
    window.location.reload();
    console.log("Nuevo cliente agregado:", clientData);
    setModalIsOpen(false);
  };
  response(clientData);
};

  return (
    <div>
      <div class="card m-2">
        <div class="card-body d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <h4>Clientes</h4>
              <button
                type="button"
                className="btn btn-primary mx-3"
                onClick={() => handleAddClient()}
              >
                + Agregar
              </button>
          </div>
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
      </div>
      <div className="card m-2 p-3">
        <CustomTable colums={clientesColumns} data={filteredData} />
      </div>
      <AddClientModal
        isOpen={modalIsOpen}
        closeModal={handleCloseModal}
        addClient={handleAddClientSubmit}
      />
    </div>
  );
}
