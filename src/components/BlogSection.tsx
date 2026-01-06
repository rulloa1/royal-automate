import { Link } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";
import { ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export const BlogSection = () => {
    const posts = blogPosts.slice(0, 3);
    const { ref, isVisible } = useIntersectionObserver();

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
