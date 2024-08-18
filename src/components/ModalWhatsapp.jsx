import {useEffect, useState} from "react";
import api from "./api";

export default function ModalWhatsapp({setShowModal, memberReceiver}) {
	const [messages, setMessages] = useState([]);
	const [selectedMessage, setSelectedMessage] = useState("");
	const [indexMessage, setIndexMessage] = useState(null);
	const [enableButton, setEnableButton] = useState(false);
	const [enableEdit, setEnableEdit] = useState(false);
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

	const handleNewMessage = async (message) => {
		try {
			const response = await api.post("/messages", {savedMessage: message});
			if (response) {
				fetchMessages();
			}
		} catch (error) {
			console.error(
				"Error creando mensaje:",
				error.response?.data || error.message
			);
		}
	};

	const editMessage = async (id) => {
		try {
			const response = await api.put(`/messages/${id}`, {
				savedMessage: selectedMessage,
			});
			if (response) {
				fetchMessages();
				setEnableEdit(false);
			}
		} catch (error) {
			console.error(
				"Error editando mensaje:",
				error.response?.data || error.message
			);
		}
	};

	const deleteMessage = async (id) => {
		try {
			const response = await api.delete(`/messages/${id}`);
			if (response) {
				fetchMessages();
			}
		} catch (error) {
			console.error(
				"Error deleting message data:",
				error.response?.data || error.message
			);
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
			<div className="md:w-[30%] bg-white px-[0.6rem] md:px-[2rem] py-[2rem] rounded-lg relative">
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
											className="flex flex-row items-center justify-between  "
										>
											<div
												className={`flex items-center mb-[0.5rem] text-[13px] rounded-md w-full p-[0.5rem] cursor-pointer mr-[0.5rem] ${
													indexMessage === index
														? "bg-gray-300 border-black border-2"
														: "bg-gray-100"
												} ${enableEdit ? "hidden" : "block"}`}
												onClick={() => {
													selectedMessage === message.savedMessage
														? setSelectedMessage("")
														: setSelectedMessage(message.savedMessage);
													setIndexMessage(index);
													setEnableButton(false);
												}}
											>
												{replaceName(message.savedMessage, memberReceiver.name)}
											</div>
											<div
												className={`w-full mr-[0.5rem] ${
													!enableEdit ? "hidden" : "inline"
												}`}
											>
												<textarea
													type="text"
													value={selectedMessage}
													onChange={(e) => {
														setSelectedMessage(e.target.value);
													}}
													className="bg-gray-100 text-[#000] w-[100%] resize-none text-[13px] h-[5rem]"
												/>
											</div>
											<div>
												<button
													className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
													type="button"
													onClick={() => {
														setSelectedMessage(message.savedMessage);
														setIndexMessage(index);
														setEnableButton(false);
														setEnableEdit(!enableEdit);
														// handleEditClick(message);
													}}
												>
													<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															fill="currentColor"
															aria-hidden="true"
															className="w-4 h-4"
														>
															<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
														</svg>
													</span>
												</button>
												<button
													className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
														!enableEdit ? "block" : "hidden"
													}`}
													type="button"
													onClick={() => deleteMessage(message.id)}
												>
													<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															fill="currentColor"
															className="w-4 h-4"
														>
															<path
																fillRule="evenodd"
																d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
																clipRule="evenodd"
															/>
														</svg>
													</span>
												</button>
												<button
													className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
														enableEdit ? "block" : "hidden"
													}`}
													type="button"
													onClick={() => editMessage(message.id)}
												>
													<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															fill="currentColor"
															className="size-6"
														>
															<path
																fillRule="evenodd"
																d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
																clipRule="evenodd"
															/>
														</svg>
													</span>
												</button>
											</div>
										</div>
									))
								) : (
									<div>No hay mensajes Personalizados Guardados</div>
								)}
							</div>
							<p className="mb-[0.5rem] text-[12px]">
								Para insertar el nombre del miembro: {"{{name}}"}
							</p>
							<div className=" flex flex-row items-center">
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
										setEnableButton(true);
										setIndexMessage(null);
									}}
								></textarea>
								<button
									className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
									disabled={!enableButton}
									onClick={() => {
										handleNewMessage(selectedMessage);
									}}
								>
									<span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="size-6"
										>
											<path
												fillRule="evenodd"
												d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
								</button>
							</div>
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
