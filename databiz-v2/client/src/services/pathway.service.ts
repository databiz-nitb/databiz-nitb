import API from "./api";

export const getPathways = () => {
  return API.get("/pathways");
};

export const getPathwayById = (id: string) => {
  return API.get(`/pathways/${id}`);
};

export const createPathway = (data: any) => {
  return API.post("/pathways", data);
};

export const updatePathway = (id: string, data: any) => {
  return API.put(`/pathways/${id}`, data);
};

export const deletePathway = (id: string) => {
  return API.delete(`/pathways/${id}`);
};
