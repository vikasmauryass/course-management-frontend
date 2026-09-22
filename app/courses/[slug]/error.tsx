"use client";

import { useEffect } from "react";

interface CourseDetailsErrorProps {
	error: Error & {
		digest?: string;
	};
	reset: () => void;
}

export default function CourseDetailsError({
	error,
	reset,
}: CourseDetailsErrorProps) {
	useEffect(() => {
		console.error("Course details error:", error);
	}, [error]);

	return (
		<main className="min-h-screen bg-gray-50">
			<section className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
					<h1 className="text-2xl font-bold text-gray-900">
						Unable to load course
					</h1>

					<p className="mt-3 text-gray-600">
						There was a problem loading this course. Please try
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
