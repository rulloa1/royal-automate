import { Helmet } from "react-helmet-async";
import { CheckCircle2, ChevronRight, Clock3, Leaf, MapPin, Phone, ShieldCheck, Sparkles, Star, Trees, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Lawn Care & Mowing",
    description: "Weekly and bi-weekly service with clean edging, trimming, and clippings cleanup.",
    icon: Leaf,
  },
  {
    title: "Mulch, Beds & Plant Care",
    description: "Seasonal bed maintenance, fresh mulch installs, pruning, and weed prevention.",
    icon: Trees,
  },
  {
    title: "Yard Cleanup & Hauling",
    description: "Leaf removal, storm cleanup, overgrowth resets, and debris hauling done fast.",
    icon: Wrench,
  },
];

const processSteps = [
  "Share your address and service needs in under 2 minutes.",
  "Get a transparent quote with optional add-ons.",
  "Choose your service date and receive arrival updates.",
  "We complete the work and do a final quality walkthrough.",
];

const benefits = [
  "Fast response times and reliable schedules",
  "Fully insured team with professional equipment",
  "Clear communication before, during, and after service",
  "Satisfaction-first policy for every visit",
];

const testimonials = [
  {
    name: "M. Rivera",
    quote:
      "Our yard looked rough after winter and Rene's team made it look brand new in one visit. Super professional and on time.",
  },
  {
    name: "T. Johnson",
    quote:
      "The online quote process was simple, the price was fair, and the cleanup was spotless. Highly recommended.",
  },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Rene&apos;s Outdoor Maintenance | Lawn Care, Cleanups & Landscaping</title>
        <meta
          name="description"
          content="Rene's Outdoor Maintenance provides dependable lawn care, seasonal cleanup, and landscaping services with fast quotes and reliable scheduling."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <a href="#home" className="font-display text-lg font-semibold">Rene&apos;s Outdoor Maintenance</a>
            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <a href="#services" className="transition-colors hover:text-foreground">Services</a>
              <a href="#process" className="transition-colors hover:text-foreground">How It Works</a>
              <a href="#reviews" className="transition-colors hover:text-foreground">Reviews</a>
              <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
            </nav>
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="tel:+15551234567">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </a>
            </Button>
          </div>
        </header>

        <main id="home">
          <section className="relative overflow-hidden border-b border-border/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,186,120,0.18),transparent_60%)]" />
            <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
              <div className="space-y-7">
                <div className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  Improved booking + faster response experience
                </div>
                <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                  Beautiful, clean yards without the hassle.
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Local outdoor maintenance services built for busy homeowners. Book lawn care, cleanup, and landscaping in minutes.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-xl">
                    <a href="#contact">Get a Free Quote <ChevronRight className="ml-1 h-4 w-4" /></a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl">
                    <a href="tel:+15551234567"><Phone className="mr-2 h-4 w-4" />Speak to the Team</a>
                  </Button>
                </div>
                <div className="grid gap-3 pt-3 text-sm text-muted-foreground sm:grid-cols-3">
                  <div className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-primary" /> Local service area</div>
                  <div className="flex items-center"><Clock3 className="mr-2 h-4 w-4 text-primary" /> Quick estimates</div>
                  <div className="flex items-center"><ShieldCheck className="mr-2 h-4 w-4 text-primary" /> Insured team</div>
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8">
                <h2 className="text-xl font-semibold">Why homeowners switch to Rene&apos;s</h2>
                <ul className="mt-6 space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start text-sm text-muted-foreground">
                      <CheckCircle2 className="mr-3 mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 rounded-xl border border-border/70 bg-secondary/40 p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Seasonal Special:</p>
                  Bundle mowing + cleanup and get priority scheduling this month.
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-9 flex items-center justify-between gap-3">
              <h2 className="text-3xl font-semibold">Services</h2>
              <p className="text-sm text-muted-foreground">Customized by property size and needs</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {services.map(({ title, description, icon: Icon }) => (
                <article key={title} className="glass-card p-6">
                  <div className="mb-4 inline-flex rounded-lg border border-primary/30 bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="border-y border-border/60 bg-secondary/20">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
              <h2 className="text-3xl font-semibold">How it works</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {processSteps.map((step, index) => (
                  <div key={step} className="rounded-xl border border-border/70 bg-card/40 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step {index + 1}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="reviews" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="text-3xl font-semibold">Client reviews</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="glass-card p-6">
                  <div className="mb-3 flex text-accent">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-muted-foreground">“{testimonial.quote}”</blockquote>
                  <p className="mt-4 text-sm font-medium text-foreground">— {testimonial.name}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="border-t border-border/60 bg-card/40">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
              <div className="grid gap-8 rounded-2xl border border-border/60 bg-background/80 p-8 md:grid-cols-[1.2fr_1fr] md:items-center">
                <div>
                  <h2 className="text-3xl font-semibold">Ready to refresh your property?</h2>
                  <p className="mt-3 text-muted-foreground">
                    Call or message us to get a free estimate. We&apos;ll recommend a plan that matches your yard and budget.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full rounded-xl">
                    <a href="tel:+15551234567"><Phone className="mr-2 h-4 w-4" />Call (555) 123-4567</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full rounded-xl">
                    <a href="mailto:hello@renesoutdoormaintenance.com">Email for Quote</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Index;
