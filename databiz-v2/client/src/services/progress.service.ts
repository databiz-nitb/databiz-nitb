import API from "./api";

export const getProgress = () => {
  return API.get("/progress");
};

export const getProgressByUser = (userId: string) => {
  return API.get(`/progress/${userId}`);
};

export const updateProgress = (userId: string, data: any) => {
  return API.put(`/progress/${userId}`, data);
};

export const getMyProgress = () => {
  return API.get("/progress/me");
};

export const markProgressStatus = (data: { pathwayId: string, resourceId: string, status: string, notes?: string }) => {
  return API.post("/progress", data);
};

export const getPathwayProgressForUsers = (pathwayId: string) => {
  return API.get(`/progress/pathway/${pathwayId}/users`);
};
