import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { clientesColumns } from "./constants/clientes";
import { baseURL } from "./constants/constants";
import { facturasColumns, productosFacturaColumns } from "./constants/facturas";
import { productosColumns } from "./constants/productos";
import { CustomTable } from "./CustomTable";
import { ModalGetClient } from "./ModalGetClient";
import { ModalGetProduct } from "./ModalGetProduct";
import {
  calcTotal,
  calcTotalProductos,
  generateOrder,
  getObjectById,
} from "./utils";

export const SaleDescription = ({ data, clients, productos, dataUser }) => {
  const params = useParams(); //usa los parametros del query

  const [currentFactura, setCurrentFactura] = React.useState(
    //inicia variables con un id de la factura
    params?.id
      ? getObjectById(data, "iD_Orden", params?.id)
      : generateOrder(data,dataUser)
  );

  const [currentCliente, setCurrentCliente] = React.useState(
    getObjectById(clients, "id", currentFactura?.iD_Cliente)
  );

  // console.log(currentCliente)
  const [modalClientIsOpen, setModalClientIsOpen] = React.useState(false);
  const [modalProdIsOpen, setModalProdIsOpen] = React.useState(false);

  //console.log(params?.id);
  const [total, setTotal] = React.useState(
    calcTotal(currentFactura?.articulos)
  );

  const [totalProductos, setTotalProductos] = React.useState(
    calcTotalProductos(currentFactura.articulos)
  );

  //console.log(currentFactura.articulos)
  React.useEffect(() => {
    setTotal(calcTotal(currentFactura?.articulos));
  });

  /*     const [total, setTotal] = React.useState(
    calcTotal(currentFactura?.articulos)
  ); */

  React.useState(() => {
    if (currentFactura.articulos) {
      calcTotalProductos(currentFactura?.articulos);
    }
  }, [currentFactura.articulos]);
  const subtotal = total * 0.88;
  const iva = total * 0.12;
  useEffect(() => {
    setCurrentFactura({
      ...currentFactura,
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
    });
  }, [total]);

  //console.log(currentFactura.articulos);
  const productosFactura = currentFactura.articulos.map((element, index) => ({
    iD_Producto: element.iD_Producto,
    codigo: element.iD_Producto,
    nombre: element.descripcion,
    existencia: element.existencia,
    cantidad: (
      <div className="d-flex justify-content-center">
        <input
          type="number"
          class="form-control small-input"
          value={element.cantidad}
          onChange={(e) =>
            !isNaN(e.target.value) &&
            handleCantidadChange(parseInt(e.target.value), index)
          }
        />
      </div>
    ),
    precio: element.precio,
    precioTotal: (element.precio * element.cantidad).toFixed(1),
    acciones: (
      <div>
        <button
          type="button"
          class="btn btn btn btn btn-danger"
          onClick={() => handleRemoveProduct(index)}
        >
          Eliminar
        </button>
      </div>
    ),
  }));

  const handleAddProduct = (id) => {
    const producto = getObjectById(productos, "iD_Producto", id);
    const articulos = currentFactura?.articulos || [];

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
    //console.log(calcTotal(articulos))
    setTotalProductos(calcTotalProductos(articulos));
    setModalProdIsOpen(false);
    //console.log(articulos);
    // console.log(productos)
  };

  // * añade al cliente
  const handleAddClient = (id) => {
    const cliente = getObjectById(clients, "cédula", id);
    setCurrentCliente(cliente);
    setCurrentFactura({ ...currentFactura, cedulaCliente: cliente?.cédula });
    setModalClientIsOpen(false);
    currentFactura.iD_Cliente = cliente.id;
    console.log(currentCliente);
  };

  // * Elimina un producto de las lista de articulos
  const handleRemoveProduct = (index) => {
    const articulos = currentFactura?.articulos || [];
    articulos.splice(index, 1);
    setCurrentFactura({ ...currentFactura, articulos });
    setTotal(calcTotal(articulos));
    setTotalProductos(calcTotalProductos(articulos));
  };

  // * cambia la cantidad de los productos
  const handleCantidadChange = (value, index) => {
    let valToUpdate = value;
    if (isNaN(valToUpdate)) {
      valToUpdate = 0;
      return;
    }
    const articulos = currentFactura?.articulos || [];
    if (valToUpdate > parseInt(articulos[index].existenciaFixed)) {
      alert("No hay suficientes productos en existencia");
      return;
    }
    if (valToUpdate <= 0) {
      alert("Debe escoger al menos un producto");
      return;
    }
    articulos[index].existencia =
      parseInt(articulos[index].existenciaFixed) - valToUpdate;
    articulos[index].cantidad = isNaN(valToUpdate) ? 0 : valToUpdate;
    articulos[index].precioTotal = (
      articulos[index].cantidad * articulos[index].precio
    ).toFixed(2);
    // const total = articulos[index].existencia + articulos[index].cantidad
    setCurrentFactura({ ...currentFactura, articulos });
    setTotal(calcTotal(articulos));
    setTotalProductos(calcTotalProductos(articulos));
  };

  // * Envia los datos de facturacion
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
    if (!currentFactura.cedulaCliente) {
      alert("Debe agregar un cliente");
      return;
    }
    console.log(dataUser)
    const dataToSend = JSON.stringify({
      iD_Orden: currentFactura.iD_Orden,
      fecha: currentFactura.fecha,
      iD_Cliente: currentCliente.id,
      iD_Usuario: dataUser.iD_Usuario,
      subtotal: subtotal,
      total: total,
    });

    console.log(dataToSend);
    axios
      .post(`${baseURL}/Guardar`, dataToSend, customConfig)
      .then((response) => {
        console.log(`Se ha guardado la orden ${currentFactura.iD_Orden}`);
      })
      .catch((error) => {
        console.log(`Error al guardar la orden: ${error}`);
      });

    // Crear un array para almacenar todos los detalles a enviar
    const detailsToSend = [];

    // Construir el array de detalles a enviar
    for (let index = 0; index < currentFactura.articulos.length; index++) {
      const detail = {
        iD_Orden: currentFactura.iD_Orden,
        iD_Producto: currentFactura.articulos[index].iD_Producto,
        cantidad: currentFactura.articulos[index].cantidad,
        precio_Total: currentFactura.articulos[index].precioTotal,
      };
      detailsToSend.push(detail);
    }

    //console.log(detailsToSend);
    // Enviar todos los detalles a la vez usando Promise.all()
    axios
      .post(`${baseURL}/GuardarDetalle`, detailsToSend, customConfig)
      .then((response) => {
        window.location.href = "/";
      })
      .catch(() => {
        console.log(`Error al agregar los productos`);
      });
  };

/*   const formattedDate = format(new Date(currentFactura.fecha), "dd MMM yyyy");
  const formattedTime = new Date(currentFactura.fecha).toLocaleTimeString(
    undefined,
    {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
  );

  const formattedDateTime = `${formattedDate} ${formattedTime}`; */

  return (
    <>
      <div>
        <div class="card m-2">
          <div class="card-body d-flex flex-row justify-content-between">
            <div className="order-container d-flex align-items-center border rounded p-3">
              <h4 className="order-title mb-0 me-3">Órden de venta</h4>
              <p className="order-date mb-0">{currentFactura?.fecha}</p>
            </div>
            <div className="d-flex flex-row">
              <button
                type="button"
                class="btn btn-primary mx-3 d-flex"
                onClick={handleSave}
              >
                {params?.id ? "Editar" : "+ Agregar"}
              </button>
            </div>
          </div>
        </div>
        <div class="card m-2 p-3">
          <div className="card m-4 p-3 bg-light">
            <div className="d-flex flex-row justify-content-between">
              <h5>Datos del Cliente &nbsp;</h5>
              <button
                type="button"
                class="btn btn-success"
                onClick={() => setModalClientIsOpen(true)}
              >
                + Agregar Cliente
              </button>
            </div>
            <div>
              <div>
                <div class="row">
                  <div class="col">
                    <label>Cédula</label>
                    <div>
                      <input
                        type="text"
                        class="form-control plaintext"
                        value={currentCliente?.cédula}
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col">
                    <label>Nombre</label>
                    <div>
                      <input
                        type="text"
                        class="form-control plaintext"
                        value={currentCliente?.nombre}
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col">
                    <label>Teléfono</label>
                    <div>
                      <input
                        type="text"
                        class="form-control plaintext"
                        value={currentCliente?.teléfono}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-4">
                    <label>Dirección</label>
                    <div>
                      <input
                        type="text"
                        class="form-control plaintext"
                        value={currentCliente?.dirección}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mx-4 p-3 bg-light">
            <div className="d-flex flex-row justify-content-between">
              <h5>Productos de la factura &nbsp;</h5>
              <button
                type="button"
                class="btn btn-success"
                onClick={() => setModalProdIsOpen(true)}
              >
                + Agregar Producto
              </button>
            </div>
            <CustomTable
              colums={productosFacturaColumns}
              data={productosFactura}
            />
            <table class="table table-info table-hover mt-4">
              <thead>
                <tr>
                  <th scope="col">Código de la Factura</th>
                  <th scope="col">Articulos totales</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">SubTotal  - 12% Descuento</th>
                  <th scope="col">IVA</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">{currentFactura?.iD_Orden}</td>
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
        title={"Agregar Producto"}
        columns={clientesColumns}
        data={clients}
        id={"cédula"}
        handleAdd={handleAddClient}
      />
    </>
  );
};
