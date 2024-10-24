import { stegaClean } from "@sanity/client/stega";
import { Image } from "next-sanity/image";

import { urlForImage } from "@/sanity/lib/utils";

interface CoverImageProps {
  image: any;
  priority?: boolean;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority } = props;
  const image = source?.asset?._ref ? (
    <Image
      className="rounded-2xl shadow-md transition-shadow object-cover"
      fill={true}
      alt={stegaClean(source?.alt) || ""}
      src={
        urlForImage(source)
          ?.height(720)
          .width(1280)
          .auto("format")
          .url() as string
      }
      sizes="100vw"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "100%" }} />
  );

  return <div className="relative aspect-video">{image}</div>;
}
