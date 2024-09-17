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

import { client } from "@/sanity/lib/client";

export async function linkResolver(
  link: Link | undefined
): Promise<string | null> {
  if (!link) return null;

  switch (link.linkType) {
    case "url":
      return link.url || null;
    case "page":
      if (link.page?._ref) {
        const pageSlug = await client.fetch(
          `*[_type == "page" && _id == $id][0].slug.current`,
          { id: link.page._ref }
        );
        return pageSlug ? `/${pageSlug}` : null;
      }
      return null;
    case "post":
      if (link.post?._ref) {
        const postSlug = await client.fetch(
          `*[_type == "post" && _id == $id][0].slug.current`,
          { id: link.post._ref }
        );
        return postSlug ? `/posts/${postSlug}` : null;
      }
      return null;
    default:
      return null;
  }
}
