


export function loadScript(
    src: string,
    position: HTMLElement | null,
    id: string,
    callback: () => void
  ) {
    if (!position) {
      return;
    }

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;
    script.addEventListener("load", callback);

    position.appendChild(script);
  }

  export const autocompleteService = { current: null };