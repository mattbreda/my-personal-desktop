export const Spacer = () => {
  return (
    <svg width="100%" height="10">
      <defs>
        <pattern id="pattern1" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <text x="0" y="6" id="background-text" fill="currentColor" className="text-xs">
            ░
          </text>
        </pattern>
      </defs>
      <rect
        id="background-rect"
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern1)"
      ></rect>
    </svg>
  );
};
