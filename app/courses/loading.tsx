export default function CoursesLoading() {
	return (
		<main className="min-h-screen bg-gray-50">
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="mb-8">
					<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

					<div className="mt-3 h-10 w-72 animate-pulse rounded bg-gray-200" />

					<div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded bg-gray-200" />
				</div>

				{/* Search skeleton */}
				<div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
					<div className="flex flex-col gap-3 sm:flex-row">
						<div className="h-12 flex-1 animate-pulse rounded-lg bg-gray-200" />

						<div className="h-12 w-full animate-pulse rounded-lg bg-gray-200 sm:w-24" />
					</div>
				</div>

				{/* Course cards skeleton */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
						>
							<div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

							<div className="mt-4 space-y-2">
								<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
								<div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
								<div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
							</div>

							<div className="mt-5 flex gap-2">
								<div className="h-7 w-20 animate-pulse rounded-full bg-gray-200" />
								<div className="h-7 w-24 animate-pulse rounded-full bg-gray-200" />
							</div>

							<div className="mt-6 h-10 w-full animate-pulse rounded-lg bg-gray-200" />
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
