import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { facturasColumns } from "./constants/facturas";
import { CustomTable } from "./CustomTable";

export const SaleScreen = ({ data, dataUser }) => {
  const isAdmin = dataUser.cargo === "admin";
  const [filterText, setFilterText] = React.useState("");
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/Venta/${id}`);
  };

  const handleAdd = () => {
    navigate(`/Venta`);
  };

  const handleDelete = (id) => {
    const customConfig = {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    axios
      .delete(
        `http://facturacionapirestcgjl.somee.com/Orden/Eliminar?id=${id}`,
        customConfig
      )
      .then((response) => {
        console.log("Se ha eliminado");
        window.location.href = "/";
      })
      .catch(() => {
        console.log("Error al eliminar");
      });
  };

  const filteredFacturas =
    data.filter((factura) => {
      const facturaString = Object.values(factura).join(" ").toLowerCase();
      return facturaString.includes(filterText.toLowerCase());
    }) || [];

  const dataCustom = filteredFacturas.map((factura) => ({
    ...factura,
    acciones: (
      <div>
        {isAdmin && (
          <button
            type="button"
            class="btn btn btn-warning me-2"
            onClick={() => handleEdit(factura.iD_Orden)}
          >
            Editar
          </button>
        )}
        {isAdmin && (
          <button
            type="button"
            class="btn btn btn-danger"
            onClick={() => handleDelete(factura.iD_Orden)}
          >
            Eliminar
          </button>
        )}
        <button
          type="button"
          className="btn btn-success me-3 rounded-pill shadow-sm"
        >
          Ver
        </button> 
      </div>
    ),
  }));

  return (
    <div>
      <div class="card m-2">
        <div class="card-body d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <h4>Órdenes de venta</h4>
            <button
              type="button"
              class="btn btn-primary mx-3"
              onClick={handleAdd}
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
        <CustomTable colums={facturasColumns} data={dataCustom} />
      </div>
    </div>
  );
};
