import { CreateBarPathParams, DataPoint, WaveformProps } from "./types";

export const createBarPath = ({ x, y, barWidth, rectHeight, height }: CreateBarPathParams): string => {
  const cornerRadius = Math.min(barWidth / 2, rectHeight / 2);

  return [
    `M ${x},${height}`,
    `L ${x},${y + cornerRadius}`,
    `Q ${x},${y} ${x + cornerRadius},${y}`,
    `L ${x + barWidth - cornerRadius},${y}`,
    `Q ${x + barWidth},${y} ${x + barWidth},${y + cornerRadius}`,
    `L ${x + barWidth},${height}`,
    "Z",
  ].join(" ");
};

export const getWaveformDataPoints = ({
  waveform,
  height,
  width,
  barWidth,
  barHeight,
  gap,
}: WaveformProps): DataPoint[] => {
  const units = width! / (barWidth + gap);
  const step = Math.floor(waveform.length / units);
  const amp = height / 2;

  let data: DataPoint[] = [];
  let maxDataPoint = 0;

  for (let i = 0; i < units; i++) {
    const mins: number[] = [];
    let minCount = 0;
    const maxs: number[] = [];
    let maxCount = 0;

    for (let j = 0; j < step && i * step + j < waveform.length; j++) {
      const datum = waveform[i * step + j];

      if (datum <= 0) {
        mins.push(datum);
        minCount++;
      }

      if (datum > 0) {
        maxs.push(datum);
        maxCount++;
      }
    }
    const minAvg = mins.reduce((a, c) => a + c, 0) / minCount;
    const maxAvg = maxs.reduce((a, c) => a + c, 0) / maxCount;

    const dataPoint = { max: maxAvg, min: minAvg };

    if (dataPoint.max > maxDataPoint) maxDataPoint = dataPoint.max;
    if (Math.abs(dataPoint.min) > maxDataPoint) maxDataPoint = Math.abs(dataPoint.min);

    data.push(dataPoint);
  }

  if (amp * 0.8 > maxDataPoint * amp) {
    const adjustmentFactor = (amp * 0.8) / maxDataPoint;
    data = data.map((dp) => ({
      max: dp.max * adjustmentFactor,
      min: dp.min * adjustmentFactor,
    }));
  }

  return data;
};
