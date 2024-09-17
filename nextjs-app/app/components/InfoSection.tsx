import { InfoSection } from "@/sanity.types";
import { type PortableTextBlock } from "next-sanity";
import PortableText from "@/app/components/PortableText";

type InfoProps = {
  block: InfoSection;
  index: number;
};

export default function CTA({ block }: InfoProps) {
  return (
    <div className="bg-white my-12">
      <div className="container">
        <h2 className="text-2xl md:text-3xl lg:text-4xl  font-bold">
          {block?.heading}
        </h2>
        <span>{block?.subheading}</span>
        <div className="prose prose-a:text-red-500 mt-4">
          {block?.content?.length && (
            <PortableText
              className=""
              value={block.content as PortableTextBlock[]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
