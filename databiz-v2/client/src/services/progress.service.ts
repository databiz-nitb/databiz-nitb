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
