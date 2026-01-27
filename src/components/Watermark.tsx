import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Watermark = () => {
    const [searchParams] = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const ref = searchParams.get("ref");
        if (ref === "royscompany") {
            setIsVisible(true);
        }
    }, [searchParams]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
            <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live Preview • RoysCompany</span>
            </div>
        </div>
    );
};
