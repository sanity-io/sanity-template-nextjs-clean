import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/lib/api";
import { pageSlugQuery, postSlugQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
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
  // Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
  link: Link | undefined
): Promise<string | null> {
  if (!link) return null;

  switch (link.linkType) {
    case "url":
      return link.url || null;
    case "page":
      if (link.page?._ref) {
        const pageSlug = await sanityFetch({
          query: pageSlugQuery,
          params: { id: link.page._ref },
        });
        return pageSlug ? `/${pageSlug?.slug}` : null;
      }
      return null;
    case "post":
      if (link.post?._ref) {
        const postSlug = await sanityFetch({
          query: postSlugQuery,
          params: { id: link.post._ref },
        });
        return postSlug ? `/posts/${postSlug?.slug}` : null;
      }
      return null;
    default:
      return null;
  }
}
