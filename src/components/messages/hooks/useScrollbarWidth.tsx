import { useLayoutEffect, useState } from "react";

export function useScrollbarWidth() {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useLayoutEffect(() => {
    const calculateScrollbarWidth = () => {
      const documentWidth = document.documentElement.clientWidth;
      const windowWidth = window.innerWidth;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const scrollbarWidth = windowWidth - documentWidth;
      setScrollbarWidth(scrollbarWidth);
    };

    // Calculate it initially and whenever the window is resized
    calculateScrollbarWidth();
    window.addEventListener("resize", calculateScrollbarWidth);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", calculateScrollbarWidth);
  }, []);

  return scrollbarWidth;
}
