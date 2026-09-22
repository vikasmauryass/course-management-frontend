export default function CourseDetailsLoading() {
	return (
		<main className="min-h-screen bg-gray-50">
			<section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

				<div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
					<div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

					<div className="mt-3 h-10 w-3/4 animate-pulse rounded bg-gray-200" />

					<div className="mt-6 space-y-3">
						<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
						<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
						<div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
					</div>

					<div className="mt-8 grid gap-4 sm:grid-cols-2">
						<div className="h-28 animate-pulse rounded-xl bg-gray-100" />
						<div className="h-28 animate-pulse rounded-xl bg-gray-100" />
					</div>

					<div className="mt-8 flex gap-3">
						<div className="h-12 w-32 animate-pulse rounded-lg bg-gray-200" />
						<div className="h-12 w-32 animate-pulse rounded-lg bg-gray-200" />
					</div>
				</div>
			</section>
		</main>
	);
}
