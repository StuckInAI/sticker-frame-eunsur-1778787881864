export type FrameLayout = '4cut' | '2cut' | '3cut';

export interface PhotoSlot {
  id: number;
  dataUrl: string | null;
}

export interface PlacedSticker {
  id: string;
  emoji: string;
  label: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export interface StickerItem {
  id: string;
  emoji: string;
  label: string;
  category: string;
}
