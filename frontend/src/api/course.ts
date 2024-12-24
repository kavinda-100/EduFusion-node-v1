import api from "@/api/index.ts";
import { handleAxiosError } from "@/api/index.ts";
import { z } from "zod";
import { zodCourseSchema } from "@shared/zod/course/course.ts";
import { zodAddUpdateUserToCourseSchema } from "@shared/zod/course";

export const createNewCourse = async (
  courseData: z.infer<typeof zodCourseSchema>,
) => {
  try {
    const response = await api.post("/course/create", courseData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const searchCourse = async (courseCode: string) => {
  try {
    const response = await api.post(`/course/search/${courseCode}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateCourse = async ({
  courseCode,
  courseData,
}: {
  courseCode: string;
  courseData: z.infer<typeof zodCourseSchema>;
}) => {
  try {
    const response = await api.put(`/course/update/${courseCode}`, courseData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteCourse = async (courseCode: string) => {
  try {
    const response = await api.delete(`/course/delete/${courseCode}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const addUsersToCourse = async (
  data: z.infer<typeof zodAddUpdateUserToCourseSchema>,
) => {
  try {
    const response = await api.post("/course/add-users", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const searchUsersInCourse = async ({
  userId,
  courseCode,
}: {
  userId: string;
  courseCode: string;
}) => {
  try {
    const response = await api.post(
      `/course/search-users/${userId}/${courseCode}`,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteUsersFromCourse = async ({
  userId,
  courseCode,
}: {
  userId: string;
  courseCode: string;
}) => {
  try {
    const response = await api.delete(
      `/course/delete-users/${userId}/${courseCode}`,
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateUsersInCourse = async (
  data: z.infer<typeof zodAddUpdateUserToCourseSchema>,
) => {
  try {
    const response = await api.patch("/course/update-users", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getAllCourses = async () => {
  try {
    const response = await api.get("/course/get-all-courses");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
