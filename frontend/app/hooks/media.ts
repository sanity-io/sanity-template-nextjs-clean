import { useEffect, useState } from "react";

export const useMediaDimensions = (
  widthAsViewportPercentage: number | undefined,
  heightAsViewportPercentage: number | undefined
) => {
  const [mediaDimensions, setMediaDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateMediaDimensions = () => {
      if (widthAsViewportPercentage && heightAsViewportPercentage) {
        setMediaDimensions({
          width: Math.round(
            window.innerWidth * (widthAsViewportPercentage / 100)
          ),
          height: Math.round(
            window.innerHeight * (heightAsViewportPercentage / 100)
          ),
        });
      }
    };

    updateMediaDimensions();
    window.addEventListener("resize", updateMediaDimensions);
    return () => window.removeEventListener("resize", updateMediaDimensions);
  }, [widthAsViewportPercentage, heightAsViewportPercentage]);

  if (!(widthAsViewportPercentage && heightAsViewportPercentage)) {
    return { width: undefined, height: undefined };
  }

  return mediaDimensions;
};
