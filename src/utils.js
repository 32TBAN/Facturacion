export const getObjectById = (objects, key, id) => {
    return objects.find((object) => {
        return String(object[key]) === String(id)
    });
};

export const calcTotal = (productos) => {
    return productos.reduce((acc, producto) => {
      return acc + producto.precio * producto.cantidad;
    }, 0);
  };
  
 export const calcTotalProductos = (productos) => {
    return productos.reduce((acc, producto) => {
      return acc + producto.cantidad;
    }, 0);
  };

const getMaxId = (objects) => {
    return objects.reduce((acc, object) => {
      return acc > object.numeroFactura ? acc : object.numeroFactura;
    }, 0);
  };

  export const generateOrder = (data) => {
    const today = new Date().toISOString().slice(0, 10);
    const currentId = getMaxId(data) + 1;
    return {
      "iD_Orden": currentId,
      "fecha": today,
      "iD_Cliente": "",
      "vendedor": "ADMIN",
      "estado": "Pagado",
      "subtotal": 0,
      "iva": 0,
      "total": 0,
      "articulos": [
      ]
  }
  };