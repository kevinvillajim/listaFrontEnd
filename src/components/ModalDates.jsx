import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import api from "./api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ModalDates({setShowModalDates, id}) {
	const [dates, setDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());

	function formatDate(date) {
		return new Date(date).toLocaleDateString("es-EC", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});
	}

	useEffect(() => {
		fetchAttendanceById(id);
	}, [id]);

	const fetchAttendanceById = async (id) => {
		try {
			const attendanceResponse = await api.get(`asistencias/miembro/${id}`);
			setDates(attendanceResponse.data);
		} catch (error) {
			console.error(
				"Error fetching attendance data for member ID:",
				id,
				error.response?.data || error.message
			);
		}
	};

	const tileClassName = ({date, view}) => {
		if (view === "month") {
			// Formatear la fecha del tile actual
			const dateStr = formatDate(date);
			const matchingDate = dates.find(
				(d) => formatDate(new Date(d.date)) === dateStr
			);

			if (matchingDate) {
				// Devuelve una clase según las condiciones de asistencia
				if (matchingDate.attended && matchingDate.attendedClass) {
					return "highlight-both";
				} else if (matchingDate.attended) {
					return "highlight-sacramental";
				} else if (matchingDate.attendedClass) {
					return "highlight-class";
				}
			}
		}
		return null;
	};

	return (
		<>
			<div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
				<div className="md:w-[30%] bg-white px-[2rem] py-[2rem] rounded-lg relative">
					<div className="w-[100%] text-end">
						<span
							className="material-symbols-outlined cursor-pointer"
							onClick={() => {
								setShowModalDates(false);
							}}
						>
							close
						</span>
					</div>
					<div className="h-[100%] w-[100%] flex justify-center items-center">
						<Calendar
							onChange={setSelectedDate}
							value={selectedDate}
							tileClassName={tileClassName}
						/>
					</div>
				</div>
			</div>
			<style>
				{`
		/* Día con asistencia a sacramental */
		.highlight-sacramental {
			background: linear-gradient(#000 50%, #000);
			color: white;
            border-radius: 20%;
		}

		/* Día con asistencia a clase */
		.highlight-class {
			background: linear-gradient(transparent 50%, #1e90ff 50%);
			color: white;
            border-radius: 20%;
		}

		/* Día con asistencia a sacramental y clase */
		.highlight-both {
			background: linear-gradient(45deg, #000 50%, #1e90ff 50%);
			color: white;
            border-radius: 20%;
		}
	`}
			</style>
		</>
	);
}

ModalDates.propTypes = {
	setShowModalDates: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
};
