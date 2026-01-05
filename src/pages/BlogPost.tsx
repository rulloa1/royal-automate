import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { BlogPost as BlogPostType } from "@/components/BlogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from("posts")
                    .select("*")
                    .eq("slug", slug)
                    .single();

                if (error) throw error;
                if (data) setPost(data);
            } catch (error) {
                console.error("Error fetching blog post:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                    <p className="text-muted-foreground mb-8">The article you are looking for does not exist.</p>
                    <Link to="/blog" className="gradient-button">Back to Blog</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const date = new Date(post.published_at || post.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <>
            <Helmet>
                <title>{post.title} | RoysCompany</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image_url} />
                <meta property="og:type" content="article" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="pt-32 pb-20">
                    <article className="container mx-auto px-4 max-w-4xl">
                        {/* Back Link */}
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                            Back to Articles
                        </Link>

                        {/* Header */}
                        <header className="mb-12 text-center">
                            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {date}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {post.author || "Royal Team"}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                                {post.title}
                            </h1>

                            {post.image_url && (
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-12">
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                                </div>
                            )}
                        </header>

                        {/* Content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-img:rounded-xl">
                            <ReactMarkdown>{post.content || post.excerpt}</ReactMarkdown>
                        </div>

                        {/* Share CTA */}
                        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
                            <p className="font-medium text-foreground">Share this article</p>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-full hover:bg-secondary transition-colors" title="Copy Link">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </article>

                    <ContactSection />
                </main>

                <Footer />
            </div>
        </>
    );
};

export default BlogPost;
