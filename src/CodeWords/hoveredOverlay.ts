import { useEffect } from 'react';

const [initialXInPercentage, initialYInPercentage] = [-50, -50];

const getBackgroundImageStyle = (xInPercentage: number, yInPercentage: number) =>
  `radial-gradient(circle at ${xInPercentage}% ${yInPercentage}%,
        rgba(30, 67, 145, 0) 0%,
        rgba(30, 67, 145, 0) 120px,
        rgba(30, 67, 145, 1) 180px,
        rgba(30, 67, 145, 1) 100%)`;

export function useHoveredOverlay(overlay: HTMLDivElement | null, container: HTMLDivElement | null) {
  useEffect(() => {
    if (overlay && container) {
      overlay.addEventListener('mousemove', moveOverlay);
      container.addEventListener('mouseleave', resetOverlay);
    }
    return () => {
      if (overlay && container) {
        overlay.removeEventListener('mousemove', moveOverlay);
        container.removeEventListener('mouseleave', resetOverlay);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay, container]);

  function moveOverlay(event: MouseEvent) {
    if (!overlay || !container) {
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;
    const nextXInPercentage = (mouseX / containerRect.width) * 100;
    const nextYInPercentage = (mouseY / containerRect.height) * 100;
    overlay.style.backgroundImage = getBackgroundImageStyle(nextXInPercentage, nextYInPercentage);
  }

  function resetOverlay() {
    if (!overlay) {
      return;
    }
    overlay.style.backgroundImage = getBackgroundImageStyle(initialXInPercentage, initialYInPercentage);
  }
}
