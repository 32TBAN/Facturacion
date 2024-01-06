import React from "react";
import { userColums } from "./constants/users";
import { CustomTable } from "./CustomTable";
import { AddUserModal } from "./ModalGetNewUser";
import axios from "axios";

export const UsersScreen = ({ data, dataUser }) => {
  const isAdmin = dataUser.cargo === "Admin";
  const [filterText, setFilterText] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const filteredData =
    data.filter((element) => {
      const facturaString = Object.values(element).join(" ").toLowerCase();
      return facturaString.includes(filterText.toLowerCase());
    }) || [];

  const handleAddUser = () => {
    setModalIsOpen(true); // Abre el modal al hacer clic en el botón "Agregar"
  };

  const handleCloseModal = () => {
    setModalIsOpen(false); // Cierra el modal
  };

  const handleAddUserSubmit = (userData) => {
    const response = async (userData) => {

      const customConfig = {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      if (!userData.email || !userData.cargo || !userData.password) {
        alert("Error debe ingresar todos los campos");
        return;
      }
      await axios.post('http://facturacionapirestcgjl.somee.com/Orden/AñadirUsuario',[userData], customConfig)
      window.location.reload();
      console.log("Nuevo usuario agregado:", userData);
      setModalIsOpen(false);
    }
    response(userData)
  };

  return (
    <div>
      <div class="card m-2">
        <div class="card-body d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <h4>Usuarios</h4>
            {isAdmin && (
              <button
                type="button"
                className="btn btn-primary mx-3"
                onClick={() => handleAddUser()}
              >
                + Agregar
              </button>
            )}
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
        <CustomTable colums={userColums} data={filteredData} />
      </div>
      <AddUserModal
        isOpen={modalIsOpen}
        closeModal={handleCloseModal}
        addUser={handleAddUserSubmit}
      />
    </div>
  );
};
