import { useEffect, useRef, useState } from "react";

export type WindowId = string;
export interface WindowState {
  id: WindowId;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  isOpen: boolean;
  zIndex: number;
}

interface WindowProps extends WindowState {
  onClose: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onDragEnd: () => void;
}

export function Window({
  title,
  content,
  x,
  y,
  zIndex,
  onClose,
  onFocus,
  onMove,
  onDragEnd,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // to prevent text selection
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      onMove(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, onMove, onDragEnd]);

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col border-2 border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] minw-80 min-h-64 ${
        isDragging ? "transition-none" : "transition-all duration-300 ease-out"
      }`}
      style={{
        left: x,
        top: y,
        zIndex: zIndex,
      }}
      onMouseDown={() => onFocus()}
    >
      <div
        className="bg-foreground text-background px-2 py-1 flex justify-between items-center cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="font-bold text-sm truncate mr-4">{title}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-5 h-5 flex items-center justify-center border border-background hover:bg-background hover:text-foreground transition-colors text-xs font-bold"
          aria-label="Close window"
        >
          X
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-background p-2">{content}</div>
    </div>
  );
}
