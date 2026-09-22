import Link from "next/link";

import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import CourseGrid from "@/components/courses/CourseGrid";
import CourseSearch from "@/components/courses/CourseSearch";

import { getCourses } from "@/services/courseService";

interface CoursesPageProps {
	searchParams: Promise<{
		page?: string;
		search?: string;
	}>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
	const params = await searchParams;

	const page = Math.max(Number(params.page) || 1, 1);

	const search = params.search?.trim() || "";

	try {
		const response = await getCourses({
			page,
			limit: 9,
			search,
		});

		const courses = response.data;
		const pagination = response.pagination;

		const createPageUrl = (pageNumber: number) => {
			const queryParams = new URLSearchParams();

			queryParams.set("page", String(pageNumber));

			if (search) {
				queryParams.set("search", search);
			}

			return `/courses?${queryParams.toString()}`;
		};

		return (
			<main className="min-h-screen bg-gray-50">
				<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
								Learn & Grow
							</p>

							<h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								Explore Our Courses
							</h1>

							<p className="mt-3 max-w-2xl text-gray-600">
								Discover courses designed to help you build
								practical skills and advance your career.
							</p>
						</div>

						<Link
							href="/courses/new"
							className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
						>
							+ Add Course
						</Link>
					</div>

					{/* Search */}
					<div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
						<CourseSearch initialSearch={search} />
					</div>

					{/* Result information */}
					{search && (
						<div className="mb-6">
							<p className="text-sm text-gray-600">
								Showing results for{" "}
								<span className="font-semibold text-gray-900">
									"{search}"
								</span>
							</p>

							<p className="mt-1 text-sm text-gray-500">
								{pagination.total}{" "}
								{pagination.total === 1 ? "course" : "courses"}{" "}
								found
							</p>
						</div>
					)}

					{/* Courses */}
					{courses.length === 0 ? (
						<EmptyState
							title={
								search
									? "No matching courses"
									: "No courses available"
							}
							message={
								search
									? `No courses were found for "${search}". Try a different search term.`
									: "Courses will appear here once they are added."
							}
						/>
					) : (
						<>
							<CourseGrid courses={courses} />

							{/* Pagination */}
							{pagination.totalPages > 1 && (
								<div className="mt-10 flex flex-col items-center gap-4">
									<div className="flex items-center gap-2">
										{page > 1 ? (
											<Link
												href={createPageUrl(page - 1)}
												className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
											>
												← Previous
											</Link>
										) : (
											<span className="cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400">
												← Previous
											</span>
										)}

										<span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
											{pagination.page}
										</span>

										{page < pagination.totalPages ? (
											<Link
												href={createPageUrl(page + 1)}
												className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
											>
												Next →
											</Link>
										) : (
											<span className="cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400">
												Next →
											</span>
										)}
									</div>

									<p className="text-sm text-gray-500">
										Page {pagination.page} of{" "}
										{pagination.totalPages}
									</p>
								</div>
							)}
						</>
					)}
				</section>
			</main>
		);
	} catch (error) {
		console.error("Failed to load courses:", error);

		return (
			<main className="min-h-screen bg-gray-50">
				<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<ErrorMessage />
				</section>
			</main>
		);
	}
}
