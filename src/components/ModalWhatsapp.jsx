import {useEffect, useState} from "react";
import api from "./api";

export default function ModalWhatsapp({setShowModal, memberReceiver}) {
	const [messages, setMessages] = useState([]);
	const [selectedMessage, setSelectedMessage] = useState("");
	const [indexMessage, setIndexMessage] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchMessages();
	}, []);

	const fetchMessages = async () => {
		try {
			const response = await api.get("/messages");
			if (response) {
				setMessages(response.data);
			}
		} catch (error) {
			console.error(
				"Error fetching messages data:",
				error.response?.data || error.message
			);
		} finally {
			setLoading(false);
		}
	};

	const handleSendWhatsapp = (phone, name, message) => {
		//Numero de telefono
		if (!phone) {
			alert("El miembro no tiene un número de teléfono registrado");
			return;
		}
		if (phone.length < 9) {
			alert("El número de teléfono es incorrecto");
			return;
		}
		const number = phone.includes("+593") ? phone : "+593" + phone;
		console.log(selectedMessage);
		//Mensaje
		if (!message) {
			alert("Por favor, selecciona un mensaje");
			return;
		}
		const personalizedMessage = message.replace("{{name}}", name);
		const messageWhatsapp = encodeURIComponent(personalizedMessage);
		console.log(messageWhatsapp);
		const url = `https://api.whatsapp.com/send?phone=${number}&text=${messageWhatsapp}`;
		window.open(url, "_blank");
	};

	const replaceName = (message, name) => {
		return message.replace("{{name}}", name);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
			<div className="md:w-[30%] bg-white px-[2rem] py-[2rem] rounded-lg relative">
				<div className="w-[100%] text-end">
					<span
						className="material-symbols-outlined cursor-pointer"
						onClick={() => {
							setShowModal(false);
						}}
					>
						close
					</span>
				</div>
				<div className="h-[100%] w-[100%] flex justify-center items-center">
					<div className="w-[100%] px-[2rem]">
						<div className="mb-[1rem]">
							<p className="block mb-[0.5rem]">
								Enviar mensaje a {memberReceiver.name}
							</p>
							<div>
								{messages && messages.length > 0 ? (
									messages.map((message, index) => (
										<div
											key={index}
											className={`flex items-center mb-[0.5rem] text-[13px] rounded-md  p-[0.5rem] cursor-pointer ${
												indexMessage === index
													? "bg-gray-300 border-black border-2"
													: "bg-gray-100"
											}`}
											onClick={() => {
												selectedMessage === message.savedMessage
													? setSelectedMessage("")
													: setSelectedMessage(message.savedMessage);
												setIndexMessage(index);
											}}
										>
											{replaceName(message.savedMessage, memberReceiver.name)}
										</div>
									))
								) : (
									<div>No hay mensajes Personalizados Guardados</div>
								)}
							</div>
							<textarea
								name="message"
								id="message"
								className="bg-gray-100 text-[#000] w-[100%] px-[1rem] py-[0.5rem] resize-none text-[13px]"
								placeholder="Escribe tu mensaje personalizado..."
								onChange={(e) => {
									setSelectedMessage(e.target.value);
									setIndexMessage(null);
								}}
								onClick={() => {
									setSelectedMessage("");
									setIndexMessage(null);
								}}
							></textarea>
						</div>
						<button
							onClick={() => {
								handleSendWhatsapp(
									memberReceiver.phone,
									memberReceiver.name,
									selectedMessage
								);
							}}
							className="bg-black text-[#fff] py-[0.3rem] px-[0.6rem] rounded-md animatedBgButtons w-full"
						>
							Enviar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
