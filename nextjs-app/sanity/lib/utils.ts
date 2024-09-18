import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/lib/api";
import { Link } from "@/sanity.types";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
  if (!link) return null;

  switch (link.linkType) {
    case "url":
      return link.url || null;
    case "page":
      if (link?.page) {
        return `/${link.page}`;
      }
      return null;
    case "post":
      if (link?.post) {
        return `/posts/${link.post}`;
      }
      return null;
    default:
      return null;
  }
}
