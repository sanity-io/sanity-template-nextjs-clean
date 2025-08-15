"use client";

import { stegaClean } from "@sanity/client/stega";
import { Image } from "next-sanity/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { urlForImage } from "@/sanity/lib/utils";
import { useMediaDimensions } from "../hooks/media";

interface CoverImageProps {
  image: any;
  priority?: boolean;
  className?: string;
  widthAsPixels?: number;
  heightAsPixels?: number;
  widthAsViewportPercentage?: number;
  heightAsViewportPercentage?: number;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority, widthAsPixels, heightAsPixels, widthAsViewportPercentage, heightAsViewportPercentage } = props;
  const mediaDimensions = useMediaDimensions(widthAsViewportPercentage, heightAsViewportPercentage)

  if(!source?.asset?._ref) {
    return null;
  }

  if((widthAsPixels || heightAsPixels) && (widthAsViewportPercentage || heightAsViewportPercentage)) {
    throw new Error("Provide width and height either as pixels or as viewport percentages.");
  }

  const dimensions = getImageDimensions(source);

  // We go in order of preference: the direct numeric width and height props, 
  // then the media dimensions based on the viewport size and the two scaling factors (if both are provided), 
  // then the dimensions from the image asset itself as a fallback.
  const imageWidth = widthAsPixels || mediaDimensions.width || dimensions.width;
  const imageHeight = heightAsPixels || mediaDimensions.height || dimensions.height;
  
  const image = source?.asset?._ref ? (
    <Image
      className={props.className}
      width={imageWidth}
      height={imageHeight}
      alt={stegaClean(source?.alt) || ""}
      src={urlForImage(source)?.width(imageWidth).height(imageHeight).url() as string}
      priority={priority}
    />
  ) : null;

  return image
}
