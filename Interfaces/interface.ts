interface UserData {
    email: string;
    password: string
    name?: string
}

interface LoginResponse {
    message: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
    role: "admin" | "user";
    jwtToken: string;
}

interface Job {
    id: string;
    company: string;
    company_logo?: string; // Optional since some jobs may not have a logo
    position: string;
    tags: string[];
    description: string;
    salary_min?: number;
    salary_max?: number;
    apply_url: string;
}

interface ApiResponse {
    [key: string]: Job; // All keys in API response are job objects
}

export type { UserData, LoginResponse , Job, ApiResponse};