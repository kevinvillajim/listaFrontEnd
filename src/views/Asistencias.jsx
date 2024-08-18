import ComplexNavbar from "../components/NavBar";
import {useEffect, useState} from "react";
import api from "../components/api";

export default function Asistencias() {
	const [attendances, setAttendances] = useState([]);
	const [message, setMessage] = useState("");
	const [activeTab, setActiveTab] = useState("sacramental");
	const [sacramentalAttendance, setSacramentalAttendance] = useState([]);
	const [classAttendance, setClassAttendance] = useState([]);
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

	const today = new Date().toLocaleDateString("es-EC", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const today2 = new Date().toISOString().split("T")[0];

	useEffect(() => {
		getMiembros();
		checkTodayAttendance();
	}, []);

	const getMiembros = async () => {
		try {
			const response = await api.get("/miembros");
			const miembros = response.data.map((miembro) => ({
				id: miembro.id,
				name: miembro.name,
				avatar: miembro.avatar || "/avatar.png",
				attended: false,
				attendedClass: false,
			}));
			setAttendances(miembros);
			setSacramentalAttendance(miembros);
		} catch (error) {
			console.error(error);
		}
	};

	const checkTodayAttendance = async () => {
		try {
			const response = await api.get(`/asistencias/fecha/${today2}`);
			if (response.data && response.data.is_submitted) {
				setIsSubmitDisabled(true);
				setClassAttendance(response.data.records);
			} else if (response.data) {
				// Si existe asistencia pero no está enviada
				setSacramentalAttendance(response.data.records);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleAttendanceChange = (id, type) => {
		const updateAttendance = (prevAttendances) =>
			prevAttendances.map((attendance) =>
				attendance.id === id
					? {...attendance, [type]: !attendance[type]}
					: attendance
			);

		if (activeTab === "sacramental") {
			setSacramentalAttendance(updateAttendance);
		} else {
			setClassAttendance(updateAttendance);
		}
	};

	const saveAttendance = async () => {
		const attendanceData = {
			date: today2,
			records: sacramentalAttendance,
		};

		try {
			const response = await api.post("/asistencias", attendanceData);
			console.log(response.data);
			setMessage("Asistencias guardadas exitosamente");
			setIsSubmitDisabled(true);
			setClassAttendance(sacramentalAttendance.filter((a) => a.attended));
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setMessage(error.response.data.message);
				setIsSubmitDisabled(true);
			} else {
				setMessage("Ocurrió un error al guardar la asistencia");
			}
		}
	};

	const saveClassAttendance = async () => {
		try {
			const response = await api.get(`/asistencias/fecha/${today2}`);
			console.log(response.data);
			if (response.data) {
				const asistenciaId = response.data.id;
				const updatePromises = classAttendance.map((attendance) =>
					api.put(`asistencias/miembro/${attendance.id}/${asistenciaId}`, {
						attendedClass: attendance.attendedClass,
					})
				);
				await Promise.all(updatePromises);
				setMessage("Asistencia a clases guardada exitosamente");
			} else {
				setMessage("No se encontró la asistencia sacramental para hoy");
			}
		} catch (error) {
			setMessage(
				error.response?.data?.message ||
					"Ocurrió un error al guardar la asistencia a clases"
			);
		}
	};

	const renderAttendanceList = (attendanceList, type) => (
		<div className="grid gap-4">
			{attendanceList.map((attendance) => (
				<div
					key={attendance.id}
					className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
				>
					<div className="flex items-center">
						<img
							src={attendance.avatar || "/avatar.png"}
							alt={attendance.name}
							className="w-12 h-12 rounded-full mr-4"
						/>
						<span className="text-lg font-medium">{attendance.name}</span>
					</div>
					<input
						type="checkbox"
						checked={
							type === "attended"
								? attendance.attended
								: attendance.attendedClass
						}
						onChange={() => handleAttendanceChange(attendance.id, type)}
						className="w-6 h-6 text-blue-600 focus:ring-blue-500"
					/>
				</div>
			))}
		</div>
	);

	return (
		<>
			<ComplexNavbar avatar="/avatar.png" />
			<div className="p-4 md:py-[8rem] md:px-[15rem]">
				<h2 className="text-lg font-medium text-gray-600 mb-2">
					Fecha: {today}
				</h2>
				<h1 className="text-2xl font-bold mb-4">Lista de Asistencia</h1>

				<div className="mb-4">
					<button
						className={`mr-2 px-4 py-2 rounded-md ${
							activeTab === "sacramental"
								? "bg-blue-600 text-white"
								: "bg-gray-200"
						}`}
						onClick={() => setActiveTab("sacramental")}
					>
						Sacramental
					</button>
					<button
						className={`px-4 py-2 rounded-md ${
							activeTab === "clases" ? "bg-blue-600 text-white" : "bg-gray-200"
						}`}
						onClick={() => setActiveTab("clases")}
					>
						Clases
					</button>
				</div>

				{activeTab === "sacramental" ? (
					<>
						{renderAttendanceList(sacramentalAttendance, "attended")}
						<p className="my-[1rem]">{message}</p>
						<button
							onClick={saveAttendance}
							className={`mt-4 w-full py-2 rounded-lg ${
								isSubmitDisabled
									? "bg-gray-400 cursor-not-allowed"
									: "bg-blue-600 text-white"
							}`}
							disabled={isSubmitDisabled}
						>
							Guardar Asistencia Sacramental
						</button>
					</>
				) : (
					<>
						{renderAttendanceList(classAttendance, "attendedClass")}
						<p className="my-[1rem]">{message}</p>
						<button
							onClick={saveClassAttendance}
							className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
						>
							Guardar Asistencia a Clases
						</button>
					</>
				)}
			</div>
		</>
	);
}
