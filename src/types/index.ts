export type StickerItem = {
  id: string;
  emoji: string;
  label: string;
  category: string;
};

export type PlacedSticker = {
  id: string;
  stickerId: string;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
};

export type PhotoSlot = {
  id: number;
  imageUrl: string | null;
};

export type FrameTemplate = {
  id: string;
  name: string;
  cols: number;
  rows: number;
  borderColor: string;
  bgColor: string;
};
