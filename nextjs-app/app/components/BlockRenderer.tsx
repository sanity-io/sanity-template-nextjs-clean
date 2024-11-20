import React from "react";

import Cta from "@/app/components/Cta";
import Info from "@/app/components/InfoSection";

type BlocksType = {
  [key: string]: React.FC<any>;
};

type BlockType = {
  _type: string;
  _id: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
};

const Blocks: BlocksType = {
  callToAction: Cta,
  infoSection: Info,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({ block, index }: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== "undefined") {
    return React.createElement(Blocks[block._type], {
      key: block._id,
      block: block,
      index: index,
    });
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
