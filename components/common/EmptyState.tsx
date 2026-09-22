interface EmptyStateProps {
	title?: string;
	message?: string;
}

export default function EmptyState({
	title = "No courses found",
	message = "There are no courses available at the moment.",
}: EmptyStateProps) {
	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-10 text-center">
			<h2 className="text-xl font-semibold text-gray-800">{title}</h2>

			<p className="mt-2 text-gray-500">{message}</p>
		</div>
	);
}
