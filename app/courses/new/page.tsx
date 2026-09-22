import Link from "next/link";
import { redirect } from "next/navigation";

import CourseForm from "@/components/courses/CourseForm";
import { createCourse } from "@/services/courseService";
import type { CourseInput } from "@/types/course";

export default function CreateCoursePage() {
	async function handleCreateCourse(data: CourseInput) {
		"use server";

		const response = await createCourse(data);

		redirect(`/courses/${response.data.slug}`);
	}

	return (
		<main className="min-h-screen bg-gray-50">
			<section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
				<Link
					href="/"
					className="text-sm font-medium text-blue-600 hover:text-blue-700"
				>
					← Back to Courses
				</Link>

				<div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
					<div className="mb-8">
						<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
							Course Management
						</p>

						<h1 className="mt-2 text-3xl font-bold text-gray-900">
							Create New Course
						</h1>

						<p className="mt-2 text-gray-600">
							Add a new course to the course catalog.
						</p>
					</div>

					<CourseForm
						onSubmit={handleCreateCourse}
						submitLabel="Create Course"
					/>
				</div>
			</section>
		</main>
	);
}
