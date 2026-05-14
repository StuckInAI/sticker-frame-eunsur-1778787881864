import React from 'react';
import styles from './Toolbar.module.css';
import { FrameLayout } from '../../types';

interface Props {
  layout: FrameLayout;
  onLayoutChange: (l: FrameLayout) => void;
  selectedId: string | null;
  onRotate: (delta: number) => void;
  onResize: (delta: number) => void;
  onDelete: () => void;
  onSave: () => void;
}

export default function Toolbar({
  layout, onLayoutChange, selectedId, onRotate, onResize, onDelete, onSave
}: Props) {
  return (
    <div className={styles.toolbar}>
      {/* Layout picker */}
      <div className={styles.group}>
        <span className={styles.groupLabel}>Frame</span>
        {(['4cut', '2cut', 'strip'] as FrameLayout[]).map(l => (
          <button
            key={l}
            className={`${styles.btn} ${layout === l ? styles.btnActive : ''}`}
            onClick={() => onLayoutChange(l)}
          >
            {l === '4cut' ? '⊞ 4-Cut' : l === '2cut' ? '▭ 2-Cut' : '▮ Strip'}
          </button>
        ))}
      </div>

      {/* Sticker controls */}
      <div className={styles.group}>
        <span className={styles.groupLabel}>Sticker</span>
        <button
          className={styles.btn}
          disabled={!selectedId}
          onClick={() => onRotate(-15)}
          title="Rotate left 15°"
        >↺ Rotate −</button>
        <button
          className={styles.btn}
          disabled={!selectedId}
          onClick={() => onRotate(15)}
          title="Rotate right 15°"
        >↻ Rotate +</button>
        <button
          className={styles.btn}
          disabled={!selectedId}
          onClick={() => onResize(-8)}
          title="Shrink"
        >🔍 Size −</button>
        <button
          className={styles.btn}
          disabled={!selectedId}
          onClick={() => onResize(8)}
          title="Grow"
        >🔍 Size +</button>
        <button
          className={`${styles.btn} ${styles.btnDanger}`}
          disabled={!selectedId}
          onClick={onDelete}
          title="Delete sticker"
        >🗑 Delete</button>
      </div>

      {/* Save */}
      <div className={styles.group}>
        <button className={`${styles.btn} ${styles.btnSave}`} onClick={onSave}>
          💾 Save Frame
        </button>
      </div>
    </div>
  );
}
