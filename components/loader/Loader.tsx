/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
//LOADING ASSETS ███▓▒░░░░░░░░░░░░

const TOTAL_BLOCKS = 18;

export const Loader = () => {
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [currentAsset, setCurrentAsset] = useState('');

  const assets = [
    'Initializing system...',
    'Loading core modules...',
    'Fetching stylesheets...',
    'Parsing JavaScript bundles...',
    'Loading web fonts...',
    'Rendering DOM elements...',
    'Initializing React components...',
    'Establishing API connections...',
    'Loading image assets...',
    'Compiling SASS modules...',
    'Hydrating application state...',
    'Optimizing performance...',
    'Finalizing render tree...',
    'Ready to launch...',
  ];

  const glyphs = ['░', '▒', '▓', '█'];

  const getGlyph = (index: number): string => {
    const blockProgress = (progress / 100) * TOTAL_BLOCKS;
    const blockPosition = blockProgress - index;

    if (blockPosition <= 0) return glyphs[0];
    if (blockPosition >= 1) return glyphs[3];

    const glyphIndex = Math.floor(blockPosition * glyphs.length);
    return glyphs[Math.min(glyphIndex, glyphs.length - 1)];
  };

  const navigateToHomePage = () => {
    if (progressRef.current >= 100 && window.innerWidth > 768) {
      router.push('/homepage');
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - linearProgress, 2);

      setProgress(easedProgress * 100);
      progressRef.current = easedProgress * 100;

      const assetIndex = Math.min(Math.floor(easedProgress * assets.length), assets.length - 1);
      setCurrentAsset(assets[assetIndex]);

      if (linearProgress >= 1) {
        clearInterval(interval);
      }
    }, 50);
    window.addEventListener('keydown', navigateToHomePage);

    return () => {
      window.removeEventListener('keydown', navigateToHomePage);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-foreground">
      <div className="text-center">
        <div className="font-mono text-4xl tracking-wider mb-4">
          {Array.from({ length: TOTAL_BLOCKS }, (_, i) => getGlyph(i)).join('')}
        </div>

        <div className="font-mono text-xl">
          LOADING_ASSETS: {progress < 100 ? `${Math.floor(progress)}%` : 'COMPLETE'}
        </div>

        {progress < 100 ? (
          <div className="font-mono text-sm mt-4 h-6">{currentAsset && `> ${currentAsset}`}</div>
        ) : (
          <button
            onClick={navigateToHomePage}
            type="button"
            className="font-mono text-sm font-bold text-orange-500 mt-4 h-6 animate-pulse cursor-pointer"
          >
            [ PRESS ANY KEY OR CLICK HERE TO CONTINUE ]
          </button>
        )}
      </div>
    </div>
  );
};
