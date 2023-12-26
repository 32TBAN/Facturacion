import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link to="/" className='navbar-brand'>SISTEMA DE FACTURACIÓN</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link to="/" className="nav-link active">Órdenes de venta</Link>
        </li>
        <li class="nav-item">
          <Link to="/usuarios" class="nav-link" href="#">Usuarios</Link>
        </li>
        <li class="nav-item">
          <Link to="/productos" class="nav-link" href="#">Productos</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar;
