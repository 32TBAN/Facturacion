import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { facturasColumns } from "./constants/facturas";
import { CustomTable } from "./CustomTable";
import { ModalGetFactura } from "./ModalGetFactura";
import { productosColumns2 } from "./constants/productos";

export const SaleScreen = ({ data, dataUser, clients }) => {
  const isAdmin = dataUser.cargo === "Admin";
  const [filterText, setFilterText] = React.useState("");
  const navigate = useNavigate();
  const [modalFacIsOpen, setModalFacIsOpen] = React.useState(false);
  const [productos, setProductos] = React.useState([]);
  const [client, setClient] = React.useState({});
  const [orden, setOrden] = React.useState({});
  //console.log(data);

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
        `http://facturacionapirestcgjl.somee.com/Orden/EliminarOrdenVenta?id=${id}`,
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

  const handleShow = (id) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].iD_Orden == id) {
        setOrden(data[i]);
        setProductos(data[i].articulos);
        for (let j = 0; j < clients.length; j++) {
          if (data[i].iD_Cliente == clients[j].id) {
            setClient(clients[j]);
            setModalFacIsOpen(true);
            break;
          }
        }
        break;
      }
    }
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
{/*         {isAdmin && (
          <button
            type="button"
            class="btn btn btn-warning me-2"
            onClick={() => handleEdit(factura.iD_Orden)}
          >
            Editar
          </button>
        )} */}
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
          className="btn btn-success m-2 shadow-sm"
          onClick={() => handleShow(factura.iD_Orden)}
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
      <ModalGetFactura
        modalIsOpen={modalFacIsOpen}
        setIsOpen={setModalFacIsOpen}
        columns={productosColumns2}
        data={productos}
        id={"iD_Producto"}
        order={orden}
        client={client}
      />
    </div>
  );
};
