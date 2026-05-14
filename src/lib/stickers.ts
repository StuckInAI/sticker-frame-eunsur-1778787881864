import { StickerItem, FrameTemplate } from '@/types';

export const STICKER_CATEGORIES = [
  { id: 'hearts', label: '💖 Hearts' },
  { id: 'stars', label: '⭐ Stars' },
  { id: 'nature', label: '🌸 Nature' },
  { id: 'fun', label: '🎉 Fun' },
];

export const STICKERS: StickerItem[] = [
  { id: 's1', emoji: '💖', label: 'Heart', category: 'hearts' },
  { id: 's2', emoji: '💕', label: 'Two Hearts', category: 'hearts' },
  { id: 's3', emoji: '💗', label: 'Pink Heart', category: 'hearts' },
  { id: 's4', emoji: '💝', label: 'Ribbon Heart', category: 'hearts' },
  { id: 's5', emoji: '⭐', label: 'Star', category: 'stars' },
  { id: 's6', emoji: '✨', label: 'Sparkles', category: 'stars' },
  { id: 's7', emoji: '🌟', label: 'Glowing Star', category: 'stars' },
  { id: 's8', emoji: '💫', label: 'Dizzy Star', category: 'stars' },
  { id: 's9', emoji: '🌸', label: 'Blossom', category: 'nature' },
  { id: 's10', emoji: '🌺', label: 'Hibiscus', category: 'nature' },
  { id: 's11', emoji: '🦋', label: 'Butterfly', category: 'nature' },
  { id: 's12', emoji: '🌈', label: 'Rainbow', category: 'nature' },
  { id: 's13', emoji: '🎉', label: 'Party', category: 'fun' },
  { id: 's14', emoji: '🎀', label: 'Ribbon', category: 'fun' },
  { id: 's15', emoji: '🍭', label: 'Lollipop', category: 'fun' },
  { id: 's16', emoji: '🦄', label: 'Unicorn', category: 'fun' },
];

export const FRAME_TEMPLATES: FrameTemplate[] = [
  { id: 'pink', name: 'Pink Dream', borderColor: '#ff80b5', bgColor: '#fff0f8' },
  { id: 'purple', name: 'Purple Haze', borderColor: '#c080ff', bgColor: '#f8f0ff' },
  { id: 'blue', name: 'Baby Blue', borderColor: '#80c8ff', bgColor: '#f0f8ff' },
  { id: 'mint', name: 'Mint Y2K', borderColor: '#60e0b0', bgColor: '#f0fff8' },
  { id: 'gold', name: 'Gold Star', borderColor: '#ffd060', bgColor: '#fffbf0' },
];
