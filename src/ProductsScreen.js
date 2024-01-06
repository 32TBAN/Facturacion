import React from "react";
import { productosColumns } from "./constants/productos";
import { CustomTable } from "./CustomTable";
import axios from "axios";
import { AddProductModal } from "./ModalGetNewProducto";

export const ProductsScreen = ({ data, dataUser }) => {
  const isAdmin = dataUser.cargo === "Admin";
  const [filterText, setFilterText] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const filteredData =
    data.filter((element) => {
      const facturaString = Object.values(element).join(" ").toLowerCase();
      return facturaString.includes(filterText.toLowerCase());
    }) || [];

  const handleAddProducts = () => {
    setModalIsOpen(true); // Abre el modal al hacer clic en el botón "Agregar"
  };

  const handleCloseModal = () => {
    setModalIsOpen(false); // Cierra el modal
  };

  const handleAddProductSubmit = (productoData) => {
    const response = async (productoData) => {

      console.log(productoData)
      const customConfig = {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "http://facturacionapirestcgjl.somee.com/Orden/AñadirProducto",
        [productoData],
        customConfig
      );
      window.location.reload();
      console.log("Nuevo producto agregado:", productoData);
      setModalIsOpen(false);
    };
    response(productoData);
  };

  return (
    <div>
      <div class="card m-2">
        <div class="card-body d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <h4>Productos</h4>
            {isAdmin && ( // Mostrar el botón solo si el usuario es admin
              <button
                type="button"
                className="btn btn-primary mx-3"
                onClick={() => handleAddProducts()}
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
        <CustomTable colums={productosColumns} data={filteredData} />
      </div>
      <AddProductModal
        isOpen={modalIsOpen}
        closeModal={handleCloseModal}
        addProduct={handleAddProductSubmit}
      />
    </div>
  );
};
