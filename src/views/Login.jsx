export default function Login() {
	return (
		<div className="w-screen h-screen flex flex-row">
			<div
				className="w-full h-full flex justify-center flex-col items-center"
				style={{
					backgroundImage: "url(/login.jpg)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
					position: "relative",
				}}
			>
				<div
					className="absolute inset-0 bg-black opacity-50"
					style={{zIndex: 1}}
				></div>

				<div className="relative z-10 text-center px-6 flex- flex-col gap-3">
					<h1 className="text-white text-[70px] ">Barrio la Gasca</h1>
					<div>
						<h1 className="text-white text-[30px] font-semibold mb-2">
							...¿me amas más que estos?... Apacienta mis corderos.
						</h1>
						<h2 className="text-white text-[20px]">Juan 21:15</h2>
					</div>
				</div>
			</div>
			<div className="w-[50%] flex items-center justify-center bg-white">
				<form className="flex flex-col items-center justify-center w-[80%] p-6 shadow-lg rounded-lg">
					<input
						type="text"
						placeholder="Usuario"
						className="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
					/>
					<input
						type="password"
						placeholder="Contraseña"
						className="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
					/>
					<a href="/dashboard">
						<span
							// type="submit"
							className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
						>
							Iniciar sesión
						</span>
					</a>
				</form>
			</div>
		</div>
	);
}
