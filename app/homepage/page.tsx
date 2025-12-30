import { ThemeToggle } from '@/components/theme-toggle/ThemeToggle';
import { Desktop } from '@/components/desktop/Desktop';

export default function HomePage() {
  return (
    <div className="min-w-screen min-h-screen bg-background text-foreground font-mono">
      <div className="fixed w-full border-b border-foreground font-bold px-5 py-2 flex justify-between items-center bg-background h-16 z-50">
        <div className="text-4xl text-orange-500">MATTEO BREDA</div>
        <div className="flex items-center gap-2 text-lg font-light">
          <div>Full stack developer</div>
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full h-screen pt-16 ">
        <Desktop>
          <div className="absolute bottom-5 right-5 text-xs font-extralight bg-foreground text-background w-fit p-2 pointer-events-none opacity-50">
            This website is still WIP! Come back soon for some tasty updates
          </div>
        </Desktop>
      </div>
    </div>
  );
}
