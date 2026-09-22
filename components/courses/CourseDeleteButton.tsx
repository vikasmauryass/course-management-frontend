"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteCourse } from "@/services/courseService";

interface CourseDeleteButtonProps {
	courseId: string;
	courseName: string;
}

export default function CourseDeleteButton({
	courseId,
	courseName,
}: CourseDeleteButtonProps) {
	const router = useRouter();

	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${courseName}"?`,
		);

		if (!confirmed) {
			return;
		}

		try {
			setIsDeleting(true);

			await deleteCourse(courseId);

			router.push("/");
			router.refresh();
		} catch (error) {
			console.error("Failed to delete course:", error);

			window.alert(
				error instanceof Error
					? error.message
					: "Failed to delete course.",
			);

			setIsDeleting(false);
		}
	};

	return (
		<button
			type="button"
			onClick={handleDelete}
			disabled={isDeleting}
			className="inline-flex items-center justify-center rounded-lg border border-red-300 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
		>
			{isDeleting ? "Deleting..." : "Delete Course"}
		</button>
	);
}
