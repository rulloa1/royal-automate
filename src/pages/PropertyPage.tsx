import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowUpRight, ArrowDownRight, Sparkles, Anchor, Sun, ScanFace, Stethoscope, ChevronDown, ArrowLeft, Loader2 } from "lucide-react";

interface PropertyData {
    title: string;
    description: string;
    image: string;
    price: string;
    address?: string;
    status?: string;
}

const DEFAULT_PROPERTY: PropertyData = {
    title: "Design meets Dentistry.",
    description: "A hyper-specialized aesthetic clinic merging maxillo-facial precision with concierge luxury. We do not just restore; we architect using bio-emulation principles.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    price: "",
};

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

                // Allow empty property data to fall back to defaults if we want "demo mode", 
                // but usually we want to know if the slug is valid.
                // Assuming we want to show the page with defaults even if specific fields are missing in the valid row.
                if (!propertyData) throw new Error("No data returned");

                setData({
                    ...DEFAULT_PROPERTY,
                    ...propertyData,
                    // Ensure empty strings from sheet trigger fallback if desired, 
                    // or just let them override if they are explicitly empty?
                    // Usually "missing" in sheet might be undefined or empty string.
                    // Let's ensure truthy values favor the sheet, falsy favor the default.
                    title: propertyData.title || DEFAULT_PROPERTY.title,
                    description: propertyData.description || DEFAULT_PROPERTY.description,
                    image: propertyData.image || DEFAULT_PROPERTY.image,
                });
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
            <div className="min-h-screen bg-[#020202] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-4 text-zinc-400">
                <h1 className="text-2xl font-serif text-white mb-4">Property Not Found</h1>
                <p className="mb-8">The profile you are looking for does not exist.</p>
                <a href="/" className="flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </a>
            </div>
        );
    }

    return (
        <div className="bg-[#020202] text-zinc-400 selection:bg-white/20 min-h-screen font-sans">
            <Helmet>
                <title>{data.title} | Precision Aesthetics</title>
                <meta name="description" content={data.description} />
            </Helmet>

            <div className="noise"></div>

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-40 border-b border-white/[0.06] bg-[#020202]/80 backdrop-blur-md">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" className="group flex items-center gap-2">
                        <div className="w-4 h-4 bg-white rounded-full opacity-90 group-hover:scale-90 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                        <span className="text-sm font-medium tracking-tight text-white group-hover:text-zinc-300 transition-colors">Ramirez</span>
                    </a>

                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#philosophy" className="text-xs font-light tracking-wide hover:text-white transition-colors">Philosophy</a>
                        <a href="#expertise" className="text-xs font-light tracking-wide hover:text-white transition-colors">Expertise</a>
                        <a href="#stories" className="text-xs font-light tracking-wide hover:text-white transition-colors">Stories</a>
                    </nav>

                    <a href="#book" className="text-xs font-medium text-black bg-white px-4 py-2 hover:bg-zinc-200 transition-all duration-300 tracking-tight rounded-sm">
                        Reserve
                    </a>
                </div>
            </header>

            {/* Hero */}
            <main className="pt-16">
                <section className="relative min-h-[90vh] flex flex-col justify-end px-6 pb-20 border-b border-white/[0.06] overflow-hidden">
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

                    <div className="max-w-[1400px] w-full mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-end">
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-3 mb-8 reveal">
                                <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] tracking-wider uppercase text-zinc-300 backdrop-blur-sm">Est. 2023</span>
                                <div className="h-px w-12 bg-white/20"></div>
                                <span className="text-[10px] tracking-widest uppercase text-zinc-500">New York</span>
                            </div>

                            <h1 className="font-serif text-7xl md:text-9xl text-white leading-[0.9] tracking-tight reveal delay-1">
                                {data.title || "Design meets Dentistry."}
                            </h1>
                        </div>

                        <div className="lg:col-span-4 reveal delay-2">
                            <p className="text-sm font-light leading-relaxed text-zinc-400 text-justify max-w-sm ml-auto lg:ml-0 mb-10 border-l border-white/10 pl-6">
                                {data.description || "A hyper-specialized aesthetic clinic merging maxillo-facial precision with concierge luxury. We do not just restore; we architect using bio-emulation principles."}
                            </p>

                            <div className="flex flex-col gap-px bg-white/10 max-w-sm">
                                <a href="#book" className="group flex items-center justify-between bg-[#020202] px-4 py-4 hover:bg-zinc-900 transition-colors">
                                    <span className="text-xs uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">Start Journey</span>
                                    <ArrowRight className="text-zinc-500 group-hover:text-white transition-colors w-4 h-4" />
                                </a>
                                <a href="#expertise" className="group flex items-center justify-between bg-[#020202] px-4 py-4 hover:bg-zinc-900 transition-colors">
                                    <span className="text-xs uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">Treatment Index</span>
                                    <ArrowDownRight className="text-zinc-500 group-hover:text-white transition-colors w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Marquee */}
                <div className="border-b border-white/[0.06] bg-[#020202] py-4 overflow-hidden marquee-container relative z-20">
                    <div className="marquee-content whitespace-nowrap flex gap-32">
                        {Array(8).fill("").map((_, i) => (
                            <span key={i} className="text-xs font-light tracking-[0.25em] uppercase text-zinc-500 flex items-center gap-4">
                                <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>Ivy League Specialists
                            </span>
                        ))}
                    </div>
                </div>

                {/* Philosophy */}
                <section id="philosophy" className="py-32 px-6 border-b border-white/[0.06]">
                    <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-24 items-center">
                        <div className="relative group cursor-none">
                            <div className="aspect-[4/5] overflow-hidden relative rounded-sm bg-zinc-900">
                                <img
                                    src={data.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"}
                                    alt={data.title}
                                    className="object-cover w-full h-full opacity-60 grayscale group-hover:scale-105 group-hover:opacity-80 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="border-t border-white/20 pt-6 flex justify-between items-end">
                                        <div>
                                            <h3 className="font-serif text-3xl italic text-white">{data.title}</h3>
                                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Chief of Surgery</p>
                                        </div>
                                        <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="mb-12">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 block mb-6">Philosophy</span>
                                <h2 className="font-serif text-5xl md:text-7xl text-white leading-[0.95] tracking-tight">
                                    The Art of <br /> <span className="text-zinc-600 italic">Restraint.</span>
                                </h2>
                            </div>

                            <div className="space-y-8 pl-8 border-l border-zinc-800">
                                <p className="text-base font-light text-zinc-400 leading-relaxed">
                                    True luxury is undetectable. Educated at Yale Medical, Dr. Vance’s philosophy is rooted in negative space—preserving natural structure while enhancing aesthetic harmony.
                                </p>
                                <p className="text-base font-light text-zinc-400 leading-relaxed">
                                    We reject the "Hollywood White" standard in favor of translucent, textured, hyper-realistic porcelain work that mimics nature’s imperfections perfectly.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-12 mt-20 pt-10 border-t border-white/[0.06]">
                                <div>
                                    <div className="text-4xl text-white font-serif mb-2">15<span className="text-lg text-zinc-600 italic ml-1">yrs</span></div>
                                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Surgical Tenure</div>
                                </div>
                                <div>
                                    <div className="text-4xl text-white font-serif mb-2">03<span className="text-lg text-zinc-600 italic ml-1">pat</span></div>
                                    <div className="text-[10px] text-zinc-600 uppercase tracking-widest">Global Patents</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Expertise */}
                <section id="expertise" className="border-b border-white/[0.06]">
                    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
                        {/* Item 1 */}
                        <div className="group relative h-[480px] p-10 flex flex-col justify-between hover:bg-zinc-900/30 transition-colors duration-500">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-mono text-zinc-600">01</span>
                                <Sparkles className="text-zinc-500 group-hover:text-white transition-colors duration-300 w-[18px]" />
                            </div>
                            <div>
                                <h3 className="font-serif text-3xl text-white italic mb-3 group-hover:translate-x-2 transition-transform duration-500">Veneers</h3>
                                <p className="text-sm font-light text-zinc-500 leading-relaxed max-w-[200px] mb-8 group-hover:text-zinc-400 transition-colors">
                                    Hand-layered feldspathic porcelain. Thickness of a contact lens.
                                </p>
                                <div className="w-8 h-px bg-zinc-700 group-hover:w-full group-hover:bg-white transition-all duration-700"></div>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="group relative h-[480px] p-10 flex flex-col justify-between hover:bg-zinc-900/30 transition-colors duration-500">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-mono text-zinc-600">02</span>
                                <Anchor className="text-zinc-500 group-hover:text-white transition-colors duration-300 w-[18px]" />
                            </div>
                            <div>
                                <h3 className="font-serif text-3xl text-white italic mb-3 group-hover:translate-x-2 transition-transform duration-500">Implants</h3>
                                <p className="text-sm font-light text-zinc-500 leading-relaxed max-w-[200px] mb-8 group-hover:text-zinc-400 transition-colors">
                                    Guided titanium architecture. Lifetime structural warranty.
                                </p>
                                <div className="w-8 h-px bg-zinc-700 group-hover:w-full group-hover:bg-white transition-all duration-700"></div>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="group relative h-[480px] p-10 flex flex-col justify-between hover:bg-zinc-900/30 transition-colors duration-500">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-mono text-zinc-600">03</span>
                                <Sun className="text-zinc-500 group-hover:text-white transition-colors duration-300 w-[18px]" />
                            </div>
                            <div>
                                <h3 className="font-serif text-3xl text-white italic mb-3 group-hover:translate-x-2 transition-transform duration-500">Whitening</h3>
                                <p className="text-sm font-light text-zinc-500 leading-relaxed max-w-[200px] mb-8 group-hover:text-zinc-400 transition-colors">
                                    Philips Zoom Whitespeed. 8 Shades. 45 Minutes.
                                </p>
                                <div className="w-8 h-px bg-zinc-700 group-hover:w-full group-hover:bg-white transition-all duration-700"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stories Slider */}
                <section id="stories" className="py-32 border-b border-white/[0.06] overflow-hidden">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-20 items-end mb-20">
                            <div className="lg:w-1/3">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="w-6 h-px bg-white"></span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white">Clientele</span>
                                </div>
                                <h3 className="font-serif text-4xl text-white leading-tight tracking-tight">
                                    "The attention to detail is borderline obsessive. It's not a clinic; it's a studio."
                                </h3>
                                <div className="flex items-center gap-3 mt-8">
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white font-serif italic">ES</div>
                                    <div>
                                        <div className="text-xs font-medium text-white">Elena S.</div>
                                        <div className="text-[10px] text-zinc-600 uppercase tracking-wider">Model, IMG</div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-2/3 flex items-center justify-end gap-4">
                                <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        {/* Placeholder for horizontal scroll content if user asks for it, keeping layout simple for now */}
                    </div>
                </section>

                {/* Booking Interface */}
                <section id="book" className="py-32 px-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"></div>

                    <div className="max-w-3xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full text-[10px] tracking-[0.2em] uppercase text-zinc-300 mb-6 bg-white/5 backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Concierge
                            </span>
                            <h2 className="text-5xl md:text-6xl text-white font-serif italic tracking-tight">
                                Secure Availability
                            </h2>
                        </div>

                        <div className="bg-[#050505] border border-white/[0.08] p-1 shadow-2xl">
                            <div className="bg-black/50 border border-white/[0.04] p-8 md:p-12 relative overflow-hidden">

                                {/* Progress */}
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="text-[10px] font-mono text-white">01</span>
                                    <div className="flex-1 h-px bg-zinc-800 relative overflow-hidden">
                                        <div className="absolute inset-0 w-1/3 bg-white"></div>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-700">03</span>
                                </div>

                                <form className="space-y-12">
                                    {/* Service Selection */}
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-6 font-medium">Select Treatment</label>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <label className="cursor-pointer group relative">
                                                <input type="radio" name="service" className="custom-radio sr-only" defaultChecked />
                                                <div className="border border-white/10 p-5 transition-all duration-300 hover:border-white/30 bg-zinc-900/20 group-hover:bg-zinc-900/40">
                                                    <div className="indicator absolute top-0 right-0 w-px h-0 transition-all duration-500"></div>
                                                    <div className="flex items-start justify-between mb-2">
                                                        <ScanFace className="text-zinc-400 w-5 h-5" />
                                                        <div className="w-4 h-4 border border-zinc-600 rounded-full flex items-center justify-center group-hover:border-zinc-400">
                                                            <div className="w-2 h-2 bg-white rounded-full opacity-0 transition-opacity peer-checked:opacity-100"></div>
                                                        </div>
                                                    </div>
                                                    <span className="block text-sm text-white font-medium mb-1">Cosmetic Consult</span>
                                                    <span className="block text-xs text-zinc-500 font-light">Simulation & Planning</span>
                                                </div>
                                            </label>
                                            <label className="cursor-pointer group relative">
                                                <input type="radio" name="service" className="custom-radio sr-only" />
                                                <div className="border border-white/10 p-5 transition-all duration-300 hover:border-white/30 bg-zinc-900/20 group-hover:bg-zinc-900/40">
                                                    <div className="indicator absolute top-0 right-0 w-px h-0 transition-all duration-500"></div>
                                                    <div className="flex items-start justify-between mb-2">
                                                        <Stethoscope className="text-zinc-400 w-5 h-5" />
                                                        <div className="w-4 h-4 border border-zinc-600 rounded-full flex items-center justify-center group-hover:border-zinc-400">
                                                            <div className="w-2 h-2 bg-white rounded-full opacity-0 transition-opacity peer-checked:opacity-100"></div>
                                                        </div>
                                                    </div>
                                                    <span className="block text-sm text-white font-medium mb-1">Hygiene & Exam</span>
                                                    <span className="block text-xs text-zinc-500 font-light">Guided Biofilm Therapy</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Inputs Grid */}
                                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                                        <div className="group">
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-2 group-focus-within:text-white transition-colors">Time Preference</label>
                                            <div className="relative">
                                                <select className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-white rounded-none appearance-none transition-colors">
                                                    <option className="bg-black text-zinc-400">Morning (09:00 - 12:00)</option>
                                                    <option className="bg-black text-zinc-400">Afternoon (13:00 - 17:00)</option>
                                                </select>
                                                <div className="absolute right-0 top-3 pointer-events-none text-zinc-500">
                                                    <ChevronDown className="w-3.5 h-3.5" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-2 group-focus-within:text-white transition-colors">Requested Date</label>
                                            <input type="date" className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-white rounded-none placeholder-zinc-700 transition-colors" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-2 group-focus-within:text-white transition-colors">Full Name</label>
                                            <input type="text" placeholder="Enter your name" className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-white rounded-none placeholder-zinc-700 transition-colors" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-2 group-focus-within:text-white transition-colors">Email Address</label>
                                            <input type="email" placeholder="Enter your email" className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm text-white focus:outline-none focus:border-white rounded-none placeholder-zinc-700 transition-colors" />
                                        </div>
                                    </div>

                                    {/* Footer Action */}
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/[0.06]">
                                        <p className="text-[10px] text-zinc-600 font-light max-w-xs leading-relaxed">
                                            Deposit of $150 required upon confirmation. <br />24hr cancellation policy applies.
                                        </p>
                                        <button type="submit" className="w-full md:w-auto px-10 py-4 bg-white hover:bg-zinc-200 text-black text-xs font-semibold uppercase tracking-[0.2em] transition-all rounded-sm flex items-center justify-center gap-3 group">
                                            Request Appointment
                                            <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#020202] py-24 px-6 border-t border-white/[0.06]">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
                    <div>
                        <a href="#" className="text-3xl font-serif italic text-white block mb-8 tracking-tight">Ramirez.</a>
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 space-y-3 font-medium">
                            <p>448 W 18th St, New York</p>
                            <p>+1 (212) 555-0199</p>
                            <p className="pt-4 text-zinc-700">Inquiries: concierge@ramirez.com</p>
                        </div>
                    </div>

                    <div className="flex gap-24 text-[10px] uppercase tracking-widest font-medium">
                        <div className="flex flex-col gap-4">
                            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Treatments</a>
                            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Technology</a>
                            <a href="#" className="text-zinc-400 hover:text-white transition-colors">Before & After</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <a href="#" className="text-zinc-600 hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="text-zinc-600 hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="text-zinc-600 hover:text-white transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/[0.06] text-[10px] text-zinc-800 flex flex-col md:flex-row justify-between uppercase tracking-widest gap-4">
                    <span>©2023 Ramirez Dental Logic</span>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-zinc-600 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-zinc-600 transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PropertyPage;
