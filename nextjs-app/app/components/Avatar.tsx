import { Image } from "next-sanity/image";

import { urlForImage } from "@/sanity/lib/utils";
import DateComponent from "@/app/components/Date";

type Props = {
  person: {
    firstName: string | null;
    lastName: string | null;
    picture?: any;
  };
  date: string;
};

export default function Avatar({ person, date }: Props) {
  const { firstName, lastName, picture } = person;

  return (
    <div className="flex items-center">
      {picture?.asset?._ref ? (
        <div className="mr-4 h-9 w-9">
          <Image
            alt={picture?.alt || ""}
            className="h-full rounded-full object-cover"
            height={48}
            width={48}
            src={
              urlForImage(picture)
                ?.height(96)
                .width(96)
                .fit("crop")
                .url() as string
            }
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="flex flex-col">
        {firstName && lastName && (
          <div className="font-bold">
            {firstName} {lastName}
          </div>
        )}
        <div className="text-gray-500 text-sm">
          <DateComponent dateString={date} />
        </div>
      </div>
    </div>
  );
}
