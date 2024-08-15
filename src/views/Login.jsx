import {useState} from "react";
import api from "../components/api";
import {useNavigate} from "react-router-dom";
import {saveToLocalStorage} from "../components/Cript";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const fetchUser = async () => {
		try {
			const response = await api.post("/me");
			if (response && response.data) {
				saveToLocalStorage("user", JSON.stringify(response.data));
				return response.data;
			} else {
				throw new Error("Failed to fetch user");
			}
		} catch (error) {
			console.error(
				"Error fetching user:",
				error.response ? error.response.data : error.message
			);
			setError("Error fetching user data");
			return null;
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/auth/login", {email, password});
			localStorage.setItem("token", response.data.access_token);

			const user = await fetchUser();

			if (user) {
				setError(null);
				navigate("/dashboard");
			}
		} catch (error) {
			if (
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.response.data.error
			) {
				setError(error.response.data.message || error.response.data.error);
				console.log("Error", error);
			} else {
				setError("Error desconocido al iniciar sesión");
				console.log(error);
			}
		}
	};

	return (
		<div className="w-screen h-screen flex flex-col md:flex-row">
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
					<h1 className="text-white text-[40px] md:text-[70px] ">
						Barrio la Gasca
					</h1>
					<div>
						<h1 className="text-white text-[20px] md:text-[30px] font-semibold mb-2">
							...¿me amas más que estos?... Apacienta mis corderos.
						</h1>
						<h2 className="text-white text-[12px] md:text-[20px]">
							Juan 21:15
						</h2>
					</div>
				</div>
			</div>
			<div className="md:w-[50%] md:h-full w-full h-[99%] flex items-center justify-center bg-white">
				<form
					onSubmit={handleLogin}
					className="flex flex-col items-center justify-center w-[80%] p-6 shadow-lg rounded-lg"
				>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required={true}
						className="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Contraseña"
						required={true}
						className="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
					/>
					{error && <p className="text-[12px] text-red-500">{error}</p>}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
					>
						Iniciar sesión
					</button>
				</form>
			</div>
		</div>
	);
}
