import API from "./api";

export const submitContactForm = (data: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}) => {
    return API.post("/queries", data);
};

export const getQueries = (page = 1, limit = 10) => {
    return API.get(`/queries?page=${page}&limit=${limit}`);
};

export const updateQueryStatus = (id: string, status: string) => {
    return API.patch(`/queries/${id}/status`, { status });
};
