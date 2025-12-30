import API from "./api";

export const getBlogs = () => {
  return API.get("/blogs");
};

export const getBlogById = (id: string) => {
  return API.get(`/blogs/${id}`);
};

export const createBlog = (data: any) => {
  return API.post("/blogs", data); // axios handles FormData automatically
};

export const updateBlog = (id: string, data: any) => {
  return API.put(`/blogs/${id}`, data);
};

export const deleteBlog = (id: string) => {
  return API.delete(`/blogs/${id}`);
};
