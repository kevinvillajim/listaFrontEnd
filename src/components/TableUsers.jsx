import {useState, useMemo} from "react";

export default function TableUsers({
	title,
	subTitle,
	btn2,
	onClickBtn2,
	headers,
	data,
	handleEditClick,
	handleDeleteClick,
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortColumn, setSortColumn] = useState(null);
	const [sortDirection, setSortDirection] = useState("asc");

	const columnMap = {
		Usuario: "name",
		Estado: "active",
	};

	// Función de búsqueda
	const filteredData = useMemo(() => {
		const searchString = searchTerm.toLowerCase().trim();
		if (!searchString) return data;

		return data.filter((item) => {
			const name = item.name?.toLowerCase() || "";
			const email = item.email?.toLowerCase() || "";
			const activeStatus = item.active ? "activo" : "inactivo";

			return (
				name.includes(searchString) ||
				email.includes(searchString) ||
				activeStatus.includes(searchString)
			);
		});
	}, [data, searchTerm]);

	// Función de filtrado
	const filteredAndSortedData = useMemo(() => {
		let result = [...filteredData];

		if (sortColumn) {
			const dataKey = columnMap[sortColumn];
			result.sort((a, b) => {
				let aValue = a[dataKey];
				let bValue = b[dataKey];

				// Manejo especial para el estado (active)
				if (dataKey === "active") {
					return sortDirection === "asc"
						? a.active === b.active
							? 0
							: a.active
							? -1
							: 1
						: a.active === b.active
						? 0
						: a.active
						? 1
						: -1;
				}

				// Manejo para valores undefined o null
				if (aValue == null) return sortDirection === "asc" ? 1 : -1;
				if (bValue == null) return sortDirection === "asc" ? -1 : 1;

				// Comparación estándar para strings y números
				if (typeof aValue === "string") aValue = aValue.toLowerCase();
				if (typeof bValue === "string") bValue = bValue.toLowerCase();

				if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
				if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
				return 0;
			});
		}

		return result;
	}, [filteredData, sortColumn, sortDirection]);

	// Función para manejar el ordenamiento
	const handleSort = (column) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	return (
		<div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
			<div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
				<div className="flex items-center justify-between gap-8 mb-8">
					<div>
						<h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
							{title}
						</h5>
						<p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
							{subTitle}
						</p>
					</div>
					<div className="flex flex-col gap-2 shrink-0 sm:flex-row">
						<button
							className="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button"
							onClick={onClickBtn2}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								strokeWidth="2"
								className="w-4 h-4"
							>
								<path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
							</svg>
							{btn2}
						</button>
					</div>
				</div>
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<div className="block w-full overflow-hidden md:w-max"></div>
					<div className="w-full md:w-72">
						<div className="relative h-10 w-full min-w-[200px]">
							<div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									aria-hidden="true"
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
									></path>
								</svg>
							</div>
							<input
								className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
								placeholder=" "
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
								Buscar
							</label>
						</div>
					</div>
				</div>
			</div>
			<div className="p-6 px-0 overflow-scroll">
				<table className="w-full mt-4 text-left table-auto min-w-max">
					<thead>
						<tr>
							{headers.map((header, index) => (
								<th
									className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
									key={index}
									onClick={() => handleSort(header)}
								>
									<p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
										{header}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="2"
											stroke="currentColor"
											aria-hidden="true"
											className="w-4 h-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
											></path>
										</svg>
									</p>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredAndSortedData.map((data, index) => (
							<tr key={index}>
								<td className="p-4 border-b border-blue-gray-50">
									<div className="flex items-center gap-3">
										<img
											src={data.avatar || "/avatar.png"}
											alt={data.name}
											className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
										/>
										<div className="flex flex-col">
											<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
												{data.name}
											</p>
											<p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
												{data.email}
											</p>
										</div>
									</div>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<div className="w-max">
										<div
											className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold text - green - 900 ${
												data.active ? "bg-green-500/20" : "bg-red-500/20"
											} uppercase rounded-md select-none whitespace-nowrap`}
										>
											<span className="">
												{data.active ? "Activo" : "Inactivo"}
											</span>
										</div>
									</div>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<button
										className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
										type="button"
										onClick={() => handleEditClick(data)}
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
										className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
										type="button"
										onClick={() => handleDeleteClick(data.id)}
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
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
