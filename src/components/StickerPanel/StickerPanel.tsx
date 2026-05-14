import React, { useState } from 'react';
import styles from './StickerPanel.module.css';
import { STICKERS, CATEGORIES, StickerDef } from '../../data/stickers';

interface Props {
  onDragStart: (def: StickerDef) => void;
}

export default function StickerPanel({ onDragStart }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('stars');

  const filtered = STICKERS.filter(s => s.category === activeCategory);

  return (
    <div className={styles.panel}>
      <div className={styles.title}>🎨 Stickers</div>
      <div className={styles.tabs}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`${styles.tab} ${activeCategory === cat.key ? styles.tabActive : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map(sticker => (
          <div
            key={sticker.id}
            className={styles.stickerItem}
            draggable
            title={sticker.label}
            onDragStart={() => onDragStart(sticker)}
          >
            <span className={styles.emoji}>{sticker.emoji}</span>
            <span className={styles.emojiLabel}>{sticker.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
