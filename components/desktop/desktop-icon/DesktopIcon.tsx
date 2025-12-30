interface DesktopIconProps {
  title: string;
  onClick: () => void;
}

export const DesktopIcon = ({ title, onClick }: DesktopIconProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 w-20 group focus:outline-none"
    >
      <div className="w-12 h-12 border-2 border-foreground bg-background flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
        {/* Placeholder Icon */}
        <span className="text-2xl font-bold">[]</span>
      </div>
      <span className="text-xs text-center bg-background px-1 border border-transparent group-focus:border-dotted group-focus:border-foreground">
        {title}
      </span>
    </button>
  );
};
