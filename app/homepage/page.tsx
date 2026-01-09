'use client';

import { ThemeToggle } from '@/components/theme-toggle/ThemeToggle';
import { Desktop } from '@/components/desktop/Desktop';
import { DigitalClock } from '@/components/digital-clock/DigitalClock';
import { MobileWIP } from '@/components/mobile-wip/MobileWIP';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function HomePage() {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return null;
  }

  if (isMobile) {
    return <MobileWIP />;
  }

  return (
    <div className="min-w-screen min-h-screen bg-background text-foreground font-mono">
      <div className="fixed w-full border-b border-foreground font-bold px-5 py-2 flex justify-between items-center bg-background h-10 z-50">
        <div className="text-md text-orange-500">MATTEO BREDA</div>
        <div className="flex items-center gap-2 text-sm font-light">
          <div>Full stack developer</div>
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full h-screen pt-10 ">
        <Desktop>
          <div className="absolute top-5 right-5">
            <DigitalClock />
          </div>
          <div className="absolute bottom-5 right-5 text-xs font-extralight bg-foreground text-background w-fit p-2 pointer-events-none opacity-50">
            This website is still WIP! Come back soon for some tasty updates
          </div>
        </Desktop>
      </div>
    </div>
  );
}
