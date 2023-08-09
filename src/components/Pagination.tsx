"use client";

import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";

export default function Pagination({ currentPage }: { currentPage: number }) {
	const router = useRouter();
	const style =
		"border-2 border-black px-2 py-1 rounded flex justify-center items-center text-xs font-bold user-select-none cursor-pointer";
	const pagesCount = 2;
	const handlePageChange = (selectedPage: { selected: number }) => {
		const pageNumber = selectedPage.selected + 1;
		router.push(`/${pageNumber}`);
		// console.log('pageNumber', pageNumber);
	};

	return (
		<ReactPaginate
			previousLabel="Previous"
			nextLabel="Next"
			pageClassName={""}
			pageLinkClassName={style}
			previousClassName={""}
			previousLinkClassName={style}
			nextClassName={""}
			nextLinkClassName={style}
			breakLabel="..."
			breakClassName={""}
			breakLinkClassName={style}
			pageCount={pagesCount}
			marginPagesDisplayed={2}
			pageRangeDisplayed={1}
			onPageChange={handlePageChange}
            initialPage={currentPage - 1}
			containerClassName="flex gap-1 justify-center items-center mt-8"
			activeClassName="bg-black text-white rounded ease-in-out duration-300"
		/>
	);
}
