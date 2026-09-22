import type { Course } from "@/types/course";
import CourseCard from "./CourseCard";

interface CourseGridProps {
	courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{courses.map((course) => (
				<CourseCard key={course._id} course={course} />
			))}
		</div>
	);
}
