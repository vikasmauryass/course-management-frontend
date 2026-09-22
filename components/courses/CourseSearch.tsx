"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

interface CourseSearchProps {
	initialSearch?: string;
}

export default function CourseSearch({
	initialSearch = "",
}: CourseSearchProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [search, setSearch] = useState(initialSearch);

	const pushQuery = (params: URLSearchParams) => {
		const queryString = params.toString();

		router.push(queryString ? `${pathname}?${queryString}` : pathname);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const params = new URLSearchParams(searchParams.toString());
		const trimmedSearch = search.trim();

		if (trimmedSearch) {
			params.set("search", trimmedSearch);
		} else {
			params.delete("search");
		}

		params.delete("page");
		pushQuery(params);
	};

	const handleClear = () => {
		setSearch("");

		const params = new URLSearchParams(searchParams.toString());

		params.delete("search");
		params.delete("page");
		pushQuery(params);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 sm:flex-row"
		>
			{/* gradient-ring input, lights up on focus */}
			<div className="group flex-1 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 p-[1.5px] opacity-40 transition-opacity duration-300 focus-within:opacity-100 focus-within:shadow-[0_0_20px_-4px] focus-within:shadow-violet-500/60">
				<div className="flex items-center rounded-full bg-slate-100 dark:bg-slate-800">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="ml-4 h-4 w-4 shrink-0 text-slate-400"
					>
						<circle cx="11" cy="11" r="7" />
						<path d="m21 21-4.3-4.3" />
					</svg>

					<label htmlFor="course-search" className="sr-only">
						Search courses
					</label>

					<input
						id="course-search"
						type="search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search courses..."
						className="w-full rounded-full bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
					/>
				</div>
			</div>

			<button
				type="submit"
				className="rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition-shadow duration-300 hover:shadow-lg hover:shadow-violet-500/40"
			>
				Search
			</button>

			{initialSearch && (
				<button
					type="button"
					onClick={handleClear}
					className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
				>
					Clear
				</button>
			)}
		</form>
	);
}
