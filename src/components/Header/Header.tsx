import { Link } from "react-router-dom"

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    SISTEMA DE FACTURACIÓN
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">
                                Órdenes de venta
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/usuarios" className="nav-link">
                                Usuarios
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/productos" className="nav-link">
                                Productos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/clientes" className="nav-link">
                                Clientes
                            </Link>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <button className="btn btn-outline-danger" onClick={() => { }}>Cerrar sesión</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}