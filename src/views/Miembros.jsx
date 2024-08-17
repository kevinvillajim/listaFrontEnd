import {useEffect, useState} from "react";
import ComplexNavbar from "../components/NavBar";
import Table from "../components/Table";
import api from "../components/api";
import ModalNew from "../components/ModalNew";
import ModalEditMiembro from "../components/ModalEditMiembro";
import ModalWhatsapp from "../components/ModalWhatsapp";

export default function Miembros() {
	const [showModalNew, setShowModalNew] = useState(false);
	const [loading, setLoading] = useState(true);
	const [miembrosData, setMiembrosData] = useState([]);
	const [selectedMiembro, setSelectedMiembro] = useState(null);
	const [memberReceiver, setMemberReceiver] = useState(null);
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showWhatsappModal, setShowWhatsappModal] = useState(false);

	useEffect(() => {
		fetchMiembros();
	}, []);

	async function fetchMiembros() {
		try {
			const response = await api.get("/miembros");
			if (response) {
				setMiembrosData(response.data);
			}
		} catch (error) {
			console.error(
				"Error fetching Miembros data:",
				error.response?.data || error.message
			);
		} finally {
			setLoading(false);
		}
	}

	const handleCreateMiembro = async (newMiembro) => {
		try {
			const response = await api.post("/miembros", newMiembro);
			setMiembrosData([...miembrosData, response.data]);
			window.location.reload();
		} catch (error) {
			console.error(
				"Error creating miembro:",
				error.response?.data || error.message
			);
		}
	};

	const handleEditClick = (miembroId) => {
		setSelectedMiembro(miembroId);
		setShowModalEdit(true);
	};

	const handleWhastappModal = (phone, name) => {
		setShowWhatsappModal(true);
		setMemberReceiver({phone: phone, name: name});
	};

	const handleEditMiembro = async (id, updatedData) => {
		try {
			const response = await api.put(`/miembros/${id}`, updatedData);

			setMiembrosData(
				miembrosData.map((miembro) => {
					return parseInt(miembro.id) === id ? response.data : miembro;
				})
			);
		} catch (error) {
			console.error(
				"Error updating miembro:",
				error.response?.data || error.message
			);
		}
	};

	const handleDeleteClick = async (miembroId) => {
		try {
			await api.delete(`/miembros/${miembroId}`);
			window.location.reload();
		} catch (error) {
			console.error("Error deleting miembro:", error);
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
			<ComplexNavbar avatar="/avatar.png" />
			<div className="p-[1rem] md:p-[3rem]">
				<Table
					title="Miembros"
					subTitle="Información de los miembros"
					btn1="Añadir CSV"
					btn2="Añadir Miembro"
					option1="Todos"
					option2="Activos"
					option3="Menos Activos"
					headers={[
						"Miembro",
						"Llamamiento",
						"Estado",
						"Ultima Asistencia",
						"Acciones",
					]}
					data={miembrosData}
					onClickBtn2={() => setShowModalNew(!showModalNew)}
					handleEditClick={handleEditClick}
					handleDeleteClick={handleDeleteClick}
					handleWhastappModal={handleWhastappModal}
				/>
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
							name: "phone",
							label: "Teléfono",
							style: "",
						},
						{
							name: "calling",
							label: "Llamamiento",
							style: "",
						},
						{
							name: "organization",
							label: "Organización",
							style: "",
						},
					]}
					api="/miembros"
					handleCreateUser={handleCreateMiembro}
				/>
			)}
			{showModalEdit && selectedMiembro && (
				<ModalEditMiembro
					setShowModalEdit={setShowModalEdit}
					user={selectedMiembro}
					handleEditUser={handleEditMiembro}
					formObject={[
						{
							name: "name",
							label: "Nombre",
							style: "",
						},
						{
							name: "phone",
							label: "Teléfono",
							style: "",
						},
						{
							name: "calling",
							label: "Llamamiento",
							style: "",
						},
						{
							name: "organization",
							label: "Organización",
							style: "",
						},
					]}
				/>
			)}
			{showWhatsappModal && (
				<ModalWhatsapp
					setShowModal={setShowWhatsappModal}
					memberReceiver={memberReceiver}
				/>
			)}
		</>
	);
}
