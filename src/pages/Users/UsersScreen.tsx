import { userColums } from "#constants/users.tsx";
import { CustomTable } from "#components/CustomTable";
import { AddUserModal } from "./ModalGetNewUser";
import axios from "axios";
import { useAuth } from "#utils/auth";
import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useAxios";
import { mockUsers } from "../../constants/users";

export const UsersScreen = () => {
    const { user } = useAuth();
    const isAdmin = user.role === "Admin";
    const [filterText, setFilterText] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { data, error, isLoading } = useUsers();
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setUsers(data);
        } else if (error || !isLoading) {
            setUsers(mockUsers);
        }
    }, [data, error, isLoading]);

    // console.log(data)
    const filteredData = users == null ? [] :
        users.filter((e: any) => {
            const rowString = Object.values(e).join(" ").toLowerCase();
            return rowString.includes(filterText.toLowerCase());
        }) || [];

    const handleAddUser = () => setModalIsOpen(true);

    const handleCloseModal = () => setModalIsOpen(false);

    const handleAddUserSubmit = async (user: any) => {
        if (!user.email || !user.cargo || !user.password) {
            alert("⚠️ Debe ingresar todos los campos");
            return;
        }

        try {
            const customConfig = {
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.post(
                "http://facturacionapirestcgjl.somee.com/Orden/AñadirUsuario",
                [user],
                customConfig
            );

            console.log("✅ Nuevo usuario agregado:", response.data);

            setUsers((prev: any) => [...prev, user]);
            setModalIsOpen(false);
        } catch (error) {
            console.error("❌ Error al agregar usuario:", error);
            alert("Hubo un error al agregar el usuario.");
        }
    };


    return (
        <div>
            <div className="card m-2">
                <div className="card-body d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <h4>Usuarios</h4>
                        {isAdmin && (
                            <button
                                type="button"
                                className="btn btn-primary mx-3"
                                onClick={handleAddUser}
                            >
                                + Agregar
                            </button>
                        )}
                    </div>
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
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
                <CustomTable colums={userColums} data={filteredData} />
            </div>

            <AddUserModal
                isOpen={modalIsOpen}
                closeModal={handleCloseModal}
                addUser={handleAddUserSubmit}
            />
        </div>
    );
};
