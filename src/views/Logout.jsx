import {useEffect} from "react";

export default function Logout() {
	useEffect(() => {
		handleLogout();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		window.location.href = "/";
	};
}
