export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image_url: string;
    author: string;
    published_at: string;
    slug: string;
    created_at?: string;
}

export const blogPosts: BlogPost[] = [];
