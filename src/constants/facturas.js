export const facturas = [
    {
        id: 1,
        numeroFactura: 1,
        fecha: '2021-05-10',
        cliente: 'Mark delfigalo',
        cedulaCliente: '1805102055',
        vendedor: 'ADMIN',
        estado: 'Pendiente',
        subtotal: 260.47,
        iva: 20.00,
        total: 280.47,
        articulos: [
            {
                id: 1,
                codigo: 1,
                descripcion: 'Samsung A20',
                existencia: 80,
                cantidad: 40,
                precio: 260.47,
                precioTotal: 4212.47,
            },
        ],
    },
]

export const facturasColumns = [
    {
        id: 'iD_Orden',
        label: 'Numero de Factura',
    },
    {
        id: 'fecha',
        label: 'Fecha',
    },
    {
        id: 'iD_Cliente',
        label: 'Cliente',
    },
    {
        id: 'total',
        label: 'Total',
    },
    {
        id: 'acciones',
        label: 'Acciones',
    },
];

export const productosFacturaColumns = [
    {
        id: 'iD_Producto',
        label: 'Código',
    },
    {
        id: 'nombre',
        label: 'Descripción',
    },
    {
        id: 'existencia',
        label: 'Existencia',
    },
    {
        id: 'cantidad',
        label: 'Cantidad',
    },
    {
        id: 'precio',
        label: 'Precio',
    },
    {
        id: 'precioTotal',
        label: 'Precio Total',
    },
    {
        id: 'acciones',
        label: 'Acciones',
    }
];

