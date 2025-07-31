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
  width?: number;
  height?: number;
  scalingFactorX?: number;
  scalingFactorY?: number;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority, width, height, scalingFactorX, scalingFactorY } = props;
  const dimensions = getImageDimensions(source);
  const mediaDimensions = useMediaDimensions(scalingFactorX || 1, scalingFactorY || 1);

  // We go in order of preference: the direct numberic width and height props, then the media dimensions based on the viewport size and scaling factors, 
  // then the dimensions from the image asset itself as a fallback.
  const imageWidth = width || mediaDimensions.width || dimensions.width;
  const imageHeight = height || mediaDimensions.height || dimensions.height;
  
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
