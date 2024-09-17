import Head from "next/head";
import { notFound } from "next/navigation";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getPageQuery, pagesSlugs } from "@/sanity/lib/queries";
import { Page as PageType } from "@/sanity.types";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return await sanityFetch({
    query: pagesSlugs,
    perspective: "published",
    stega: false,
  });
}

export default async function Page({ params }: Props) {
  const [page] = await Promise.all([
    sanityFetch({ query: getPageQuery, params }),
  ]);

  if (!page?._id) {
    return notFound();
  }

  return (
    <div className="my-12 lg:my-24">
      <Head>
        <title>My page title</title>
      </Head>
      <div className="">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {page.heading}
              </h2>
              <p className="mt-4 text-xl leading-8 text-gray-600">
                {page.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PageBuilderPage page={page as PageType} />
    </div>
  );
}
