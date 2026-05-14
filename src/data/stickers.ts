export interface StickerDef {
  id: string;
  emoji: string;
  label: string;
  category: 'stars' | 'hearts' | 'animals' | 'misc';
}

export const STICKERS: StickerDef[] = [
  // Stars
  { id: 's1',  emoji: '⭐', label: 'Star',          category: 'stars' },
  { id: 's2',  emoji: '✨', label: 'Sparkle',       category: 'stars' },
  { id: 's3',  emoji: '💫', label: 'Dizzy star',    category: 'stars' },
  { id: 's4',  emoji: '🌟', label: 'Glowing star',  category: 'stars' },
  { id: 's5',  emoji: '⚡', label: 'Lightning',     category: 'stars' },
  // Hearts
  { id: 'h1',  emoji: '💖', label: 'Sparkle heart', category: 'hearts' },
  { id: 'h2',  emoji: '💕', label: 'Two hearts',    category: 'hearts' },
  { id: 'h3',  emoji: '💗', label: 'Growing heart', category: 'hearts' },
  { id: 'h4',  emoji: '🩷', label: 'Pink heart',    category: 'hearts' },
  { id: 'h5',  emoji: '💞', label: 'Revolving hearts', category: 'hearts' },
  // Animals
  { id: 'a1',  emoji: '🐱', label: 'Cat',           category: 'animals' },
  { id: 'a2',  emoji: '🐰', label: 'Bunny',         category: 'animals' },
  { id: 'a3',  emoji: '🐻', label: 'Bear',          category: 'animals' },
  { id: 'a4',  emoji: '🦋', label: 'Butterfly',     category: 'animals' },
  { id: 'a5',  emoji: '🐸', label: 'Frog',          category: 'animals' },
  { id: 'a6',  emoji: '🌸', label: 'Blossom',       category: 'animals' },
  // Misc
  { id: 'm1',  emoji: '🎀', label: 'Ribbon',        category: 'misc' },
  { id: 'm2',  emoji: '🍭', label: 'Lollipop',      category: 'misc' },
  { id: 'm3',  emoji: '🎮', label: 'Gamepad',       category: 'misc' },
  { id: 'm4',  emoji: '💎', label: 'Diamond',       category: 'misc' },
  { id: 'm5',  emoji: '🌈', label: 'Rainbow',       category: 'misc' },
  { id: 'm6',  emoji: '🍬', label: 'Candy',         category: 'misc' },
];

export const CATEGORIES = [
  { key: 'stars',   label: '⭐ Stars' },
  { key: 'hearts',  label: '💖 Hearts' },
  { key: 'animals', label: '🐱 Animals' },
  { key: 'misc',    label: '🎀 Misc' },
] as const;
