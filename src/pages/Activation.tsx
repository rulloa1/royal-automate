import { ActivationForm } from "@/components/ActivationForm";
import LandingHeader from "@/components/landing/LandingHeader";

export default function Activation() {
    return (
        <div className="min-h-screen bg-background">
            <LandingHeader />
            <div className="pt-24 pb-12 bg-muted/20">
                <ActivationForm />
            </div>
        </div>
    );
}
