import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { BlogCard, BlogPost } from "@/components/BlogCard";
import { ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export const BlogSection = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const { ref, isVisible } = useIntersectionObserver();

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from("posts")
                    .select("*")
                    .order("created_at", { ascending: false })
                    .limit(3);

                if (error) throw error;
                if (data) setPosts(data);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestPosts();
    }, []);

    if (loading) return null; // Or a skeleton loader
    if (posts.length === 0) return null; // Don't show empty section

    return (
        <section className="py-24 bg-secondary/20 relative overflow-hidden" ref={ref}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className={`max-w-2xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Latest Insights</h2>
                        <p className="text-lg text-muted-foreground">
                            Expert articles on AI automation, lead generation strategies, and the future of business technology.
                        </p>
                    </div>

                    <Link
                        to="/blog"
                        className={`gradient-button inline-flex items-center ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}
                    >
                        View All Articles <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div
                            key={post.id}
                            className={isVisible ? `animate-fade-in-up animation-delay-${(index + 2) * 200}` : "opacity-0"}
                        >
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
