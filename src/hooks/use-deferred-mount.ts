import { useEffect, useState } from "react";

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export function useDeferredMount(timeout = 1200) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const win = window as IdleWindow;
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const mount = () => setIsMounted(true);

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(mount, { timeout });
    } else {
      timeoutId = window.setTimeout(mount, timeout);
    }

    return () => {
      if (idleId !== undefined && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeout]);

  return isMounted;
}
