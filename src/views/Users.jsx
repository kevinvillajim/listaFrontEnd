import {useEffect, useState} from "react";
import ComplexNavbar from "../components/NavBar";
import TableUsers from "../components/TableUsers";
import api from "../components/api";
import ModalNew from "../components/ModalNew";
import ModalEdit from "../components/ModalEdit";

export default function Users() {
	const [showModalNew, setShowModalNew] = useState(false);
	const [loading, setLoading] = useState(true);
	const [usersData, setUsersData] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [showModalEdit, setShowModalEdit] = useState(false);

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		try {
			const response = await api.get("/users");
			if (response) {
				setUsersData(response.data);
			}
		} catch (error) {
			console.error(
				"Error fetching Users data:",
				error.response?.data || error.message
			);
		} finally {
			setLoading(false);
		}
	}

	const handleCreateUser = async (newUser) => {
		try {
			const response = await api.post("/users", newUser);
			setUsersData([...usersData, response.data]);
			window.location.reload();
		} catch (error) {
			console.error(
				"Error creating user:",
				error.response?.data || error.message
			);
		}
	};

	const handleEditClick = (userId) => {
		setSelectedUser(userId);
		setShowModalEdit(true);
	};

	const handleEditUser = async (id, updatedData) => {
		try {
			const response = await api.put(`/users/${id}`, updatedData);

			setUsersData(
				usersData.map((user) => {
					return parseInt(user.id) === id ? response.data : user;
				})
			);
		} catch (error) {
			console.error(
				"Error updating user:",
				error.response?.data || error.message
			);
		}
	};

	const handleDeleteClick = async (userId) => {
		try {
			await api.delete(`/users/${userId}`);
			window.location.reload();
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	if (loading) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				Cargando...
			</div>
		);
	}
	return (
		<>
			<div>
				<ComplexNavbar avatar="/avatar.png" />
				<div className="p-[1rem] md:p-[3rem]">
					<TableUsers
						title="Usuarios"
						subTitle="Información de los Usuarios"
						btn2="Añadir Usuario"
						headers={["Usuario", "Estado", "Acciones"]}
						data={usersData}
						onClickBtn2={() => setShowModalNew(!showModalNew)}
						handleEditClick={handleEditClick}
						handleDeleteClick={handleDeleteClick}
					/>
				</div>
			</div>
			{showModalNew && (
				<ModalNew
					setShowModalNew={setShowModalNew}
					formObject={[
						{
							name: "name",
							label: "Nombre",
							style: "",
						},
						{
							name: "email",
							label: "Email",
							style: "",
						},
						{
							name: "password",
							label: "Contraseña",
							style: "",
						},
						{
							name: "password_confirmation",
							label: "Repite la Contraseña",
							style: "",
						},
					]}
					api="/users"
					handleCreateUser={handleCreateUser}
				/>
			)}
			{showModalEdit && selectedUser && (
				<ModalEdit
					setShowModalEdit={setShowModalEdit}
					user={selectedUser}
					handleEditUser={handleEditUser}
				/>
			)}
		</>
	);
}
