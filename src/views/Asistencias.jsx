import ComplexNavbar from "../components/NavBar";
import {useEffect, useState} from "react";
import api from "../components/api";
export default function Asistencias() {
	const [attendances, setAttendances] = useState([]);
	const [message, setMessage] = useState("");

	const today = new Date().toLocaleDateString("es-EC", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const today2 = new Date().toISOString().split("T")[0];

	useEffect(() => {
		getMiembros();
	}, []);

	const getMiembros = async () => {
		try {
			const response = await api.get("/miembros");
			setAttendances(
				response.data.map((miembro) => ({
					id: miembro.id,
					name: miembro.name,
					avatar: miembro.avatar || "/avatar.png",
					attended: false,
				}))
			);
		} catch (error) {
			console.error(error);
		}
	};
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
	const saveAttendance = async () => {
		const attendanceData = {
			date: today2,
			records: attendances,
		};

		try {
			const response = await api.post("/asistencias", attendanceData);
			setMessage("Asistencias guardadas", response);
		} catch (error) {
			setMessage(error);
		}
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
				{attendances.length > 0 ? (
					<>
						<div className="grid gap-4">
							{attendances.map((attendance) => (
								<div
									key={attendance.id}
									className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
								>
									<div className="flex items-center">
										<img
											src={attendance.avatar}
											alt={attendance.name}
											className="w-12 h-12 rounded-full mr-4"
										/>
										<span className="text-lg font-medium">
											{attendance.name}
										</span>
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
						<p className="my-[1rem]">{message}</p>
						<button
							onClick={saveAttendance}
							className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
						>
							Guardar Asistencia
						</button>
					</>
				) : (
					<div className="text-[20px]">
						No exiten Miembros, Agrégalos desde la pestaña Miembros
					</div>
				)}
			</div>
		</>
	);
}
