import Link from "next/link";

import BlockRenderer from "@/app/components/BlockRenderer";
import { Page } from "@/sanity.types";
import { studioUrl } from "@/sanity/lib/api";

type PageBuilderPageProps = {
  page: Page;
};

/**
 * The PageBuilder component is used to render the blocks from the `pageBuilder` field in the Page type in your Sanity Studio.
 */
export default function PageBuilder({ page }: PageBuilderPageProps) {
  if (page?.pageBuilder && page.pageBuilder.length > 0) {
    return (
      <>
        {page.pageBuilder.map((block: any, index: number) => (
          <BlockRenderer key={block._key} index={index} block={block} />
        ))}
      </>
    );
  }

  // If there are no blocks in the page builder.
  return (
    <>
      <div className="container">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          This page has no content!
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Open the page in Sanity Studio to add content.
        </p>
        <div className="mt-10 flex">
          <Link
            className="rounded-full flex gap-2 mr-6 items-center bg-black hover:bg-red-500 focus:bg-cyan-500 py-3 px-6 text-white transition-colors duration-200"
            href={`${studioUrl}/structure/intent/edit/template=page;type=page;path=pageBuilder;id=${page._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add content to this page
          </Link>
        </div>
      </div>
    </>
  );
}
