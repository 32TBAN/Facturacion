import React from "react";

export const Requests = () => {
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* AQUI UN TEXTBOX Y UN BOTON PARA BUSCAR */}
            <div class="input-group">
              <div class="form-outline">
                <input type="search" id="form1" class="form-control" />
                &nbsp;
              <button type="button" class="btn btn-primary">
                Buscar
              </button>
              </div>
             
            </div>
            {/* AQUI LA TABLA */}
            <div>
            {/* PONER LOS CAMPOS QUE CORRESPONDAN */}
            <table class="table table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">Número de Cliente</th>
                <th scope="col">Cedula</th>
                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Direccion</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>1805102055</td>
                <td>Mark delfigalo</td>
                <td>099983843</td>
                <td>Quito y sucre</td>
                <td>
                    <button type="button" class="btn btn-warning">Editar</button> &nbsp;
                    <button type="button" class="btn btn-danger">Eliminar</button>
                </td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>1805103945</td>
                <td>Jose Perez</td>
                <td>099989489</td>
                <td>12 noviembre y Cevallos</td>
                <td>
                    <button type="button" class="btn btn-warning">Editar</button> &nbsp;
                    <button type="button" class="btn btn-danger">Eliminar</button>
                </td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>1805103953</td>
                <td>Pedro Parker</td>
                <td>099983456</td>
                <td>7 Tratados</td>
                <td>
                    <button type="button" class="btn btn-warning">Editar</button> &nbsp;
                    <button type="button" class="btn btn-danger">Eliminar</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
            
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
