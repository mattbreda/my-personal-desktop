import React from 'react';

export const MobileWIP = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-mono p-5 text-center">
      <div className="border border-foreground p-8 max-w-sm relative">
        <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-bold">
          SYSTEM_MESSAGE
        </div>
        <div className="mb-6 text-4xl animate-pulse">⚠️</div>
        <h1 className="text-xl font-bold mb-4">MOBILE VER. UNAVAILABLE</h1>
        <p className="text-sm opacity-80 mb-6">
          The mobile interface is currently under construction.
        </p>
        <p className="text-xs border-t border-dashed border-foreground/30 pt-4">
          Please access via desktop terminal for full system access.
        </p>
      </div>
      <div className="mt-8 text-xs opacity-50">ERR_DISPLAY_width_TOO_SMALL</div>
    </div>
  );
};
