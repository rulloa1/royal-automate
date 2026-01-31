import { Quote, ArrowRight } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-[#0A0A0A] relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 border border-neutral-800">
            {/* Quote Icon */}
            <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-[#F95500] flex items-center justify-center">
              <Quote className="w-4 h-4 text-white" />
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 text-[#F95500] text-sm mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-[#F95500]" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span>Trusted by 50+ Contractors nationwide</span>
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
              "Lead Fix AI completely changed our business. We went from missing 30% of calls to booking jobs while we sleep."
            </blockquote>

            {/* Author */}
            <div>
              <p className="text-white font-medium">Mike Stevens</p>
              <p className="text-neutral-500 text-sm">Owner, Stevens Roofing & Siding</p>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-neutral-800">
              <p className="text-neutral-400 text-sm mb-4">Performance</p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-3xl font-bold text-white">100%</p>
                  <p className="text-neutral-500 text-sm">Answer Rate</p>
                </div>
                <div className="w-px bg-neutral-800" />
                <div>
                  <p className="text-3xl font-bold text-white">{"< 2min"}</p>
                  <p className="text-neutral-500 text-sm">Avg Booking Time</p>
                </div>
              </div>

              <button className="mt-6 inline-flex items-center gap-2 text-[#F95500] text-sm font-medium hover:gap-3 transition-all">
                View Case Study
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
