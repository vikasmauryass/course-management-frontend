export type DurationUnit =
  | "hours"
  | "days"
  | "weeks"
  | "months";

export interface Course {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: number;
  durationUnit: DurationUnit;
  createdAt: string;
  updatedAt: string;
}

export interface CourseInput {
  name: string;
  description: string;
  price: number;
  duration: number;
  durationUnit: DurationUnit;
}

export interface CoursePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CoursesResponse {
  success: boolean;
  data: Course[];
  pagination: CoursePagination;
}

export interface CourseResponse {
  success: boolean;
  message?: string;
  data: Course;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}