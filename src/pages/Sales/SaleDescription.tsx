import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { clientesColumns } from "#constants/clientes.tsx";
import { baseUrl } from "#constants/urlBase";
import { facturasColumns, productosFacturaColumns } from "#constants/facturas";
import { productosColumns } from "#constants/productos";

import { CustomTable } from "#components/CustomTable";

import {
  calcTotal,
  calcTotalProductos,
  generateOrder,
  getObjectById,
} from "#utils/utils";

import { ModalGetClient } from "../Customers/ModalGetClient";
import { ModalGetProduct } from "../Product/ModalGetProduct";

// Tipos mínimos para tus props
interface Producto {
  iD_Producto: number;
  nombre: string;
  stock: number;
  precio: number;
  descripcion?: string;
  cantidad?: number;
  existencia?: number;
  existenciaFixed?: number;
  precioTotal?: number | string;
}

interface Cliente {
  id: number;
  cédula: string;
  nombre: string;
  teléfono: string;
  dirección: string;
}

interface Factura {
  iD_Orden: number;
  fecha: string;
  iD_Cliente?: number;
  iD_Usuario?: number;
  subtotal?: number | string;
  total?: number | string;
  cedulaCliente?: string;
  articulos: Producto[];
}

interface SaleDescriptionProps {
  data: Factura[];
  clients: Cliente[];
  productos: Producto[];
  dataUser: { iD_Usuario: number };
}

export default function SaleDescription ({
  data = [],
  clients= [],
  productos= [],
  dataUser = 0
}){
  const params = useParams<{ id: string }>();

  const [currentFactura, setCurrentFactura] = useState<Factura>(
    params?.id
      ? (getObjectById(data, "iD_Orden", params?.id) as Factura)
      : generateOrder(data, dataUser)
  );

  const [currentCliente, setCurrentCliente] = useState<Cliente | undefined>(
    getObjectById(clients, "id", currentFactura?.iD_Cliente)
  );

  const [modalClientIsOpen, setModalClientIsOpen] = useState(false);
  const [modalProdIsOpen, setModalProdIsOpen] = useState(false);

  const [total, setTotal] = useState<number>(
    calcTotal(currentFactura?.articulos)
  );
  const [totalProductos, setTotalProductos] = useState<number>(
    calcTotalProductos(currentFactura.articulos)
  );

  useEffect(() => {
    setTotal(calcTotal(currentFactura?.articulos));
  }, [currentFactura?.articulos]);

  useEffect(() => {
    if (currentFactura.articulos) {
      setTotalProductos(calcTotalProductos(currentFactura.articulos));
    }
  }, [currentFactura.articulos]);

  const subtotal = total * 0.88;
  const iva = total * 0.12;
  const totalBasic = total;

  useEffect(() => {
    setCurrentFactura((prev) => ({
      ...prev,
      subtotal: subtotal.toFixed(2),
      total: totalBasic.toFixed(2),
    }));
  }, [total]);

  // Generamos tabla de productos de la factura
  const productosFactura = currentFactura.articulos.map((element, index) => ({
    iD_Producto: element.iD_Producto,
    codigo: element.iD_Producto,
    nombre: element.descripcion,
    existencia: element.existencia,
    cantidad: (
      <div className="d-flex justify-content-center">
        <input
          type="number"
          className="form-control small-input"
          value={element.cantidad}
          onChange={(e) =>
            !isNaN(Number(e.target.value)) &&
            handleCantidadChange(parseInt(e.target.value), index)
          }
        />
      </div>
    ),
    precio: element.precio,
    precioTotal: (element.precio * (element.cantidad ?? 0)).toFixed(1),
    acciones: (
      <div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleRemoveProduct(index)}
        >
          Eliminar
        </button>
      </div>
    ),
  }));

  const handleAddProduct = (id: number) => {
    const producto = getObjectById(productos, "iD_Producto", id) as Producto;
    if (!producto) return;

    const articulos = [...(currentFactura?.articulos || [])];
    articulos.push({
      ...producto,
      existencia: producto?.stock - 1,
      cantidad: 1,
      precioTotal: producto?.precio,
      existenciaFixed: producto?.stock,
      descripcion: producto?.nombre,
    });

    setCurrentFactura({
      ...currentFactura,
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      articulos,
    });

    setTotal(calcTotal(articulos));
    setTotalProductos(calcTotalProductos(articulos));
    setModalProdIsOpen(false);
  };

  const handleAddClient = (id: string) => {
    const cliente = getObjectById(clients, "cédula", id) as Cliente;
    if (!cliente) return;

    setCurrentCliente(cliente);
    setCurrentFactura({
      ...currentFactura,
      cedulaCliente: cliente?.cédula,
      iD_Cliente: cliente.id,
    });
    setModalClientIsOpen(false);
  };

  const handleRemoveProduct = (index: number) => {
    const articulos = [...(currentFactura?.articulos || [])];
    articulos.splice(index, 1);
    setCurrentFactura({ ...currentFactura, articulos });
    setTotal(calcTotal(articulos));
    setTotalProductos(calcTotalProductos(articulos));
  };

  const handleCantidadChange = (value: number, index: number) => {
    if (isNaN(value)) return;

    const articulos = [...(currentFactura?.articulos || [])];
    if (value > (articulos[index].existenciaFixed ?? 0)) {
      alert("No hay suficientes productos en existencia");
      return;
    }
    if (value <= 0) {
      alert("Debe escoger al menos un producto");
      return;
    }

    articulos[index].existencia =
      (articulos[index].existenciaFixed ?? 0) - value;
    articulos[index].cantidad = value;
    articulos[index].precioTotal = (
      value * articulos[index].precio
    ).toFixed(2);

    setCurrentFactura({ ...currentFactura, articulos });
    setTotal(calcTotal(articulos));
    setTotalProductos(calcTotalProductos(articulos));
  };

  const handleSave = () => {
    const customConfig = {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    };

    if (currentFactura.articulos.length === 0) {
      alert("Debe agregar al menos un producto");
      return;
    }
    if (!currentFactura.cedulaCliente && !params?.id) {
      alert("Debe agregar un cliente");
      return;
    }

    const dataToSend = JSON.stringify({
      iD_Orden: currentFactura.iD_Orden,
      fecha: currentFactura.fecha,
      iD_Cliente: currentCliente?.id,
      iD_Usuario: dataUser.iD_Usuario,
      subtotal: totalBasic,
      total: totalBasic,
    });

    axios
      .post(`${baseURL}/Guardar`, dataToSend, customConfig)
      .then(() => {
        console.log(`Se ha guardado la orden ${currentFactura.iD_Orden}`);
      })
      .catch((error) => {
        console.log(`Error al guardar la orden: ${error}`);
      });

    const detailsToSend = currentFactura.articulos.map((a) => ({
      iD_Orden: currentFactura.iD_Orden,
      iD_Producto: a.iD_Producto,
      cantidad: a.cantidad,
    }));

    axios
      .post(`${baseURL}/GuardarDetalle`, detailsToSend, customConfig)
      .then(() => {
        console.log("Se han guardado los detalles");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(`Error al agregar los productos ${error}`);
      });
  };

  return (
    <>
      <div>
        <div className="card m-2">
          <div className="card-body d-flex flex-row justify-content-between">
            <div className="order-container d-flex align-items-center border rounded p-3">
              <h4 className="order-title mb-0 me-3">Órden de venta</h4>
              <p className="order-date mb-0">{currentFactura?.fecha}</p>
            </div>
            <div className="d-flex flex-row">
              <button
                type="button"
                className="btn btn-primary mx-3 d-flex"
                onClick={handleSave}
              >
                {params?.id ? "Editar" : "+ Agregar"}
              </button>
            </div>
          </div>
        </div>

        {/* Cliente */}
        <div className="card m-2 p-3">
          <div className="card m-4 p-3 bg-light">
            <div className="d-flex flex-row justify-content-between">
              <h5>Datos del Cliente &nbsp;</h5>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setModalClientIsOpen(true)}
              >
                + Agregar Cliente
              </button>
            </div>
            <div className="row mt-3">
              <div className="col">
                <label>Cédula</label>
                <input
                  type="text"
                  className="form-control plaintext"
                  value={currentCliente?.cédula ?? ""}
                  disabled
                />
              </div>
              <div className="col">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control plaintext"
                  value={currentCliente?.nombre ?? ""}
                  disabled
                />
              </div>
              <div className="col">
                <label>Teléfono</label>
                <input
                  type="text"
                  className="form-control plaintext"
                  value={currentCliente?.teléfono ?? ""}
                  disabled
                />
              </div>
              <div className="col-4 mt-3">
                <label>Dirección</label>
                <input
                  type="text"
                  className="form-control plaintext"
                  value={currentCliente?.dirección ?? ""}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="card mx-4 p-3 bg-light">
            <div className="d-flex flex-row justify-content-between">
              <h5>Productos de la factura &nbsp;</h5>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setModalProdIsOpen(true)}
              >
                + Agregar Producto
              </button>
            </div>
            <CustomTable
              colums={productosFacturaColumns}
              data={productosFactura}
            />
            <table className="table table-info table-hover mt-4">
              <thead>
                <tr>
                  <th scope="col">Código de la Factura</th>
                  <th scope="col">Artículos totales</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">SubTotal - 12% Descuento</th>
                  <th scope="col">IVA</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{currentFactura?.iD_Orden}</td>
                  <td>{totalProductos}</td>
                  <td>{currentFactura?.fecha}</td>
                  <td>{subtotal.toFixed(2)}</td>
                  <td>{iva.toFixed(2)}</td>
                  <td>{total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalGetProduct
        modalIsOpen={modalProdIsOpen}
        setIsOpen={setModalProdIsOpen}
        title={"Agregar Producto"}
        columns={productosColumns}
        data={productos}
        id={"iD_Producto"}
        currentFactura={currentFactura}
        handleAdd={handleAddProduct}
      />
      <ModalGetClient
        modalIsOpen={modalClientIsOpen}
        setIsOpen={setModalClientIsOpen}
        title={"Agregar Cliente"}
        columns={clientesColumns}
        data={clients}
        id={"cédula"}
        handleAdd={handleAddClient}
      />
    </>
  );
};
