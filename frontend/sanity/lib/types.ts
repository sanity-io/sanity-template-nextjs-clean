import { GetPageQueryResult } from "@/sanity.types";

export type PageBuilderSection = NonNullable<NonNullable<GetPageQueryResult>["pageBuilder"]>[number];
export type ExtractPageBuilderType<T extends PageBuilderSection["_type"]> = Extract<PageBuilderSection, { _type: T }>;