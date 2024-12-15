export interface CreateBarPathParams {
  x: number;
  y: number;
  barWidth: number;
  rectHeight: number;
  height: number;
}

export interface WaveformProps extends React.SVGProps<SVGSVGElement> {
  waveform: Float32Array;
  width?: number;
  height: number;
  barColor: string;
  barWidth: number;
  barHeight?: number;
  gap: number;
  className?: string;
}

export interface DataPoint {
  min: number;
  max: number;
}
