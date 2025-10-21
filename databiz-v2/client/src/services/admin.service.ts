import API from "./api";

// Pathway creation
export const createPathway = (data: {
  title: string;
  description: string;
  category: "DS" | "AIML" | "DA";
  resources: string[];
}) => {
  return API.post("/pathways", data);
};

// Blog creation
export const createBlog = (data: {
  title: string;
  content: string;
  tags: string[];
  visibility: "public" | "junior" | "admin";
}) => {
  return API.post("/blogs", data);
};

// Event creation
export const createEvent = (data: {
  title: string;
  description?: string;
  startsAt: string;
  endsAt?: string;
  location?: string;
  onlineUrl?: string;
  published: boolean;
}) => {
  return API.post("/events", data);
};

// Update methods
export const updatePathway = (id: string, data: any) => {
  return API.put(`/pathways/${id}`, data);
};

export const updateBlog = (id: string, data: any) => {
  return API.put(`/blogs/${id}`, data);
};

export const updateEvent = (id: string, data: any) => {
  return API.put(`/events/${id}`, data);
};

// Delete methods
export const deletePathway = (id: string) => {
  return API.delete(`/pathways/${id}`);
};

export const deleteBlog = (id: string) => {
  return API.delete(`/blogs/${id}`);
};

export const deleteEvent = (id: string) => {
  return API.delete(`/events/${id}`);
};
