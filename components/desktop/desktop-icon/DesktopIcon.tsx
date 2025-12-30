import Image from 'next/image';

interface DesktopIconProps {
  title: string;
  onClick: () => void;
  icon?: string;
}

export const DesktopIcon = ({ title, onClick, icon }: DesktopIconProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 w-20 group focus:outline-none cursor-pointer"
    >
      <div className="w-16 h-16 flex items-center justify-center transition-colors">
        {icon ? (
          <Image
            src={'/' + icon}
            alt={title}
            width={100}
            height={100}
            className=" group-hover:invert"
          />
        ) : (
          <span className="text-2xl font-bold">[]</span>
        )}
      </div>
      <span className="text-xs text-center bg-background px-1 border border-transparent group-focus:border-dotted group-focus:border-foreground">
        {title}
      </span>
    </button>
  );
};
