"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore, useTransition } from "react";

import { disableDraftMode } from "@/app/actions";

const emptySubscribe = () => () => {};

export default function AlertBanner() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const shouldShow = useSyncExternalStore(
    emptySubscribe,
    () => window.top === window,
    () => false
  );

  if (!shouldShow) return null;

  return (
    <div
      className={`${
        pending ? "animate-pulse" : ""
      } fixed bottom-0 left-0 z-50 w-full border-b bg-green-500 text-white`}
    >
      <div className="py-2 text-center text-sm">
        {pending ? (
          "Disabling draft mode..."
        ) : (
          <>
            {"Previewing drafts. "}
            <button
              type="button"
              onClick={() =>
                startTransition(() =>
                  disableDraftMode().then(() => {
                    router.refresh();
                  })
                )
              }
              className="hover:text-cyan underline transition-colors duration-200"
            >
              Back to published
            </button>
          </>
        )}
      </div>
    </div>
  );
}
