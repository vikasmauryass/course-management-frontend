import type {
	ApiResponse,
	CourseInput,
	CourseResponse,
	CoursesResponse,
} from "@/types/course";
import { apiRequest } from "./api";

export interface GetCoursesParams {
	page?: number;
	limit?: number;
	search?: string;
}

export async function getCourses(
	params: GetCoursesParams = {},
): Promise<CoursesResponse> {
	const searchParams = new URLSearchParams();

	if (params.page !== undefined) {
		searchParams.set("page", String(params.page));
	}

	if (params.limit !== undefined) {
		searchParams.set("limit", String(params.limit));
	}

	if (params.search?.trim()) {
		searchParams.set("search", params.search.trim());
	}

	const queryString = searchParams.toString();

	const endpoint = queryString ? `/courses?${queryString}` : "/courses";

	return apiRequest<CoursesResponse>(endpoint);
}

export async function getCourseById(id: string): Promise<CourseResponse> {
	return apiRequest<CourseResponse>(`/courses/${id}`);
}

export async function getCourseBySlug(slug: string): Promise<CourseResponse> {
	return apiRequest<CourseResponse>(
		`/courses/slug/${encodeURIComponent(slug)}`,
	);
}

export async function createCourse(data: CourseInput): Promise<CourseResponse> {
	return apiRequest<CourseResponse>("/courses", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export async function updateCourse(
	id: string,
	data: CourseInput,
): Promise<CourseResponse> {
	return apiRequest<CourseResponse>(`/courses/${id}`, {
		method: "PUT",
		body: JSON.stringify(data),
	});
}

export async function deleteCourse(id: string): Promise<ApiResponse> {
	return apiRequest<ApiResponse>(`/courses/${id}`, {
		method: "DELETE",
	});
}