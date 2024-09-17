import Link from "next/link";
import { linkResolver } from "@/sanity/lib/utils";
import { use } from "react";

interface ResolvedLinkProps {
  link: any;
  children: React.ReactNode;
  className?: string; // Add className prop
}

export default function ResolvedLink({
  link,
  children,
  className,
}: ResolvedLinkProps) {
  const resolvedLink = use(linkResolver(link));

  if (typeof resolvedLink === "string") {
    return (
      <Link
        href={resolvedLink}
        target={link?.openInNewTab ? "_blank" : undefined}
        rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
        className={className} // Apply className to Link component
      >
        {children}
      </Link>
    );
  }
  return null;
}
