export const PixelSprite = ({ art, palette, size = 4, className = "", style }) => {
  const rows = art.length;
  const cols = art[0].length;
  const rects = [];
  art.forEach((row, y) =>
    row.split("").forEach((ch, x) => {
      if (palette[ch])
        rects.push(
          <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={palette[ch]} />
        );
    })
  );
  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      width={cols * size}
      height={rows * size}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
};
