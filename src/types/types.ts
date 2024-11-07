// types.ts

export interface User {
    user?: string;
    
}

export interface PageProps {
    user: User | null;
}