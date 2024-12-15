import React from "react";
import { useSvgWaveform } from "./hooks";
import { WaveformProps } from "./types";

const SVG: React.FC<WaveformProps> = ({ waveform, barColor, barHeight, barWidth, gap, height, width, ...props }) => {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const { renderWaveform } = useSvgWaveform({
    waveform,
    barColor,
    barHeight,
    barWidth,
    gap,
    height,
    width,
  });

  React.useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    renderWaveform(svgRef as React.RefObject<SVGSVGElement>);
  }, []);

  return (
    <svg
      ref={svgRef}
      height={height}
      width={width}
      style={{
        display: "block",
        width: "100%",
      }}
      {...props}
    />
  );
};

export const Waveform = {
  SVG,
};
