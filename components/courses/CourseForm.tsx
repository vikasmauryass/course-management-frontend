"use client";

import type { CourseInput, DurationUnit } from "@/types/course";
import { FormEvent, useState } from "react";

interface CourseFormProps {
	initialData?: CourseInput;
	onSubmit: (data: CourseInput) => Promise<void>;
	submitLabel?: string;
}

const defaultData: CourseInput = {
	name: "",
	description: "",
	price: 0,
	duration: 1,
	durationUnit: "weeks",
};

const inputClasses =
	"w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

export default function CourseForm({
	initialData = defaultData,
	onSubmit,
	submitLabel = "Create course",
}: CourseFormProps) {
	const [formData, setFormData] = useState<CourseInput>(initialData);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState("");

	const updateField = <K extends keyof CourseInput>(
		field: K,
		value: CourseInput[K],
	) => {
		setFormData((previous) => ({
			...previous,
			[field]: value,
		}));

		setErrors((previous) => ({
			...previous,
			[field]: "",
		}));
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (formData.name.trim().length < 3) {
			newErrors.name = "Course name must be at least 3 characters.";
		}

		if (formData.description.trim().length < 10) {
			newErrors.description =
				"Description must be at least 10 characters.";
		}

		if (formData.price < 0) {
			newErrors.price = "Price cannot be negative.";
		}

		if (formData.duration <= 0) {
			newErrors.duration = "Duration must be greater than 0.";
		}

		if (!formData.durationUnit) {
			newErrors.durationUnit = "Please select a duration unit.";
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setSubmitError("");

		if (!validateForm()) {
			return;
		}

		try {
			setIsSubmitting(true);

			await onSubmit({
				name: formData.name.trim(),
				description: formData.description.trim(),
				price: Number(formData.price),
				duration: Number(formData.duration),
				durationUnit: formData.durationUnit,
			});
		} catch (error) {
			setSubmitError(
				error instanceof Error
					? error.message
					: "Failed to save course.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 sm:p-8"
		>
			{/* Course Name */}
			<div>
				<label
					htmlFor="name"
					className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
				>
					Course name
				</label>

				<input
					id="name"
					type="text"
					value={formData.name}
					onChange={(event) =>
						updateField("name", event.target.value)
					}
					placeholder="e.g. React.js"
					className={inputClasses}
				/>

				{errors.name && (
					<p className="mt-1 text-sm text-red-500">{errors.name}</p>
				)}
			</div>

			{/* Description */}
			<div>
				<label
					htmlFor="description"
					className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
				>
					Description
				</label>

				<textarea
					id="description"
					rows={6}
					value={formData.description}
					onChange={(event) =>
						updateField("description", event.target.value)
					}
					placeholder="Describe what students will learn..."
					className={`resize-y ${inputClasses}`}
				/>

				{errors.description && (
					<p className="mt-1 text-sm text-red-500">
						{errors.description}
					</p>
				)}
			</div>

			{/* Price + Duration */}
			<div className="grid gap-6 sm:grid-cols-2">
				<div>
					<label
						htmlFor="price"
						className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
					>
						Price (₹)
					</label>

					<input
						id="price"
						type="number"
						min="0"
						step="0.01"
						value={formData.price}
						onChange={(event) =>
							updateField("price", Number(event.target.value))
						}
						className={inputClasses}
					/>

					{errors.price && (
						<p className="mt-1 text-sm text-red-500">
							{errors.price}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="duration"
						className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
					>
						Duration
					</label>

					<input
						id="duration"
						type="number"
						min="0.01"
						step="0.01"
						value={formData.duration}
						onChange={(event) =>
							updateField("duration", Number(event.target.value))
						}
						className={inputClasses}
					/>

					{errors.duration && (
						<p className="mt-1 text-sm text-red-500">
							{errors.duration}
						</p>
					)}
				</div>
			</div>

			{/* Duration Unit */}
			<div>
				<label
					htmlFor="durationUnit"
					className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
				>
					Duration unit
				</label>

				<select
					id="durationUnit"
					value={formData.durationUnit}
					onChange={(event) =>
						updateField(
							"durationUnit",
							event.target.value as DurationUnit,
						)
					}
					className={inputClasses}
				>
					<option value="hours">Hours</option>
					<option value="days">Days</option>
					<option value="weeks">Weeks</option>
					<option value="months">Months</option>
				</select>

				{errors.durationUnit && (
					<p className="mt-1 text-sm text-red-500">
						{errors.durationUnit}
					</p>
				)}
			</div>

			{/* Server Error */}
			{submitError && (
				<div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
					<p className="text-sm text-red-600 dark:text-red-400">
						{submitError}
					</p>
				</div>
			)}

			{/* Submit */}
			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white shadow-md shadow-violet-500/20 transition-shadow duration-300 hover:shadow-lg hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
			>
				{isSubmitting ? "Saving..." : submitLabel}
			</button>
		</form>
	);
}
