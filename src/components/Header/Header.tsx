import styles from './Header.module.css';
import { Sparkles, Trash2, Download } from 'lucide-react';

type HeaderProps = {
  onSave: () => void;
  onClear: () => void;
};

export default function Header({ onSave, onClear }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>✨</span>
        <span className={styles.logoText}>PixiFrame</span>
        <span className={styles.logoSub}>✦ Y2K EDITION ✦</span>
      </div>

      <div className={styles.decorRow}>
        <span className={styles.decoStar}>⭐</span>
        <span className={styles.decoHeart}>💖</span>
        <span className={styles.decoStar}>✨</span>
        <span className={styles.decoHeart}>💕</span>
        <span className={styles.decoStar}>⭐</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnSecondary} onClick={onClear}>
          <Trash2 size={14} />
          <span>Clear All</span>
        </button>
        <button className={styles.btnPrimary} onClick={onSave}>
          <Download size={14} />
          <span>Save Frame</span>
        </button>
        <span className={styles.sparkleRight}>
          <Sparkles size={18} />
        </span>
      </div>
    </header>
  );
}
