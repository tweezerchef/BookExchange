import { useState, useEffect, RefObject } from "react";

interface Breakpoint {
  width: number;
  booksPerPage: number;
}

export function useContainerQuery(
  ref: RefObject<HTMLElement>,
  breakpoints: Breakpoint[]
) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;

      const { contentRect } = entries[0];
      console.log("Current width:", contentRect.width); // Debug log
      setWidth(contentRect.width);
    });
    if (ref.current) resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);
  const matchedBreakpoint =
    breakpoints.find((breakpoint) => width >= breakpoint.width) ||
    breakpoints[0];
  console.log("Matched breakpoint:", matchedBreakpoint); // Debug log

  return matchedBreakpoint.booksPerPage;
}
