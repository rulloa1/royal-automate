import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { InteractiveCard } from "@/components/ui/InteractiveCard";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    image_url: string;
    author: string;
    published_at?: string;
    created_at: string;
    slug: string;
}

interface BlogCardProps {
    post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
    const date = new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Link to={`/blog/${post.slug}`} className="block h-full">
            <InteractiveCard className="h-full flex flex-col overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={post.image_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {date}
                        </span>
                        <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author || "RoysCompany Team"}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm flex-grow line-clamp-3 mb-6">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center text-primary text-sm font-medium mt-auto group/link">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                    </div>
                </div>
            </InteractiveCard>
        </Link>
    );
};
