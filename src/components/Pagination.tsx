export default function Pagination({
	currentPage,
	totalPagesCount,
}: {
	currentPage: number;
	totalPagesCount: number;
}) {
	const style =
		"border-2 border-black px-2 py-1 rounded flex justify-center items-center text-xs font-bold user-select-none cursor-pointer w-fit";
	const activeStyle = "bg-black text-white rounded ease-in-out duration-300";

	return (
		<footer className="flex gap-1 justify-center items-center mt-8">
			<a
				className={style}
				data-disabled={currentPage == 1}
				href={`/${currentPage - 1}`}
			>
				Previous
			</a>
			{Array(totalPagesCount)
				.fill(0)
				.map((_, idx) =>
					currentPage == idx + 1 ? (
						<div key={idx} className={`${style} ${activeStyle}`}>
							{idx + 1}
						</div>
					) : (
						<a
							key={idx}
							className={style}
							href={`/${idx + 1}`}
						>
							{idx + 1}
						</a>
					)
				)}
			<a
				className={style}
				data-disabled={currentPage == totalPagesCount}
				href={`/${Number(currentPage) + 1}`}
			>
				Next
			</a>
		</footer>
	);
}
