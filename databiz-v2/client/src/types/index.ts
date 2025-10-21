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
  publishedAt?: string;
  visibility?: "public" | "junior" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

// =========================
// Event Model
// =========================
export interface IEvent {
  _id?: string;
  title: string;
  description?: string;
  startsAt: string; // ISO string
  endsAt?: string; // ISO string
  location?: string;
  onlineUrl?: string;
  published?: boolean;
  createdBy?: IUser | string;
  createdAt?: string;
  // Legacy field for backward compatibility
  date?: string;
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
  createdAt?: string;
  updatedAt?: string;
}

// =========================
// Progress Model
// =========================
export interface IProgress {
  _id?: string;
  user: IUser | string;
  pathway: IPathway | string;
  resource: IResource | string;
  status: "not_started" | "in_progress" | "completed";
  completedAt?: string;
  notes?: string;
  sourcePlatform?: string;
  createdAt?: string;
  updatedAt?: string;
}

// =========================
// Progress Summary Models
// =========================
export interface IPathwayProgress {
  pathway: IPathway;
  totalResources: number;
  completedResources: number;
  inProgressResources: number;
  completionPercentage: number;
  progressEntries: IProgress[];
}

export interface IUserProgressOverview {
  pathway: IPathway;
  total: number;
  completed: number;
  inProgress: number;
  completionPercentage: number;
  resources: IProgress[];
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
