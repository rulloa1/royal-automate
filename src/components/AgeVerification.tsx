import { useState } from "react";
import logo from "@/assets/flava-depot-logo.png";

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification = ({ onVerified }: AgeVerificationProps) => {
  const [denied, setDenied] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
      <div className="glass-card p-10 max-w-md w-full text-center space-y-6">
        <img src={logo} alt="Flava Depot" className="h-24 mx-auto object-contain" />
        
        <div className="divider" />

        {denied ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Sorry, you must be 21+ to enter.
            </h2>
            <p className="text-muted-foreground text-sm">
              Please come back when you're of legal age.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Are you 21 or older?
            </h2>
            <p className="text-muted-foreground text-sm">
              You must be of legal age to view this website.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <button
                onClick={onVerified}
                className="gradient-button text-base px-8 py-3"
              >
                Yes, I'm 21+
              </button>
              <button
                onClick={() => setDenied(true)}
                className="gradient-button-secondary text-base px-8 py-3"
              >
                No
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgeVerification;
