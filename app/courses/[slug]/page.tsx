import Link from "next/link";
import { notFound } from "next/navigation";

import CourseDeleteButton from "@/components/courses/CourseDeleteButton";
import { getCourseBySlug } from "@/services/courseService";

interface CourseDetailsPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function CourseDetailsPage({
	params,
}: CourseDetailsPageProps) {
	const { slug } = await params;

	try {
		const response = await getCourseBySlug(slug);
		const course = response.data;

		return (
			<main className="min-h-screen bg-gray-50">
				<section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
					<Link
						href="/"
						className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
					>
						← Back to Courses
					</Link>

					<article className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
						<div>
							<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
								Course
							</p>

							<h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								{course.name}
							</h1>

							<p className="mt-6 whitespace-pre-line text-base leading-7 text-gray-600">
								{course.description}
							</p>
						</div>

						<div className="mt-8 grid gap-4 sm:grid-cols-2">
							<div className="rounded-xl bg-gray-50 p-5">
								<p className="text-sm text-gray-500">Price</p>

								<p className="mt-1 text-2xl font-bold text-gray-900">
									₹{course.price}
								</p>
							</div>

							<div className="rounded-xl bg-gray-50 p-5">
								<p className="text-sm text-gray-500">
									Duration
								</p>

								<p className="mt-1 text-2xl font-bold text-gray-900">
									{course.duration} {course.durationUnit}
								</p>
							</div>
						</div>

						<div className="mt-8 border-t border-gray-200 pt-6">
							<p className="text-sm text-gray-500">
								Course created on
							</p>

							<p className="mt-1 text-sm font-medium text-gray-800">
								{new Date(course.createdAt).toLocaleDateString(
									"en-IN",
									{
										day: "2-digit",
										month: "long",
										year: "numeric",
									},
								)}
							</p>
						</div>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link
								href={`/courses/${course.slug}/edit`}
								className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
							>
								Edit Course
							</Link>

							<CourseDeleteButton
								courseId={course._id}
								courseName={course.name}
							/>

							<Link
								href="/"
								className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
							>
								Back to Courses
							</Link>
						</div>
					</article>
				</section>
			</main>
		);
	} catch (error) {
		console.error("Failed to load course:", error);

		notFound();
	}
}
