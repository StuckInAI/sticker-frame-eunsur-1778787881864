export interface PlacedSticker {
  id: string;
  emoji: string;
  label: string;
  x: number;       // percent of canvas width
  y: number;       // percent of canvas height
  size: number;    // px
  rotation: number; // degrees
}

export interface PhotoSlot {
  id: number;
  dataUrl: string | null;
}

export type FrameLayout = '4cut' | '2cut' | 'strip';
