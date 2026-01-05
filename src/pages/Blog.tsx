import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabase";
import { BlogCard, BlogPost } from "@/components/BlogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from("posts")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;
                if (data) setPosts(data);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <Helmet>
                <title>Blog | Insights & AI Strategies | RoysCompany</title>
                <meta
                    name="description"
                    content="Explore our latest articles on AI automation, chatbot development, and business growth strategies. Stay ahead of the curve."
                />
                <meta property="og:title" content="Blog | Insights & AI Strategies | RoysCompany" />
                <meta property="og:description" content="Explore our latest articles on AI automation, chatbot development, and business growth strategies." />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://www.royscompany.com/blog" />
                <meta property="og:image" content="/og-image.png" />
                <link rel="canonical" href="https://www.royscompany.com/blog" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="pt-32">
                    <section className="container mx-auto px-4 mb-20">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">Insights & Resources</h1>
                            <p className="text-xl text-muted-foreground">
                                Deep dives into the technology transforming modern business.
                            </p>
                        </div>

                        {loading ? (
                            <div className="grid md:grid-cols-3 gap-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-96 rounded-2xl bg-secondary/50 animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                                {posts.length === 0 && (
                                    <div className="col-span-full text-center py-20 text-muted-foreground">
                                        No articles found. Check back later!
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    <ContactSection />
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Blog;
