import { useState } from 'react';
import styles from './StickerPanel.module.css';
import { ALL_STICKERS, STICKER_CATEGORIES } from '@/lib/stickers';
import { StickerItem } from '@/types';

type StickerPanelProps = {
  onStickerDragStart: (sticker: StickerItem) => void;
  onStickerClick: (sticker: StickerItem) => void;
};

export default function StickerPanel({ onStickerDragStart, onStickerClick }: StickerPanelProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Stars');

  const filtered = ALL_STICKERS.filter(s => s.category === activeCategory);

  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>🌟 Stickers</span>
      </div>

      <div className={styles.categories}>
        {STICKER_CATEGORIES.map(cat => (
          <button
            key={cat}
            className={activeCategory === cat ? styles.catBtnActive : styles.catBtn}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(sticker => (
          <div
            key={sticker.id}
            className={styles.stickerCell}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'copy';
              onStickerDragStart(sticker);
            }}
            onClick={() => onStickerClick(sticker)}
            title={sticker.label}
          >
            <span className={styles.stickerEmoji}>{sticker.emoji}</span>
            <span className={styles.stickerLabel}>{sticker.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.hint}>
        <span>Drag or click to add ✨</span>
      </div>
    </aside>
  );
}
