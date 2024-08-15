import PropTypes from "prop-types";
import {useState} from "react";

export default function ModalEditMiembro({
	setShowModalEdit,
	user,
	handleEditUser,
	formObject,
}) {
	const [formData, setFormData] = useState({
		name: user.name || "",
		phone: user.phone || "",
		calling: user.calling || "",
		organization: user.organization || "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await handleEditUser(user.id, formData);
			setShowModalEdit(false);
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
			<div className="md:w-[30%] bg-white px-[2rem] py-[2rem] rounded-lg relative">
				<div className="w-[100%] text-end">
					<span
						className="material-symbols-outlined cursor-pointer"
						onClick={() => setShowModalEdit(false)}
					>
						close
					</span>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{formObject.map((field) => (
						<div key={field.name} className="flex flex-col">
							<label htmlFor={field.name}>{field.label}</label>
							<input
								type="text"
								id={field.name}
								name={field.name}
								value={formData[field.name]}
								onChange={handleChange}
								className={`border rounded px-2 py-1 ${field.style}`}
							/>
						</div>
					))}
					<div className="flex justify-center mt-4">
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded"
						>
							Guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

ModalEditMiembro.propTypes = {
	setShowModalEdit: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	handleEditUser: PropTypes.func.isRequired,
	formObject: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			style: PropTypes.string,
		})
	).isRequired,
};
