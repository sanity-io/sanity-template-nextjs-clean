import { Suspense } from "react";

import ResolvedLink from "@/app/components/ResolvedLink";
import CustomPortableText from "./PortableText";
import { PortableTextBlock } from "next-sanity";
import CoverImage from "./CoverImage";
import cn from "classnames";
import { stegaClean } from "@sanity/client/stega";
import { ExtractPageBuilderType } from "@/sanity/lib/types";

type CtaProps = {
  block: ExtractPageBuilderType<"callToAction">;
  index: number;
  // Needed if you want to createDataAttributes to do non-text overlays in Presentation (Visual Editing)
  pageType: string;
  pageId: string;
};

export default function CTA({ block }: CtaProps) {
  const { heading, eyebrow, body = [], button, image, theme } = block;
  const {
    customBackgroundColor,
    customTextColor,
    customButtonBgColor,
    customButtonTextColor,
  } = theme || {};
  const themeName = stegaClean(theme?.themeName) || 'light';

  let backgroundColor, textColor, buttonBgColor, buttonTextColor;
  switch (themeName) {
    case "dark":
      backgroundColor = "#22303c";
      textColor = "#FFFFFF";
      buttonBgColor = "#FFFFFF";
      buttonTextColor = "#000000";
      break;
    case "custom":
      backgroundColor = customBackgroundColor?.hex || "#FFFFFF";
      textColor = customTextColor?.hex || "#000000";
      buttonBgColor = customButtonBgColor?.hex || "#000000";
      buttonTextColor = customButtonTextColor?.hex || "#FFFFFF";
      break;
    case "light":
    default:
      backgroundColor = "#FFFFFF";
      textColor = "#000000";
      buttonBgColor = "#000000";
      buttonTextColor = "#FFFFFF";
      break;
  }

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
    <div
      className={cn("flex py-6 min-h-100 my-2", layoutClasses)}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="flex flex-col gap-6 justify-center">
        <div className="max-w-xl flex flex-col gap-3 ">
          {eyebrow && <h2 className="text-sm tracking-tight opacity-70">{eyebrow}</h2>}
          {heading && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {heading}
            </h2>
          )}
          {body && <CustomPortableText value={body as PortableTextBlock[]} themeName={themeName} customTextColor={textColor} />}
        </div>

        <Suspense fallback={null}>
          {button?.buttonText && button?.link && (
            <div
              className="flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0"
            >
              <ResolvedLink
                link={button?.link}
                className="rounded-lg flex gap-2 mr-6 items-center hover:scale-110 py-3 px-6 transition-colors duration-200"
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}

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
          widthAsViewportPercentage={50}
          heightAsViewportPercentage={50}
          className="rounded-xl"
        />
      )}
    </div>
  );
}
