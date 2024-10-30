"use client";

import { useEffect } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";
import { toast } from "sonner";

export function LiveErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ReactErrorBoundary>
  );
}

function Fallback({ error }: FallbackProps) {
  useEffect(() => {
    const msg = "Couldn't connect to Live Content API";
    console.error(`${msg}: `, error);
    const toastId = toast.error(msg, {
      id: "live-error-boundary",
      duration: Infinity,
      description: "See the browser console for more information",
      action: {
        label: "Retry",
        onClick: () => location.reload(),
      },
    });
    return () => {
      toast.dismiss(toastId);
    };
  }, [error]);

  return null;
}
