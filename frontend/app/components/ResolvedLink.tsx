import Link from "next/link";

import { linkResolver } from "@/sanity/lib/utils";

interface ResolvedLinkProps {
  link: any;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ResolvedLink({
  link,
  children,
  className,
  style,
}: ResolvedLinkProps) {
  // resolveLink() is used to determine the type of link and return the appropriate URL.
  const resolvedLink = linkResolver(link);

  if (typeof resolvedLink === "string") {
    return (
      <Link
        href={resolvedLink}
        target={link?.openInNewTab ? "_blank" : undefined}
        rel={link?.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
        style={style || {}}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}
