// =========================
// User Model
// =========================
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: "public" | "junior" | "admin";
  year?: number;
  isGroupAdmin?: boolean;
}

// =========================
// Resource Model
// =========================
export interface IResource {
  _id?: string;
  title: string;
  url: string;
  type: "video" | "course" | "article";
  tags: string[];
}

// =========================
// Blog Model
// =========================
export interface IBlog {
  _id?: string;
  title: string;
  content: string;
  author: IUser | string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// =========================
// Event Model
// =========================
export interface IEvent {
  _id?: string;
  title: string;
  description: string;
  date: string; // ISO string
  createdBy: IUser | string;
}

// =========================
// Pathway Model
// =========================
export interface IPathway {
  _id?: string;
  title: string;
  description: string;
  category: string;
  createdBy: IUser | string;
  resources: IResource[] | string[];
}

// =========================
// Progress Model
// =========================
export interface IProgress {
  _id?: string;
  user: IUser | string;
  pathway: IPathway | string;
  completedResources: string[]; // Resource IDs
  completedBlogs?: string[];
  completedEvents?: string[];
}

// =========================
// Auth Responses
// =========================
export interface AuthResponse {
  token: string;
  user: IUser;
}

// =========================
// Generic API Response
// =========================
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
