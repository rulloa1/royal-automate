export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image_url: string;
    author: string;
    published_at: string;
    created_at: string;
    slug: string;
}

export const blogPosts: BlogPost[] = [];
