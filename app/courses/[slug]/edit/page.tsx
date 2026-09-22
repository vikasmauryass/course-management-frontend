import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import CourseForm from "@/components/courses/CourseForm";

import { getCourseBySlug, updateCourse } from "@/services/courseService";

import type { CourseInput } from "@/types/course";

interface EditCoursePageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
	const { slug } = await params;

const response = await getCourseBySlug(slug).catch((error) => {
	console.error("Failed to load course for editing:", error);

	return null;
});

if (!response) {
	notFound();
}

const course = response.data;

	async function handleUpdateCourse(data: CourseInput) {
		"use server";

		const response = await updateCourse(course._id, data);

		redirect(`/courses/${response.data.slug}`);
	}

	const initialData: CourseInput = {
		name: course.name,
		description: course.description,
		price: course.price,
		duration: course.duration,
		durationUnit: course.durationUnit,
	};

	return (
		<main className="min-h-screen bg-gray-50">
			<section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
				<Link
					href={`/courses/${course.slug}`}
					className="text-sm font-medium text-blue-600 hover:text-blue-700"
				>
					← Back to Course
				</Link>

				<div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
					<div className="mb-8">
						<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
							Course Management
						</p>

						<h1 className="mt-2 text-3xl font-bold text-gray-900">
							Edit Course
						</h1>

						<p className="mt-2 text-gray-600">
							Update the information for{" "}
							<span className="font-medium text-gray-900">
								{course.name}
							</span>
							.
						</p>
					</div>

					<CourseForm
						initialData={initialData}
						onSubmit={handleUpdateCourse}
						submitLabel="Update Course"
					/>
				</div>
			</section>
		</main>
	);
}
