import React, { useRef, useState, useEffect } from 'react';

interface GradientBlindsProps {
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  mouseDampening?: number;
  distortAmount?: number;
  shineDirection?: 'left' | 'right' | 'top' | 'bottom';
  mixBlendMode?: string;
  className?: string;
  isDark?: boolean;
}

const GradientBlinds: React.FC<GradientBlindsProps> = ({
  gradientColors = ['#0F2445', '#F2A900'],
  angle = 45,
  noise = 0.3,
  blindCount = 12,
  blindMinWidth = 50,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  mouseDampening = 0.15,
  distortAmount = 0,
  shineDirection = 'left',
  mixBlendMode = 'overlay',
  className = '',
  isDark = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [targetMouse, setTargetMouse] = useState({ x: 0.5, y: 0.5 });
  const requestRef = useRef<number>(0);

  // Handle Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTargetMouse({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation Loop for Dampening
  const animate = () => {
    setMouse((prev) => ({
      x: prev.x + (targetMouse.x - prev.x) * mouseDampening,
      y: prev.y + (targetMouse.y - prev.y) * mouseDampening,
    }));
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [targetMouse]);

  // Generate Blinds
  const blinds = Array.from({ length: blindCount }).map((_, i) => i);

  // Gradient String
  const gradientString = `linear-gradient(${angle}deg, ${gradientColors.join(', ')})`;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: isDark ? '#0B111A' : '#FFFFFF',
      }}
    >
      {/* Blinds Container */}
      <div className="absolute inset-0 flex w-full h-full">
        {blinds.map((i) => {
          // Calculate Blind Properties
          const blindWidth = 100 / blindCount;
          const blindCenter = (i + 0.5) * blindWidth / 100;
          const distFromMouse = Math.abs(blindCenter - mouse.x);
          
          // Spotlight Effect Calculation
          const normalizedDist = Math.min(1, distFromMouse / spotlightRadius);
          const spotlight = Math.max(0, 1 - normalizedDist);
          const softSpotlight = Math.pow(spotlight, spotlightSoftness);

          // Calculate Transformation
          const rotation = (mouse.x - blindCenter) * distortAmount * 50; 
          const scaleY = 1 + (softSpotlight * 0.1); 

          // Adjust opacity logic for light mode to be more visible
          const baseOpacity = isDark ? 0.1 : 0.08;
          const activeOpacity = isDark ? 0.4 : 0.6; // Higher contrast in light mode
          const opacity = baseOpacity + (softSpotlight * spotlightOpacity * activeOpacity);

          return (
            <div
              key={i}
              className="relative h-full"
              style={{
                flex: 1,
                minWidth: blindMinWidth,
                transform: `scaleY(${scaleY}) skewY(${rotation * softSpotlight}deg)`,
                transformOrigin: 'center',
                transition: 'transform 0.1s linear',
                overflow: 'hidden',
                willChange: 'transform',
              }}
            >
              {/* Inner Gradient Blind */}
              <div
                className="absolute inset-0 w-full h-full transition-opacity duration-300"
                style={{
                  background: gradientString,
                  opacity: opacity,
                  mixBlendMode: isDark ? (mixBlendMode as any) : 'multiply',
                }}
              />
              
              {/* Shine Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(to bottom, transparent, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.02)'}, transparent)`,
                    opacity: softSpotlight * 0.5,
                    transform: `translateY(${(mouse.y - 0.5) * 100}%)`,
                    willChange: 'transform'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: noise,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default GradientBlinds;