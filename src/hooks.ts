import { WaveformProps } from "./types";
import { createBarPath, getWaveformDataPoints } from "./utils";

export const useSvgWaveform = ({ waveform, width, height, barWidth, barColor, gap }: WaveformProps) => {
  const renderWaveform = (svgRef: React.RefObject<SVGSVGElement>) => {
    const parentWidth = svgRef.current.parentElement?.clientWidth || 0;

    const data = getWaveformDataPoints({
      waveform,

      width: width || parentWidth,
      height,
      gap,

      barWidth,
      barHeight: height,
      barColor,
    });

    data.forEach(({ min, max }, i) => {
      const pathData = createBarPath({
        x: i * (barWidth + gap),
        y: height - Math.round((max - min) / 2),
        barWidth,
        rectHeight: Math.round((max - min) / 2),
        height,
      });

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      path.setAttribute("d", pathData);
      path.setAttribute("fill", barColor);

      svgRef.current.appendChild(path);
    });
  };

  return { renderWaveform };
};
