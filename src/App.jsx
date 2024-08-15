import "./App.css";
import Login from "./views/Login.jsx";
import Perfil from "./views/Perfil.jsx";
import EditarPerfil from "./views/EditarPerfil.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Users from "./views/Users.jsx";
import Miembros from "./views/Miembros.jsx";
import Asistencias from "./views/Asistencias.jsx";
// import {useEffect, useRef} from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate,
} from "react-router-dom";
// import {getFromLocalStorage} from "./components/Cript";

// const PrivateRoute = ({children}) => {
// 	const token = localStorage.getItem("token");
// 	const user = JSON.parse(getFromLocalStorage("user"));
// 	const activityTimeoutRef = useRef(null);
// 	const sessionTimeoutRef = useRef(null);

// 	const resetActivityTimeout = () => {
// 		if (activityTimeoutRef.current) {
// 			clearTimeout(activityTimeoutRef.current);
// 		}
// 		activityTimeoutRef.current = setTimeout(() => {
// 			localStorage.clear();
// 			window.location.href = "/login";
// 		}, 300000); // 300000 ms = 5 minutos
// 	};

// 	const clearAllTimeouts = () => {
// 		if (activityTimeoutRef.current) {
// 			clearTimeout(activityTimeoutRef.current);
// 		}
// 		if (sessionTimeoutRef.current) {
// 			clearTimeout(sessionTimeoutRef.current);
// 		}
// 	};

// 	useEffect(() => {
// 		if (token && user?.active) {
// 			sessionTimeoutRef.current = setTimeout(() => {
// 				localStorage.clear();
// 				window.location.href = "/login"; // Redirige al login después de 1 hora
// 			}, 3600000); // 3600000 ms = 1 hora

// 			// Temporizador de 5 minutos para la inactividad
// 			resetActivityTimeout();

// 			// Eventos de actividad del usuario
// 			window.addEventListener("mousemove", resetActivityTimeout);
// 			window.addEventListener("keydown", resetActivityTimeout);
// 			window.addEventListener("click", resetActivityTimeout);

// 			// Limpia los eventos y temporizadores al desmontar
// 			return () => {
// 				clearAllTimeouts();
// 				window.removeEventListener("mousemove", resetActivityTimeout);
// 				window.removeEventListener("keydown", resetActivityTimeout);
// 				window.removeEventListener("click", resetActivityTimeout);
// 			};
// 		} else {
// 			console.error("No token or user not active");
// 		}
// 	}, [token, user]);

// 	if (!token || !user?.active) {
// 		return <Navigate to="/login" />;
// 	}

// 	return children;
// };

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="/profile"
					element={
						// <PrivateRoute>
						<Perfil />
						// </PrivateRoute>
					}
				/>
				<Route
					path="/edit-profile"
					element={
						// <PrivateRoute>
						<EditarPerfil />
						// </PrivateRoute>
					}
				/>
				{/* <PrivateRoute> */}
				{/* <Routes> */}
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="users" element={<Users />} />
				<Route path="miembros" element={<Miembros />} />
				<Route path="asistencias" element={<Asistencias />} />
				{/* </Routes> */}
				{/* </PrivateRoute> */}
			</Routes>
		</Router>
	);
}

export default App;
