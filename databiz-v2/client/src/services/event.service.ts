import API from "./api";

export const getEvents = () => {
  return API.get("/events/");
};

export const getEventById = (id: string) => {
  return API.get(`/events/${id}`);
};

export const createEvent = (data: any) => {
  return API.post("/events", data);
};

export const updateEvent = (id: string, data: any) => {
  return API.put(`/events/${id}`, data);
};

export const deleteEvent = (id: string) => {
  return API.delete(`/events/${id}`);
};
