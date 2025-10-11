import API from "./api";

export const getResources = () => {
  return API.get("/resources");
};

export const getResourceById = (id: string) => {
  return API.get(`/resources/${id}`);
};

export const createResource = (data: any) => {
  return API.post("/resources", data);
};

export const updateResource = (id: string, data: any) => {
  return API.put(`/resources/${id}`, data);
};

export const deleteResource = (id: string) => {
  return API.delete(`/resources/${id}`);
};
