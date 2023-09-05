export function pureFadeIn(elementId: string, display?: string) {
  const element = document.getElementById(elementId);

  if (element) {
    element.style.opacity = "0";
    element.style.display = display || "block";

    function fadeIn() {
      const opacity = parseFloat(element.style.opacity);
      if (opacity + 0.02 <= 1) {
        element.style.opacity = (opacity + 0.02).toString();
        requestAnimationFrame(fadeIn);
      }
    }

    fadeIn();
  }
}

export function pureFadeOut(elementId: string) {
  const element = document.getElementById(elementId);
  element.style.opacity = "1";

  function fadeOut() {
    (element.style.opacity = (
      parseFloat(element.style.opacity) - 0.02
    ).toString()) < "0"
      ? (element.style.display = "none")
      : requestAnimationFrame(fadeOut);
  }

  fadeOut();
}
