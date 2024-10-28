import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import { Suspense } from "react";

import Avatar from "@/app/components/Avatar";
import CoverImage from "@/app/components/CoverImage";
import { MorePosts } from "@/app/components/Posts";
import PortableText from "@/app/components/PortableText";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return await sanityFetch({
    query: postPagesSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await sanityFetch({ query: postQuery, params, stega: false });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const [post] = await Promise.all([sanityFetch({ query: postQuery, params })]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <>
      <div className="">
        <div className="container my-12 lg:my-24 grid gap-12">
          <div>
            <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
              <div className="max-w-3xl flex flex-col gap-6">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                  {post.title}
                </h2>
              </div>
              <div className="max-w-3xl flex gap-4 items-center">
                {post.author &&
                  post.author.firstName &&
                  post.author.lastName && (
                    <Avatar person={post.author} date={post.date} />
                  )}
              </div>
            </div>
            <article className="gap-6 grid max-w-4xl">
              <div className="">
                <CoverImage image={post.coverImage} priority />
              </div>
              {post.content?.length && (
                <PortableText
                  className="max-w-2xl"
                  value={post.content as PortableTextBlock[]}
                />
              )}
            </article>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="container my-12 lg:my-24 grid gap-12">
          <aside>
            <Suspense>
              <MorePosts skip={post._id} limit={2} />
            </Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
