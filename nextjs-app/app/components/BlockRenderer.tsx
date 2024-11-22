import React from "react";

import Cta from "@/app/components/Cta";
import Info from "@/app/components/InfoSection";
import { createDataAttribute } from "next-sanity";
import { createDataAttributeConfig } from "@/sanity/lib/utils";
import { Page } from "@/sanity.types";

type BlocksType = {
  [key: string]: React.FC<any>;
};

type BlockType = {
  _type: string;
  _key: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
  page: Page;
};

const Blocks: BlocksType = {
  callToAction: Cta,
  infoSection: Info,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({ block, index, page }: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== "undefined") {
    return (
      <div
        key={block._key}
        data-sanity={createDataAttribute(
          createDataAttributeConfig({
            id: page._id,
            type: page._type,
            path: `pageBuilder[_key=="${block._key}"]`,
          })
        ).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
        })}
      </div>
    );
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._id }
  );
}
