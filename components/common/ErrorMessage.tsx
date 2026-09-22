interface ErrorMessageProps {
	message?: string;
}

export default function ErrorMessage({
	message = "Something went wrong while loading courses.",
}: ErrorMessageProps) {
	return (
		<div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
			<h2 className="text-lg font-semibold text-red-700">
				Unable to load courses
			</h2>

			<p className="mt-2 text-sm text-red-600">{message}</p>
		</div>
	);
}
