export type FrameLayout = '4cut' | '2cut' | 'strip';

export interface PhotoSlot {
  id: number;
  dataUrl: string | null;
  imageUrl?: string | null;
}

export interface PlacedSticker {
  id: string;
  emoji: string;
  label: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  scale?: number;
  zIndex?: number;
}

export interface StickerItem {
  id: string;
  emoji: string;
  label: string;
  category: string;
}

export interface FrameTemplate {
  id: string;
  name: string;
  borderColor: string;
  bgColor: string;
}
