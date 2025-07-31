import { Suspense } from "react";

import ResolvedLink from "@/app/components/ResolvedLink";
import PortableText from "./PortableText";
import { PortableTextBlock } from "next-sanity";
import CoverImage from "./CoverImage";
import cn from "classnames";
import { stegaClean } from "@sanity/client/stega";
import { ExtractPageBuilderType } from "@/sanity/lib/types";

type CtaProps = {
  block: ExtractPageBuilderType<"callToAction">;
  index: number;
};

export default function CTA({ block }: CtaProps) {
  const { heading, eyebrow, body = [], button, image } = block;

  let layoutClasses = "";
  const contentAlignment = stegaClean(block.layout?.contentAlignment);
  const orientation = stegaClean(block.layout?.orientation);

  switch (contentAlignment) {
    case "textFirst":
      switch (orientation) {
        case "horizontal":
          layoutClasses = "flex-row justify-between items-center px-12 gap-4";
          break;
        case "vertical":
          layoutClasses = "flex-col px-12 gap-4";
          break;
      }
      break;
    case "mediaFirst":
      switch (orientation) {
        case "horizontal":
          layoutClasses =
            "flex-row-reverse justify-between items-center px-12 gap-4";
          break;
        case "vertical":
          layoutClasses = "flex-col-reverse px-12 gap-4";
          break;
      }
      break;
  }

  return (
    <div className={cn("flex py-6 min-h-100 my-2", layoutClasses)}>
      <div className="flex flex-col gap-6 justify-center">
        <div className="max-w-xl flex flex-col gap-3 ">
          {eyebrow && (
            <h2 className="text-sm tracking-tight text-[#3a454a]">{eyebrow}</h2>
          )}
          {heading && (
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl mb-4">
              {heading}
            </h2>
          )}
          {body && <PortableText value={body as PortableTextBlock[]} />}
        </div>

        <Suspense fallback={null}>
          {button?.buttonText && button?.link && (
            <div className="flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <ResolvedLink
                link={button?.link}
                className="rounded-lg flex gap-2 mr-6 items-center bg-black hover:scale-110 py-3 px-6 text-white transition-colors duration-200"
              >
                {button?.buttonText}
              </ResolvedLink>
            </div>
          )}
        </Suspense>
      </div>
      {image && (
        <CoverImage
          image={block.image}
          scalingFactorX={2}
          scalingFactorY={2}
          className="rounded-xl"
        />
      )}
    </div>
  );
}
