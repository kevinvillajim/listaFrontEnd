import ComplexNavbar from "../components/NavBar";
import Table from "../components/Table";
export default function Miembros() {
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
					tableData={{
						headers: [
							"Miembro",
							"Llamamiento",
							"Estado",
							"Ultima Asistencia",
							"Acciones",
						],
						data: [
							{
								name: "Juan Perez",
								img: "/avatar.png",
								phone: "+593963368896",
								calling: "Obispo",
								organization: "Obispado",
								active: true,
								lastAttendance: "Hoy",
							},
							{
								name: "Pedro Perez",
								img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
								phone: "+593963368896",
								calling: "",
								organization: "",
								active: false,
								lastAttendance: "12/03/2020",
							},
						],
					}}
				/>
			</div>
		</>
	);
}
