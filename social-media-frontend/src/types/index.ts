export interface Post {
    id: number;
    title: string;
    content: string;
    titleColor?: string;
    createdAt: string;
    comments: Comment[];
}

export interface Comment {
    id: number;
    content: string;
    postId: number;
    createdAt: string;
}