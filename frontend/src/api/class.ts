import api from "@/api/index.ts";
import { handleAxiosError } from "@/api/index.ts";
import { z } from "zod";
import { zodClassSchema } from "@shared/zod/class/class.ts";
import {
  zodClassMemberSchema,
  zodClassMemberSchemaForUpdate,
} from "@shared/zod/class/class.members.ts";

export const createClass = async (
  classData: z.infer<typeof zodClassSchema>,
) => {
  try {
    const response = await api.post("/class/new/class", classData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getClassCourseDetails = async (class_code: string) => {
  try {
    const response = await api.post(`/class/${class_code}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

type UpdateClassDataType = {
  class_code: string;
  classData: z.infer<typeof zodClassSchema>;
};

export const updateClass = async ({
  class_code,
  classData,
}: UpdateClassDataType) => {
  try {
    const response = await api.patch(`/class/update/${class_code}`, classData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteClass = async (class_code: string) => {
  try {
    const response = await api.delete(`/class/delete/${class_code}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const addStudentToClass = async (
  data: z.infer<typeof zodClassMemberSchema>,
) => {
  try {
    const response = await api.post("/class/add/student", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const searchStudentInClass = async (student_id: string) => {
  try {
    const response = await api.post(`/class/search/student/${student_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
export const updateStudentInClass = async (
  data: z.infer<typeof zodClassMemberSchemaForUpdate>,
) => {
  try {
    const response = await api.patch("/class/update-student", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deleteStudentFromClass = async (student_id: string) => {
  try {
    const response = await api.delete(`/class/delete/student/${student_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getAllClasses = async () => {
  try {
    const response = await api.get("/class/all");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
