import API from "./api";

export const getUsers = () => {
  return API.get("/users");
};

export const getUserById = (id: string) => {
  return API.get(`/users/${id}`);
};

export const updateUser = (id: string, data: any) => {
  return API.put(`/users/${id}`, data);
};

export const deleteUser = (id: string) => {
  return API.delete(`/users/${id}`);
};
