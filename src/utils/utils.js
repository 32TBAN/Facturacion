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
  //console.log(objects)
    return objects.reduce((acc, object) => {
      return acc > object.iD_Orden ? acc : object.iD_Orden;
    }, 0);
  };

  export const generateOrder = (data,dataUser) => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const formattedTime = today.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const dateTime = `${formattedDate} ${formattedTime}`;
    const currentId = getMaxId(data) + 1;
    return {
      "iD_Orden": currentId,
      "fecha": dateTime,
      "iD_Cliente": "",
      "iD_Usuario": dataUser.id,
      "subtotal": 0,
      "total": 0,
      "articulos": [
      ]
  }
  };