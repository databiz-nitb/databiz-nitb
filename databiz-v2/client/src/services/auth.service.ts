import API from "./api";

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return API.post("/auth/register", data);
};

export const login = (data: { email: string; password: string }) => {
  return API.post("/auth/login", data);
};

export const getProfile = () => {
  return API.get("/auth/profile");
};

export const verifyEmail = (data: { token: string }) => {
  return API.post("/auth/verify", data);
};

export const resendVerification = (data: { email: string }) => {
  return API.post("/auth/resend-verification", data);
};
