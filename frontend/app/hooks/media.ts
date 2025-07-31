import { useEffect, useState } from "react";

export const useMediaDimensions = (widthDivisor: number = 2, heightDivisor: number = 2) => {
  const [mediaDimensions, setMediaDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateMediaDimensions = () => {
      setMediaDimensions({
        width: Math.round(window.innerWidth / widthDivisor),
        height: Math.round(window.innerHeight / heightDivisor)
      });
    };  

    updateMediaDimensions();
    window.addEventListener('resize', updateMediaDimensions);
    
    return () => window.removeEventListener('resize', updateMediaDimensions);
  }, [widthDivisor, heightDivisor])

  return mediaDimensions
}