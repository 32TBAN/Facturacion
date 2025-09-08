import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { facturasColumns, mockFacturas } from "#constants/facturas";
import { productosColumns2  } from "#constants/productos";
import { CustomTable } from "#components/CustomTable";
import { ModalGetFactura } from "./ModalGetFactura";
import { useAuth } from "#utils/auth";
import useAxios from "#hooks/useAxios";
import { mockClientes } from "#constants/clientes"
import { useCustomers } from "../../hooks/useAxios";

export const SaleScreen = () => {
    const { user } = useAuth();
    const isAdmin = user?.cargo === "Admin";
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState("");
    const [modalFacIsOpen, setModalFacIsOpen] = useState(false);
    const [orden, setOrden] = useState<any>({});
    const [productos, setProductos] = useState<any[]>([]);
    const { data: dataClients, isLoading: isCLients, error: errorClients } = useCustomers() 
    const [clients, setClients] = useState<any>([])
    const [client, setClient] = useState<any>({});

    useEffect(() => {
        if (dataClients && dataClients.length > 0) {
            setClients(dataClients);
        } else if (errorClients || !isCLients) {
            setClients(mockClientes);
        }
    }, [dataClients, errorClients, isCLients]);

    const { data, error, isLoading } = useAxios("");

    const facturas: any[] = useMemo(() => {
        if (Array.isArray(data)) return data;
        if (data?.orden && Array.isArray(data.orden)) return data.orden;
        // console.log(mockFacturas)
        return mockFacturas;
    }, [data]);

    const handleEdit = (id: number) => navigate(`/Venta/${id}`);
    const handleAdd = () => navigate(`/Venta`);

    const handleDelete = async (id: number) => {
        try {
            const config = { headers: { Accept: "*/*", "Content-Type": "application/json" } };
            await axios.delete(`http://facturacionapirestcgjl.somee.com/Orden/EliminarOrdenVenta?id=${id}`, config);
            window.location.reload();
        } catch {
            console.log("Error al eliminar");
        }
    };

    const handleShow = (id: number) => {
        const fac = facturas.find((f) => f.iD_Orden === id);
        if (!fac) return;
        setOrden(fac);
        let articulos =  fac.articulos.map((a : any) =>({
            ...a,
            total: (a.precioTotal - (a.precioTotal * 0.12)).toFixed(2)
        }))
        console.log(articulos)
        setProductos(articulos|| []);
        const cli = clients.find((c: any) => c.id === fac.iD_Cliente);
        if (cli) setClient(cli);
        setModalFacIsOpen(true);
    };

    const filteredFacturas = Array.isArray(facturas)
        ? facturas.filter((f) => Object.values(f).join(" ").toLowerCase().includes(filterText.toLowerCase()))
        : [];

    const dataCustom = filteredFacturas.map((factura) => ({
        ...factura,
        acciones: (
            <div>
                {isAdmin && (
                    <button className="btn btn-danger me-2" onClick={() => handleDelete(factura.iD_Orden)}>
                        Eliminar
                    </button>
                )}
                <button className="btn btn-success m-2" onClick={() => handleShow(factura.iD_Orden)}>
                    Ver
                </button>
            </div>
        ),
    }));

    return (
        <div>
            <div className="card m-2">
                <div className="card-body d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <h4>Órdenes de venta</h4>
                        <button className="btn btn-primary mx-3" onClick={handleAdd}>
                            + Agregar
                        </button>
                    </div>
                    <input
                        className="form-control w-25"
                        type="search"
                        placeholder="Buscar"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
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
                id="iD_Producto"
                order={orden}
                client={client}
            />
        </div>
    );
};
