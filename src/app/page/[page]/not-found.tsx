import HomeIcon from "@mui/icons-material/Home";

export default async function NotFound() {
	return (
		<div className="absolute inset-0 m-auto container grid gap-5 mb-5 mx-auto px-4 max-w-4xl">
			<div className="flex flex-col items-center justify-center mt-24">
				<h1 className="text-7xl font-bold text-center">
					404 Gossips Found
				</h1>
				<h3 className="text-lg font-bold text-center text-slate-500">
					Could not find requested resource
				</h3>
				<a
					href="/"
					className="text-2xl align-middle font-bold px-4 py-1 text-white bg-sky-500 hover:bg-sky-700 mx-auto rounded text-center mt-11"
				>
					<HomeIcon /> Home
				</a>
			</div>
		</div>
	);
}
