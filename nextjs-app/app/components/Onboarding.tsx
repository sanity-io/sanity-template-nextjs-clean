"use client";

/**
 * This file is used for onboarding when you don't have content yet and are using the template for the first time.
 * Once you have provided a url for the environment variable NEXT_PUBLIC_SANITY_STUDIO_URL, and have content, you can delete this file.
 */

import Link from "next/link";

import { studioUrl } from "@/sanity/lib/api";

export default function Onboarding() {
  return (
    <div className="max-w-2xl mx-auto grid grid-flow-row gap-6 py-12 text-center bg-red-500 text-white rounded-lg p-8">
      <svg
        className="mx-auto h-10 w-10 text-gray-400"
        aria-hidden="true"
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="512" height="512" fill="#ffffff" rx="30" />
        <path
          d="M161.527 136.723C161.527 179.76 187.738 205.443 240.388 219.095L296 232.283C345.687 243.852 376 272.775 376 319.514C376 341.727 369.162 360.931 357.538 375.971C357.538 329.232 333.607 303.78 276.171 288.74L221.47 276.246C177.709 266.065 143.977 242.464 143.977 191.56C143.977 170.505 150.359 151.994 161.527 136.723Z"
          fill="#F03E2F"
        />
        <path
          opacity="0.5"
          d="M323.35 308.176C347.054 323.679 357.538 345.197 357.538 376.202C337.709 401.654 303.293 416 262.724 416C194.575 416 146.484 381.756 136 322.753H201.641C210.074 350.056 232.41 362.551 262.268 362.551C298.735 362.32 322.895 342.652 323.35 308.176Z"
          fill="#F03E2F"
        />
        <path
          opacity="0.5"
          d="M195.715 200.816C172.923 186.007 161.527 165.183 161.527 136.954C180.672 111.503 213.493 96 253.835 96C323.35 96 363.692 133.252 373.721 185.776H310.359C303.293 165.183 285.971 148.986 254.291 148.986C220.33 148.986 197.311 169.116 195.715 200.816Z"
          fill="#F03E2F"
        />
      </svg>
      {process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ? ( // if NEXT_PUBLIC_SANITY_STUDIO_URL environment variable is set, show create post button
        <OnboardingMessage
          message={{
            title: "No posts yet",
            description: "Get started by creating a new post.",
          }}
          link={{
            title: "Create Post",
            href: `${studioUrl}/structure/intent/create/template=post;type=post;path=title`,
          }}
        />
      ) : (
        // if NEXT_PUBLIC_SANITY_STUDIO_URL environment variable is not set, Link to documentation to deploy a studio
        <OnboardingMessage
          message={{
            title: "Deploy a Sanity Studio",
            description:
              "You must first deploy a Sanity Studio and add the URL to your .env.local file.",
          }}
          link={{
            title: "Learn how to deploy a Sanity Studio",
            href: "https://github.com/sanity-io/sanity-template-nextjs-clean?tab=readme-ov-file#-2-deploy-sanity-studio",
            showIcon: false,
          }}
        />
      )}
    </div>
  );
}

type OnboardingMessageProps = {
  message: {
    title: string;
    description: string;
  };
  link: {
    title: string;
    href: string;
    showIcon?: boolean;
  };
};

const OnboardingMessage = ({ message, link }: OnboardingMessageProps) => {
  return (
    <>
      <div>
        <h3 className="text-2xl font-semibold">{message.title}</h3>
        <p className="mt-1 text-sm text-white/80">{message.description}</p>
      </div>

      <div>
        <Link
          className="inline-flex rounded-full gap-2 items-center bg-white text-red-500 hover:bg-red-100 focus:bg-red-200 py-3 px-6 transition-colors duration-200"
          href={link.href}
          target="_blank"
        >
          {link.title}
          {(link.showIcon ?? true) && (
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          )}
        </Link>
      </div>
    </>
  );
};

export function PageOnboarding() {
  return (
    <div className="max-w-2xl mx-auto grid grid-flow-row gap-6 py-12 text-center bg-red-500 text-white rounded-lg p-8">
      <svg
        className="mx-auto h-10 w-10 text-gray-400"
        aria-hidden="true"
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="512" height="512" fill="#ffffff" rx="30" />
        <path
          d="M161.527 136.723C161.527 179.76 187.738 205.443 240.388 219.095L296 232.283C345.687 243.852 376 272.775 376 319.514C376 341.727 369.162 360.931 357.538 375.971C357.538 329.232 333.607 303.78 276.171 288.74L221.47 276.246C177.709 266.065 143.977 242.464 143.977 191.56C143.977 170.505 150.359 151.994 161.527 136.723Z"
          fill="#F03E2F"
        />
        <path
          opacity="0.5"
          d="M323.35 308.176C347.054 323.679 357.538 345.197 357.538 376.202C337.709 401.654 303.293 416 262.724 416C194.575 416 146.484 381.756 136 322.753H201.641C210.074 350.056 232.41 362.551 262.268 362.551C298.735 362.32 322.895 342.652 323.35 308.176Z"
          fill="#F03E2F"
        />
        <path
          opacity="0.5"
          d="M195.715 200.816C172.923 186.007 161.527 165.183 161.527 136.954C180.672 111.503 213.493 96 253.835 96C323.35 96 363.692 133.252 373.721 185.776H310.359C303.293 165.183 285.971 148.986 254.291 148.986C220.33 148.986 197.311 169.116 195.715 200.816Z"
          fill="#F03E2F"
        />
      </svg>
      {process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ? ( // if NEXT_PUBLIC_SANITY_STUDIO_URL environment variable is set, show create post button
        <OnboardingMessage
          message={{
            title: "About Page (/about) does not exist yet",
            description: "Get started by creating an about page.",
          }}
          link={{
            title: "Create Page",
            href: `${studioUrl}/structure/intent/create/template=page;type=page;path=name`,
          }}
        />
      ) : (
        // if NEXT_PUBLIC_SANITY_STUDIO_URL environment variable is not set, Link to documentation to deploy a studio
        <OnboardingMessage
          message={{
            title: "Deploy a Sanity Studio",
            description:
              "You must first deploy a Sanity Studio and add the URL to your .env.local file.",
          }}
          link={{
            title: "Learn how to deploy a Sanity Studio",
            href: "https://github.com/sanity-io/sanity-template-nextjs-clean?tab=readme-ov-file#-2-deploy-sanity-studio",
            showIcon: false,
          }}
        />
      )}
    </div>
  );
}
