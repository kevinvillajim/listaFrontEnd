import {useState, useEffect} from "react";
import {Bar, Pie, Line} from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	LineElement,
	PointElement,
} from "chart.js";
import ComplexNavbar from "../components/NavBar";

// Registra los componentes necesarios para Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	LineElement,
	PointElement
);

export default function Dashboard() {
	// Estado para almacenar los datos del dashboard
	const [attendanceData, setAttendanceData] = useState([]);
	const [activeMembers, setActiveMembers] = useState([]);
	const [inactiveMembers, setInactiveMembers] = useState([]);

	// Obtener los datos al montar el componente
	useEffect(() => {
		// Aquí harías las llamadas al backend para obtener los datos
		// Simulación de datos
		const fetchData = async () => {
			// Datos simulados
			setAttendanceData([
				{date: "01/08/2024", attended: 30, total: 40},
				{date: "08/08/2024", attended: 35, total: 40},
				{date: "15/08/2024", attended: 28, total: 40},
				{date: "22/08/2024", attended: 40, total: 40},
			]);
			setActiveMembers([
				{name: "Juan Perez", attendance: 15},
				{name: "Pedro Perez", attendance: 10},
			]);
			setInactiveMembers([
				{name: "Maria Lopez", attendance: 5},
				{name: "Luis Gomez", attendance: 2},
			]);
		};
		fetchData();
	}, []);

	// Datos para gráficos
	const attendanceChartData = {
		labels: attendanceData.map((d) => d.date),
		datasets: [
			{
				label: "Asistencias",
				data: attendanceData.map((d) => d.attended),
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
				type: "bar",
			},
			{
				label: "Total",
				data: attendanceData.map((d) => d.total),
				backgroundColor: "rgba(153, 102, 255, 0.2)",
				borderColor: "rgba(153, 102, 255, 1)",
				borderWidth: 1,
				type: "bar",
			},
		],
	};

	const activeMembersData = {
		labels: activeMembers.map((m) => m.name),
		datasets: [
			{
				label: "Miembros Activos",
				data: activeMembers.map((m) => m.attendance),
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1,
			},
		],
	};

	const inactiveMembersData = {
		labels: inactiveMembers.map((m) => m.name),
		datasets: [
			{
				label: "Miembros Menos Activos",
				data: inactiveMembers.map((m) => m.attendance),
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	};

	const lineChartData = {
		labels: attendanceData.map((d) => d.date),
		datasets: [
			{
				label: "Asistencia Semanal",
				data: attendanceData.map((d) => d.attended),
				fill: false,
				borderColor: "rgba(75, 192, 192, 1)",
				tension: 0.1,
			},
		],
	};

	return (
		<>
			<ComplexNavbar avatar="/avatar.png" />
			<div className="p-4 md:p-6">
				<h1 className="text-3xl font-bold mb-6">Dashboard de Asistencia</h1>
				<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{/* Gráfico de Línea de Asistencia Semanal */}
					<div className="bg-white p-4 rounded-lg shadow-md col-span-1 lg:col-span-2">
						<h2 className="text-xl font-semibold mb-4">
							Tendencia de Asistencia Semanal
						</h2>
						<div className="w-full h-80">
							<Line
								data={lineChartData}
								options={{
									responsive: true,
									plugins: {
										legend: {position: "top"},
										tooltip: {
											callbacks: {
												label: (context) =>
													`${context.dataset.label}: ${context.raw}`,
											},
										},
									},
									maintainAspectRatio: false,
								}}
							/>
						</div>
					</div>

					{/* Gráfico de Asistencias */}
					<div className="bg-white p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-4">
							Progreso de Asistencias
						</h2>
						<div className="w-full h-80">
							<Bar
								data={attendanceChartData}
								options={{
									responsive: true,
									plugins: {
										legend: {position: "top"},
										tooltip: {
											callbacks: {
												label: (context) =>
													`${context.dataset.label}: ${context.raw}`,
											},
										},
									},
								}}
							/>
						</div>
					</div>

					{/* Gráfico de Miembros Activos */}
					<div className="bg-white p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-4">Miembros Activos</h2>
						<div className="w-full h-80">
							<Pie
								data={activeMembersData}
								options={{
									responsive: true,
									plugins: {
										legend: {position: "top"},
										tooltip: {
											callbacks: {
												label: (context) => `${context.label}: ${context.raw}`,
											},
										},
									},
								}}
							/>
						</div>
					</div>

					{/* Gráfico de Miembros Menos Activos */}
					<div className="bg-white p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-4">
							Miembros Menos Activos
						</h2>
						<div className="w-full h-80">
							<Pie
								data={inactiveMembersData}
								options={{
									responsive: true,
									plugins: {
										legend: {position: "top"},
										tooltip: {
											callbacks: {
												label: (context) => `${context.label}: ${context.raw}`,
											},
										},
									},
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
