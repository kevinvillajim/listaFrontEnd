import ComplexNavbar from "../components/NavBar";
import {useState} from "react";
export default function Asistencias() {
	// Simulación de datos obtenidos del backend
	const today = new Date().toLocaleDateString("es-EC", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const today2 = new Date().toLocaleDateString("es-EC", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	});

	const [attendances, setAttendances] = useState([
		{
			id: 1,
			name: "Juan Perez",
			img: "/avatar.png",
			attended: false,
		},
		{
			id: 2,
			name: "Pedro Perez",
			img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
			attended: true,
		},
	]);

	// Manejar el cambio de asistencia
	const handleAttendanceChange = (id) => {
		setAttendances((prevAttendances) =>
			prevAttendances.map((attendance) =>
				attendance.id === id
					? {...attendance, attended: !attendance.attended}
					: attendance
			)
		);
	};

	// Guardar las asistencias en el backend (simulación)
	const saveAttendance = () => {
		const attendanceData = {
			date: today2,
			records: attendances,
		};

		console.log("Asistencias guardadas", attendanceData);
		// Aquí harías la llamada al backend para guardar los datos
	};

	return (
		<>
			<ComplexNavbar avatar="/avatar.png" />
			<div className="p-4 md:py-[8rem] md:px-[15rem]">
				{/* Mostrar la fecha actual */}
				<h2 className="text-lg font-medium text-gray-600 mb-2">
					Fecha: {today}
				</h2>
				<h1 className="text-2xl font-bold mb-4">Lista de Asistencia</h1>
				<div className="grid gap-4">
					{attendances.map((attendance) => (
						<div
							key={attendance.id}
							className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
						>
							<div className="flex items-center">
								<img
									src={attendance.img}
									alt={attendance.name}
									className="w-12 h-12 rounded-full mr-4"
								/>
								<span className="text-lg font-medium">{attendance.name}</span>
							</div>
							<input
								type="checkbox"
								checked={attendance.attended}
								onChange={() => handleAttendanceChange(attendance.id)}
								className="w-6 h-6 text-blue-600 focus:ring-blue-500"
							/>
						</div>
					))}
				</div>
				<button
					onClick={saveAttendance}
					className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
				>
					Guardar Asistencia
				</button>
			</div>
		</>
	);
}
