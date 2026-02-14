import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

interface PropertyData {
    title: string;
    description: string;
    image: string;
    price: string;
    address?: string; // Optional fields depending on your sheet
    status?: string;
}

const PropertyPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [data, setData] = useState<PropertyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProperty() {
            if (!slug) return;

            try {
                setLoading(true);
                const { data: propertyData, error: functionError } = await supabase.functions.invoke("fetch-properties", {
                    body: { slug },
                });

                if (functionError) throw functionError;
                if (propertyData.error) throw new Error(propertyData.error);
                if (!propertyData) throw new Error("No data returned");

                setData(propertyData);
            } catch (err: any) {
                console.error("Error fetching property:", err);
                setError(err.message || "Failed to load property details");
            } finally {
                setLoading(false);
            }
        }

        fetchProperty();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    The property you are looking for does not exist or has been removed.
                </p>
                <Button asChild>
                    <Link to="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <Helmet>
                <title>{data.title} | RoysCompany</title>
                <meta name="description" content={data.description} />
            </Helmet>

            {/* Navigation */}
            <nav className="p-4 md:p-6">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 max-w-4xl">
                <div className="space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.title}</h1>
                        {data.price && (
                            <p className="text-2xl font-semibold text-primary">{data.price}</p>
                        )}
                    </div>

                    {/* Image */}
                    {data.image && (
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted relative">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>{data.description}</p>
                    </div>

                    {/* CTA / Contact Section could go here if needed */}
                </div>
            </main>
        </div>
    );
};

export default PropertyPage;
