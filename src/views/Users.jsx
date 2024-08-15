import ComplexNavbar from "../components/NavBar";
import TableUsers from "../components/TableUsers";
export default function Users() {
	return (
		<>
			<ComplexNavbar avatar="/avatar.png" />
			<div className="p-[1rem] md:p-[3rem]">
				<TableUsers
					title="Usuarios"
					subTitle="Información de los Usuarios"
					btn2="Añadir Usuario"
					tableData={{
						headers: ["Usuario", "Estado", "Acciones"],
						data: [
							{
								name: "Kevin Perez",
								img: "/avatar.png",
								email: "kevinvillajim@hotmail.com",
								active: true,
							},
							{
								name: "Juano Perez",
								img: "/avatar.png",
								email: "test@test",
								active: true,
							},
						],
					}}
				/>
			</div>
		</>
	);
}
