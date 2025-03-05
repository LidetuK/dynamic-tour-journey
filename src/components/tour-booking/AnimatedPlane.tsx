
import React, { useState, useEffect } from "react";
import { Plane } from "lucide-react";

const AnimatedPlane: React.FC = () => {
  const [planePosition, setPlanePosition] = useState(-50);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setPlanePosition(prev => {
        if (prev > window.innerWidth) {
          return -50;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div 
      className="absolute transform -translate-y-1/2"
      style={{ 
        left: `${planePosition}px`, 
        top: '15%',
        transition: 'left 0.05s linear',
        zIndex: 10
      }}
    >
      <Plane className="w-8 h-8 text-form-accent transform rotate-90" />
    </div>
  );
};

export default AnimatedPlane;
