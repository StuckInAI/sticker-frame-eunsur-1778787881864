export interface StickerDef {
  id: string;
  emoji: string;
  label: string;
  category: string;
}

export const STICKER_CATEGORIES = [
  { id: 'stars', label: '⭐ Stars' },
  { id: 'hearts', label: '💕 Hearts' },
  { id: 'animals', label: '🐱 Animals' },
  { id: 'food', label: '🍰 Food' },
  { id: 'misc', label: '🎀 Misc' },
];

export const ALL_STICKERS: StickerDef[] = [
  // Stars
  { id: 's1', emoji: '⭐', label: 'Star', category: 'stars' },
  { id: 's2', emoji: '✨', label: 'Sparkles', category: 'stars' },
  { id: 's3', emoji: '🌟', label: 'Glowing Star', category: 'stars' },
  { id: 's4', emoji: '💫', label: 'Dizzy Star', category: 'stars' },
  { id: 's5', emoji: '⚡', label: 'Lightning', category: 'stars' },
  { id: 's6', emoji: '🔮', label: 'Crystal Ball', category: 'stars' },
  // Hearts
  { id: 'h1', emoji: '💖', label: 'Sparkling Heart', category: 'hearts' },
  { id: 'h2', emoji: '💕', label: 'Two Hearts', category: 'hearts' },
  { id: 'h3', emoji: '💗', label: 'Growing Heart', category: 'hearts' },
  { id: 'h4', emoji: '💝', label: 'Gift Heart', category: 'hearts' },
  { id: 'h5', emoji: '🩷', label: 'Pink Heart', category: 'hearts' },
  { id: 'h6', emoji: '💘', label: 'Cupid Heart', category: 'hearts' },
  // Animals
  { id: 'a1', emoji: '🐱', label: 'Cat', category: 'animals' },
  { id: 'a2', emoji: '🐰', label: 'Bunny', category: 'animals' },
  { id: 'a3', emoji: '🐻', label: 'Bear', category: 'animals' },
  { id: 'a4', emoji: '🦋', label: 'Butterfly', category: 'animals' },
  { id: 'a5', emoji: '🐣', label: 'Chick', category: 'animals' },
  { id: 'a6', emoji: '🦄', label: 'Unicorn', category: 'animals' },
  // Food
  { id: 'f1', emoji: '🍰', label: 'Cake', category: 'food' },
  { id: 'f2', emoji: '🍓', label: 'Strawberry', category: 'food' },
  { id: 'f3', emoji: '🍩', label: 'Donut', category: 'food' },
  { id: 'f4', emoji: '🧁', label: 'Cupcake', category: 'food' },
  { id: 'f5', emoji: '🍬', label: 'Candy', category: 'food' },
  { id: 'f6', emoji: '🍭', label: 'Lollipop', category: 'food' },
  // Misc
  { id: 'm1', emoji: '🎀', label: 'Ribbon', category: 'misc' },
  { id: 'm2', emoji: '🌈', label: 'Rainbow', category: 'misc' },
  { id: 'm3', emoji: '🎵', label: 'Music', category: 'misc' },
  { id: 'm4', emoji: '🌸', label: 'Cherry Blossom', category: 'misc' },
  { id: 'm5', emoji: '☁️', label: 'Cloud', category: 'misc' },
  { id: 'm6', emoji: '🫧', label: 'Bubbles', category: 'misc' },
];
