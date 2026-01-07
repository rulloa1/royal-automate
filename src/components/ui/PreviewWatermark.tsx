import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PreviewWatermark = () => {
    const [searchParams] = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if URL has ?ref=royscompany
        const ref = searchParams.get('ref');
        if (ref === 'royscompany') {
            setIsVisible(true);
        }
    }, [searchParams]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.06]">
            <div className="absolute inset-0 flex flex-wrap items-center justify-center -rotate-12 scale-150 transform">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="text-foreground text-4xl font-black uppercase whitespace-nowrap p-12 select-none"
                    >
                        Preview Site
                    </div>
                ))}
            </div>
        </div>
    );
};
