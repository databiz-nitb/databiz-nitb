import API from "./api";

export const getMyProgress = () => {
  return API.get("/progress/me");
};

export const getAllUserProgress = () => {
  return API.get("/progress/overview");
};

export const getUserPathwayProgress = (pathwayId: string) => {
  return API.get(`/progress/pathway/${pathwayId}`);
};

export const markProgress = (data: {
  pathwayId: string;
  resourceId: string;
  status: "not_started" | "in_progress" | "completed";
  notes?: string;
}) => {
  return API.post("/progress", data);
};

export const updateProgress = (progressId: string, data: {
  status: "not_started" | "in_progress" | "completed";
  notes?: string;
}) => {
  return API.patch(`/progress/${progressId}`, data);
};

export const getPathwayProgress = (pathwayId: string) => {
  return API.get(`/progress/pathway/${pathwayId}/users`);
};

export const getComparativeProgress = (pathwayId: string) => {
  return API.get(`/progress/comparative/${pathwayId}`);
};
