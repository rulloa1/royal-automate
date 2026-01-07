import React from 'react';

export const PreviewWatermark = () => {
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
