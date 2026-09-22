"use client";

import { useEffect } from "react";

interface CoursesErrorProps {
	error: Error & {
		digest?: string;
	};
	reset: () => void;
}

export default function CoursesError({ error, reset }: CoursesErrorProps) {
	useEffect(() => {
		console.error("Courses page error:", error);
	}, [error]);

	return (
		<main className="min-h-screen bg-gray-50">
			<section className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
						<span className="text-2xl text-red-600">!</span>
					</div>

					<h1 className="mt-5 text-2xl font-bold text-gray-900">
						Something went wrong
					</h1>

					<p className="mt-3 text-gray-600">
						We couldn't load the courses right now. Please try
						again.
					</p>

					<button
						type="button"
						onClick={() => reset()}
						className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
					>
						Try Again
					</button>
				</div>
			</section>
		</main>
	);
}
