const FluidBackground = () => {
    return (
        <div className="fixed inset-0 -z-20 pointer-events-none" style={{ background: 'hsl(120, 10%, 4%)' }}>
            <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at 30% 20%, hsla(142, 40%, 15%, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsla(45, 60%, 30%, 0.08) 0%, transparent 50%)'
            }} />
        </div>
    );
};

export default FluidBackground;
