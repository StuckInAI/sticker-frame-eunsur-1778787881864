import { StickerItem } from '@/types';

export const STICKER_CATEGORIES = ['Stars', 'Hearts', 'Animals', 'Objects', 'Flowers', 'Y2K'];

export const ALL_STICKERS: StickerItem[] = [
  // Stars
  { id: 's1', emoji: '⭐', label: 'Star', category: 'Stars' },
  { id: 's2', emoji: '✨', label: 'Sparkle', category: 'Stars' },
  { id: 's3', emoji: '🌟', label: 'Glowing Star', category: 'Stars' },
  { id: 's4', emoji: '💫', label: 'Dizzy Star', category: 'Stars' },
  { id: 's5', emoji: '🌠', label: 'Shooting Star', category: 'Stars' },
  { id: 's6', emoji: '⚡', label: 'Lightning', category: 'Stars' },
  // Hearts
  { id: 'h1', emoji: '💖', label: 'Sparkling Heart', category: 'Hearts' },
  { id: 'h2', emoji: '💕', label: 'Two Hearts', category: 'Hearts' },
  { id: 'h3', emoji: '💗', label: 'Growing Heart', category: 'Hearts' },
  { id: 'h4', emoji: '💝', label: 'Heart Ribbon', category: 'Hearts' },
  { id: 'h5', emoji: '💓', label: 'Beating Heart', category: 'Hearts' },
  { id: 'h6', emoji: '🩷', label: 'Pink Heart', category: 'Hearts' },
  // Animals
  { id: 'a1', emoji: '🐱', label: 'Cat', category: 'Animals' },
  { id: 'a2', emoji: '🐰', label: 'Bunny', category: 'Animals' },
  { id: 'a3', emoji: '🐻', label: 'Bear', category: 'Animals' },
  { id: 'a4', emoji: '🦋', label: 'Butterfly', category: 'Animals' },
  { id: 'a5', emoji: '🐸', label: 'Frog', category: 'Animals' },
  { id: 'a6', emoji: '🦄', label: 'Unicorn', category: 'Animals' },
  // Objects
  { id: 'o1', emoji: '🎀', label: 'Bow', category: 'Objects' },
  { id: 'o2', emoji: '💎', label: 'Gem', category: 'Objects' },
  { id: 'o3', emoji: '🎵', label: 'Music', category: 'Objects' },
  { id: 'o4', emoji: '🍭', label: 'Lollipop', category: 'Objects' },
  { id: 'o5', emoji: '🌈', label: 'Rainbow', category: 'Objects' },
  { id: 'o6', emoji: '🎠', label: 'Carousel', category: 'Objects' },
  // Flowers
  { id: 'f1', emoji: '🌸', label: 'Cherry Blossom', category: 'Flowers' },
  { id: 'f2', emoji: '🌺', label: 'Hibiscus', category: 'Flowers' },
  { id: 'f3', emoji: '🌼', label: 'Daisy', category: 'Flowers' },
  { id: 'f4', emoji: '🌻', label: 'Sunflower', category: 'Flowers' },
  { id: 'f5', emoji: '💐', label: 'Bouquet', category: 'Flowers' },
  { id: 'f6', emoji: '🌷', label: 'Tulip', category: 'Flowers' },
  // Y2K
  { id: 'y1', emoji: '💿', label: 'CD', category: 'Y2K' },
  { id: 'y2', emoji: '📱', label: 'Phone', category: 'Y2K' },
  { id: 'y3', emoji: '🦋', label: 'Butterfly Clip', category: 'Y2K' },
  { id: 'y4', emoji: '👑', label: 'Crown', category: 'Y2K' },
  { id: 'y5', emoji: '🔮', label: 'Crystal Ball', category: 'Y2K' },
  { id: 'y6', emoji: '🌙', label: 'Moon', category: 'Y2K' },
];

export const FRAME_TEMPLATES: import('@/types').FrameTemplate[] = [
  { id: 'f1', name: 'Classic Pink', cols: 2, rows: 2, borderColor: '#ff85c2', bgColor: '#fff0f8' },
  { id: 'f2', name: 'Lavender Dream', cols: 2, rows: 2, borderColor: '#c97ef7', bgColor: '#f5eeff' },
  { id: 'f3', name: 'Baby Blue', cols: 2, rows: 2, borderColor: '#85c8ff', bgColor: '#f0f8ff' },
  { id: 'f4', name: 'Mint Fresh', cols: 2, rows: 2, borderColor: '#a0e0b8', bgColor: '#f0fdf4' },
  { id: 'f5', name: 'Peach Fuzz', cols: 2, rows: 2, borderColor: '#ffb085', bgColor: '#fff8f0' },
];
