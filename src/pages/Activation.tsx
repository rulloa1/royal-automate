import { ActivationForm } from "@/components/ActivationForm";
import LandingHeader from "@/components/landing/LandingHeader";

export default function Activation() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#00FF9D] selection:text-black">
            <LandingHeader />
            <div className="pt-24 pb-12 bg-white/5">
                <ActivationForm />
            </div>
        </div>
    );
}
