import API from "./api";

export const getUsers = (page = 1, limit = 10) => {
  return API.get(`/users?page=${page}&limit=${limit}`);
};

export const getUserById = (id: string) => {
  return API.get(`/users/${id}`);
};

export const updateUser = (id: string, data: any) => {
  return API.put(`/users/${id}`, data);
};

export const updateUserRole = (id: string, role: string) => {
  return API.post(`/users/${id}/role`, { role });
};

export const deleteUser = (id: string) => {
  return API.delete(`/users/${id}`);
};
