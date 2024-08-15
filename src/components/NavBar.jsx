import React from "react";
import {
	Navbar,
	Collapse,
	Typography,
	Button,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
	IconButton,
} from "@material-tailwind/react";
import {
	UserCircleIcon,
	ChevronDownIcon,
	Cog6ToothIcon,
	PowerIcon,
	Bars2Icon,
	ComputerDesktopIcon,
	UsersIcon,
	ListBulletIcon,
} from "@heroicons/react/24/solid";

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	strokeWidth={1.5}
	stroke="currentColor"
	className="size-6"
>
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
	/>
</svg>;

// profile menu component
const profileMenuItems = [
	{
		label: "Perfil",
		icon: UserCircleIcon,
		link: "/profile",
	},
	{
		label: "Editar Perfil",
		icon: Cog6ToothIcon,
		link: "/edit-profile",
	},
	{
		label: "Cerrar Sesión",
		icon: PowerIcon,
		link: "/logout",
	},
];

function ProfileMenu({avatar}) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
				>
					<Avatar
						variant="circular"
						size="sm"
						alt="avatar"
						className="border border-gray-900 p-0.5"
						src={avatar}
					/>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${
							isMenuOpen ? "rotate-180" : ""
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				{profileMenuItems.map(({label, icon, link}, key) => {
					const isLastItem = key === profileMenuItems.length - 1;
					return (
						<a key={label} href={link}>
							<MenuItem
								onClick={closeMenu}
								className={`flex items-center gap-2 rounded ${
									isLastItem
										? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
										: ""
								}`}
							>
								{React.createElement(icon, {
									className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
									strokeWidth: 2,
								})}
								<Typography
									as="span"
									variant="small"
									className="font-normal"
									color={isLastItem ? "red" : "inherit"}
								>
									{label}
								</Typography>
							</MenuItem>
						</a>
					);
				})}
			</MenuList>
		</Menu>
	);
}

// nav list component
const navListItems = [
	{
		label: "Dashboard",
		icon: ComputerDesktopIcon,
		link: "/dashboard",
	},
	{
		label: "Usuarios",
		icon: UserCircleIcon,
		link: "/users",
	},
	{
		label: "Miembros",
		icon: UsersIcon,
		link: "/miembros",
	},
	{
		label: "Asistencias",
		icon: ListBulletIcon,
		link: "/asistencias",
	},
];

function NavList() {
	return (
		<ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
			{navListItems.map(({label, icon, link}, key) => (
				<Typography
					key={key}
					as="a"
					href={link}
					variant="small"
					color="gray"
					className="font-medium text-blue-gray-500"
				>
					<MenuItem className="flex items-center gap-2 lg:rounded-full">
						{React.createElement(icon, {className: "h-[18px] w-[18px]"})}{" "}
						<span className="text-gray-900"> {label}</span>
					</MenuItem>
				</Typography>
			))}
		</ul>
	);
}

export default function ComplexNavbar({avatar}) {
	const [isNavOpen, setIsNavOpen] = React.useState(false);

	const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

	React.useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setIsNavOpen(false)
		);
	}, []);

	return (
		<Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
			<div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
				<Typography
					as="a"
					href=""
					className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
				>
					Barrio la Gasca
				</Typography>
				<div className="hidden lg:block">
					<NavList />
				</div>
				<IconButton
					size="sm"
					color="blue-gray"
					variant="text"
					onClick={toggleIsNavOpen}
					className="ml-auto mr-2 lg:hidden"
				>
					<Bars2Icon className="h-6 w-6" />
				</IconButton>
				<ProfileMenu avatar={avatar} />
			</div>
			<Collapse open={isNavOpen} className="overflow-scroll">
				<NavList />
			</Collapse>
		</Navbar>
	);
}
