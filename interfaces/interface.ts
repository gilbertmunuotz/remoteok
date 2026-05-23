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
    slug?: string;
    epoch?: number;
    date?: string;
    company: string;
    company_logo?: string;
    logo?: string;
    position: string;
    tags: string[];
    location: string;
    description: string;
    salary_min?: number;
    salary_max?: number;
    apply_url: string;
    url?: string;
}

interface ApiResponse {
    [key: string]: Job; // All keys in API response are job objects
}

interface ThemeType {
    theme: "light" | "dark"
}

export type { UserData, LoginResponse, Job, ApiResponse, ThemeType };