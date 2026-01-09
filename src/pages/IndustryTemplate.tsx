import { useSearchParams } from "react-router-dom";
import { 
  Phone, 
  MapPin, 
  Mail, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Shield, 
  Clock,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Industry data mapping
interface IndustryData {
  services: string[];
  heroImage: string;
  description: string;
  benefits: string[];
  stats?: { label: string; value: string }[];
  portfolio?: {
    title: string;
    price: string;
    location: string;
    specs: string;
    image: string;
  }[];
}

const INDUSTRY_DATA: Record<string, IndustryData> = {
  "real-estate-agent": {
    services: ["Buyer Representation", "Seller Representation", "Luxury Estates", "Commercial Real Estate", "Relocation Services", "Investment Properties"],
    heroImage: "https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?q=80&w=2560&auto=format&fit=crop",
    description: "Your strategic partner in luxury real estate. Curating lifestyles and managing complex transactions with grace and precision.",
    benefits: ["Top 1% Producer", "Market Expert", "Concierge Service"],
    stats: [
      { label: "Families Helped", value: "1,200+" },
      { label: "Sales Volume", value: "$250M+" },
      { label: "Years Experience", value: "15+" }
    ],
    portfolio: [
      {
        title: "Modern Farmhouse Estate",
        price: "$650,000",
        location: "Gleannloch Farms, Spring, TX",
        specs: "4 Beds | 3.5 Baths | 3,200 sqft",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Luxury Haven",
        price: "$1,250,000",
        location: "Benders Landing, Spring, TX",
        specs: "5 Beds | 5 Baths | 4,850 sqft",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Classic Brick Estate",
        price: "$425,000",
        location: "Spring Creek Oaks, Spring, TX",
        specs: "4 Beds | 2.5 Baths | 2,800 sqft",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  dentist: {
    services: ["Teeth Whitening", "Dental Checkups", "Root Canals", "Invisalign", "Emergency Dentistry", "Pediatric Dentistry"],
    heroImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1920&auto=format&fit=crop",
    description: "Professional dental care for the whole family. We create beautiful smiles with gentle, modern dentistry.",
    benefits: ["Pain-free Procedures", "Modern Equipment", "Family Friendly"]
  },
  plumber: {
    services: ["Leak Detection", "Pipe Repair", "Drain Cleaning", "Water Heater Install", "Emergency Plumbing", "Toilet Repair"],
    heroImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1920&auto=format&fit=crop",
    description: "Expert plumbing solutions available 24/7. Fast, reliable, and affordable service for your home.",
    benefits: ["24/7 Emergency Service", "Licensed & Insured", "Upfront Pricing"]
  },
  electrician: {
    services: ["Wiring & Rewiring", "Panel Upgrades", "Lighting Installation", "Surge Protection", "Safety Inspections", "Generator Install"],
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1920&auto=format&fit=crop",
    description: "Licensed electricians ensuring your home's safety and power. Quality workmanship you can trust.",
    benefits: ["Safety First", "Master Electricians", "Guaranteed Work"]
  },
  landscaper: {
    services: ["Lawn Maintenance", "Landscape Design", "Tree Trimming", "Irrigation Systems", "Hardscaping", "Seasonal Cleanup"],
    heroImage: "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1920&auto=format&fit=crop",
    description: "Transforming your outdoor space into a beautiful oasis. Professional landscaping services for every season.",
    benefits: ["Creative Design", "Regular Maintenance", "Eco-friendly Options"]
  },
  roofer: {
    services: ["Roof Replacement", "Leak Repair", "Shingle Installation", "Gutter Cleaning", "Roof Inspections", "Storm Damage Repair"],
    heroImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=1920&auto=format&fit=crop",
    description: "Protecting your home with durable, high-quality roofing. Expert installation and repair services.",
    benefits: ["Free Inspections", "Warranty Protection", "Experienced Crew"]
  },
  cleaning: {
    services: ["Deep Cleaning", "Standard Cleaning", "Move-in/Move-out", "Office Cleaning", "Carpet Cleaning", "Window Washing"],
    heroImage: "https://images.unsplash.com/photo-1581578731117-104f885d2a8d?q=80&w=1920&auto=format&fit=crop",
    description: "Spotless cleaning for your peace of mind. We handle the mess so you can enjoy your time.",
    benefits: ["Vetted Staff", "Eco-friendly Products", "Satisfaction Guarantee"]
  },
  hvac: {
    services: ["AC Repair", "Heater Installation", "Duct Cleaning", "System Maintenance", "Emergency Service", "Thermostat Install"],
    heroImage: "https://images.unsplash.com/photo-1581094794329-cd136ce4eed6?q=80&w=1920&auto=format&fit=crop",
    description: "Keeping you comfortable year-round. Expert heating and cooling services for your home.",
    benefits: ["Certified Techs", "Energy Efficient", "Fast Response"]
  },
  generic: {
    services: ["Professional Consultation", "Quality Service", "Maintenance", "Installation", "Repairs", "Upgrades"],
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
    description: "Dedicated to providing top-tier service for your needs. Excellence and quality in every project.",
    benefits: ["Professional Team", "Quality Assured", "Customer Focused"]
  }
};

const IndustryTemplate = () => {
  const [searchParams] = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);

  // Extract params with defaults
  const businessName = searchParams.get("business_name") || "Your Business Name";
  const phone = searchParams.get("phone") || "(555) 123-4567";
  const address = searchParams.get("address") || "123 Main St, City, State";
  const email = searchParams.get("email") || "contact@business.com";
  const industryParam = searchParams.get("industry")?.toLowerCase() || "generic";

  const checkoutLink = searchParams.get("checkout_link") || "#";
  const price = searchParams.get("price") || "297"; // Default price

  // Get industry data or fallback to generic
  const industry = INDUSTRY_DATA[industryParam] ? industryParam : "generic";
  const data = INDUSTRY_DATA[industry] || INDUSTRY_DATA["generic"]; // Add fallback to avoid crash

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className={`font-bold text-2xl ${isScrolled ? "text-primary" : "text-white drop-shadow-md"}`}>
            {businessName}
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Services", "About", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium hover:text-primary transition-colors ${
                  isScrolled ? "text-slate-700" : "text-white drop-shadow-md"
                }`}
              >
                {item}
              </button>
            ))}
            <Button 
              size="lg" 
              className={isScrolled ? "" : "bg-white text-primary hover:bg-white/90"}
              onClick={() => scrollToSection("contact")}
            >
              Get a Quote
            </Button>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={isScrolled ? "text-primary" : "text-white"}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-10">
                  {["Services", "About", "Contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-lg font-medium text-left"
                    >
                      {item}
                    </button>
                  ))}
                  <Button size="lg" className="w-full" onClick={() => scrollToSection("contact")}>
                    Get a Quote
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-white bg-slate-900">
        {data.heroImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${data.heroImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="font-medium tracking-wide text-sm uppercase">
              Professional {industryParam.charAt(0).toUpperCase() + industryParam.slice(1)} Services
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Quality {industryParam.charAt(0).toUpperCase() + industryParam.slice(1)} Work <br />
            <span className="text-primary-foreground">You Can Trust</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" onClick={() => scrollToSection("contact")}>
              Book Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 h-auto bg-transparent border-white text-white hover:bg-white hover:text-primary"
              onClick={() => scrollToSection("services")}
            >
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section (Optional) */}
      {data.stats && (
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center divide-x divide-slate-100">
              {data.stats.map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Indicators */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {index === 0 ? <Clock className="h-6 w-6" /> : index === 1 ? <Shield className="h-6 w-6" /> : <Star className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{benefit}</h3>
                  <p className="text-muted-foreground text-sm">Top rated service</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Portfolio Section */}
      <section id="services" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.portfolio ? "Featured Residences" : "Our Services"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {data.portfolio 
                ? "Explore our exclusive collection of luxury properties and homes." 
                : "We offer a comprehensive range of services to meet all your needs. Quality workmanship is guaranteed on every project."}
            </p>
          </div>

          {data.portfolio ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.portfolio.map((item, index) => (
                <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md font-semibold">
                      {item.price}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl mb-1">{item.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {item.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-t pt-4 mt-2">
                      <p className="text-sm font-medium text-slate-600">{item.specs}</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.services.map((service, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-t-4 border-t-transparent hover:border-t-primary">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Professional {service.toLowerCase()} provided by our expert team. 
                      We ensure high standards and customer satisfaction.
                    </p>
                    <div className="flex items-center text-primary font-medium cursor-pointer hover:underline">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About/CTA Section */}
      <section id="about" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose {businessName}?</h2>
              <div className="space-y-4 text-primary-foreground/90 text-lg">
                <p>
                  With years of experience in the {industryParam} industry, we have built a reputation 
                  for excellence. Our team is dedicated to providing the highest quality service 
                  at competitive prices.
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" /> <span>Licensed and insured professionals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" /> <span>Transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" /> <span>100% satisfaction guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Emergency Service</h3>
                <p className="mb-6 text-primary-foreground/80">Available 24/7 for urgent needs</p>
                <a 
                  href={`tel:${phone.replace(/\D/g, '')}`} 
                  className="inline-flex items-center justify-center gap-3 bg-white text-primary font-bold text-xl py-4 px-8 rounded-full hover:bg-white/90 transition-colors w-full"
                >
                  <Phone className="h-6 w-6" />
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 border-t border-b">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Everything you need to grow your business online. No hidden fees.
          </p>

          <div className="max-w-md mx-auto">
            <Card className="relative overflow-hidden border-2 border-primary shadow-2xl scale-105">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-bl-lg">
                POPULAR
              </div>
              <CardHeader className="bg-primary/5 pb-8">
                <CardTitle className="text-2xl font-bold">Professional Website</CardTitle>
                <CardDescription>Perfect for {industryParam} businesses</CardDescription>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold">${price}</span>
                  <span className="text-muted-foreground font-medium">/one-time</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">+ $49/mo hosting & maintenance</p>
              </CardHeader>
              <CardContent className="pt-8">
                <ul className="space-y-4 text-left mb-8">
                  {[
                    "Custom Domain Name",
                    "Mobile Responsive Design",
                    "SEO Optimization",
                    "Contact Form Integration",
                    "Google Maps Integration",
                    "Monthly Updates",
                    "SSL Security Certificate"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  size="lg" 
                  className="w-full text-lg h-14 shadow-lg animate-pulse hover:animate-none"
                  onClick={() => window.location.href = checkoutLink}
                >
                  Secure This Website Now
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  100% Money-back guarantee for 30 days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get a Free Quote</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Ready to get started? Contact us today for a free consultation and quote. 
                We'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary mt-1">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-muted-foreground">{phone}</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri 8am-6pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary mt-1">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground">{email}</p>
                    <p className="text-sm text-muted-foreground mt-1">Online support 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary mt-1">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-muted-foreground">{address}</p>
                    <p className="text-sm text-muted-foreground mt-1">Serving the entire region</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-lg border-muted">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we will contact you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder={phone} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder={email} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Needed</Label>
                    <select 
                      id="service" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a service...</option>
                      {data.services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your project..." 
                      className="min-h-[120px]" 
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-slate-800 pb-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-4">{businessName}</h3>
              <p className="text-sm">
                Professional {industryParam} services you can rely on. 
                Licensed, insured, and ready to help.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                {data.services.slice(0, 4).map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {address}</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {phone}</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> {email}</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndustryTemplate;
