import type { Course } from "@/types/course";
import Link from "next/link";

interface CourseCardProps {
	course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
	return (
		<article className="group relative h-full">
			{/* soft ambient glow, only visible on hover */}
			<div className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />

			{/* 1px gradient border */}
			<div className="relative flex h-full flex-col rounded-2xl bg-gradient-to-br from-indigo-500/60 via-violet-500/60 to-cyan-400/60 p-[1px] transition-transform duration-300 group-hover:-translate-y-1">
				<div className="flex h-full flex-col rounded-2xl bg-white p-6 dark:bg-slate-900">
					<div className="flex-1">
						<h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
							{course.name}
						</h2>

						<p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
							{course.description}
						</p>

						<div className="mt-5 flex flex-wrap gap-2">
							<span className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1 text-sm font-medium text-white">
								₹{course.price}
							</span>

							<span className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
								{course.duration} {course.durationUnit}
							</span>
						</div>
					</div>

					<Link
						href={`/courses/${course.slug}`}
						className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_24px_-4px] hover:shadow-violet-500/60"
					>
						View details
					</Link>
				</div>
			</div>
		</article>
	);
}
