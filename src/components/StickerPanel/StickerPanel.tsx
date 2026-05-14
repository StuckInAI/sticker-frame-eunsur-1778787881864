import React, { useState } from 'react';
import styles from './StickerPanel.module.css';
import { ALL_STICKERS, STICKER_CATEGORIES, StickerDef } from '../../data/stickers';

interface Props {
  onDragStart: (def: StickerDef) => void;
}

export default function StickerPanel({ onDragStart }: Props) {
  const [activeCat, setActiveCat] = useState('stars');
  const filtered = ALL_STICKERS.filter(s => s.category === activeCat);

  return (
    <div className={styles.panel}>
      <div className={styles.title}>✨ Stickers</div>
      <div className={styles.categories}>
        {STICKER_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.catBtn} ${activeCat === cat.id ? styles.catBtnActive : ''}`}
            onClick={() => setActiveCat(cat.id)}
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
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', sticker.id);
              onDragStart(sticker);
            }}
            title={sticker.label}
          >
            <span className={styles.emoji}>{sticker.emoji}</span>
            <span className={styles.label}>{sticker.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
