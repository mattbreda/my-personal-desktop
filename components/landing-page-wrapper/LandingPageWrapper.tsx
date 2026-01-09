'use client';

import Dither from '../dither/Dither';
import { Loader } from '../loader/Loader';
import { MobileWIP } from '../mobile-wip/MobileWIP';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import { useIsMobile } from '@/hooks/useIsMobile';

export const LandingPageWrapper = () => {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return null; // Or a loading spinner if preferred, to prevent flash
  }

  if (isMobile) {
    return <MobileWIP />;
  }

  return (
    <div className="w-full h-full relative">
      <Dither
        //waveColor={[0.8, 0.5, 0]}
        waveColor={[0.5, 0.5, 0.5]}
        disableAnimation={false}
        enableMouseInteraction={false}
        colorNum={4}
        waveAmplitude={0.15}
        waveFrequency={3}
        waveSpeed={0.05}
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="bg-background w-fit p-5 border-orange-500 border-2 pointer-events-auto">
          <Loader />
        </div>
      </div>
      <div className="absolute top-5 right-5 z-index-50">
        <ThemeToggle />
      </div>
    </div>
  );
};
