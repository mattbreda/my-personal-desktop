'use client';

import { useState, useRef } from 'react';
import { Window, WindowId, WindowState } from './window/Window';
import { DesktopIcon } from './desktop-icon/DesktopIcon';
import { initialWindowsState } from './windows/Windows';

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [windows, setWindows] = useState<WindowState[]>(initialWindowsState);

  const [topZIndex, setTopZIndex] = useState(1);

  const openWindow = (id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: true, zIndex: topZIndex + 1 } : w))
    );
    setTopZIndex((prev) => prev + 1);
  };

  const closeWindow = (id: WindowId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  };

  const bringToFront = (id: WindowId) => {
    setWindows((prev) => {
      const targetWindow = prev.find((w) => w.id === id);
      if (targetWindow && targetWindow.zIndex === topZIndex) return prev; // Already on top

      const newTopZIndex = topZIndex + 1;
      setTopZIndex(newTopZIndex);
      return prev.map((w) => (w.id === id ? { ...w, zIndex: newTopZIndex } : w));
    });
  };

  const updateWindowPosition = (id: WindowId, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  };

  const handleDragEnd = (id: WindowId) => {
    if (!desktopRef.current) return;
    const desktopRect = desktopRef.current.getBoundingClientRect();
    const desktopWidth = desktopRect.width;
    const desktopHeight = desktopRect.height;

    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;

        // Determine window dimensions (approximate or use a default if not tracked)
        // Ideally we would know the window's current WH, but for snapping we can be lenient.
        // We'll just ensure the top-left corner is somewhat within bounds,
        // or ensure it doesn't go too far off.

        let newX = w.x;
        let newY = w.y;

        // Snap logic: Keep at least 50px visible from each side?
        // Let's constrain Top-Left to be within [0, W-50] and [0, H-50]
        // But also not negative such that it's lost.

        const minVisible = 50;

        if (newX < 0) newX = 0;
        if (newX > desktopWidth - minVisible) newX = desktopWidth - minVisible;

        if (newY < 0) newY = 0;
        if (newY > desktopHeight - minVisible) newY = desktopHeight - minVisible;

        return { ...w, x: newX, y: newY };
      })
    );
  };

  return (
    <div
      ref={desktopRef}
      className="relative w-full h-full min-h-[500px] bg-[radial-gradient(var(--dots)_1px,transparent_1px)] bg-size-[16px_16px] overflow-hidden"
    >
      <div className="absolute top-0 left-0 p-4 flex flex-col gap-4">
        {windows.map((w) => (
          <DesktopIcon key={w.id} title={w.title} onClick={() => openWindow(w.id)} />
        ))}
      </div>

      {windows.map(
        (w) =>
          w.isOpen && (
            <Window
              key={w.id}
              {...w}
              onClose={() => closeWindow(w.id)}
              onFocus={() => bringToFront(w.id)}
              onMove={(x, y) => updateWindowPosition(w.id, x, y)}
              onDragEnd={() => handleDragEnd(w.id)}
            />
          )
      )}
      {children}
    </div>
  );
}
