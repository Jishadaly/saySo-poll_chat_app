// types.ts

export interface User {
    user?: string;
    // Add other properties as needed
}

export interface PageProps {
    user: User | null;
}