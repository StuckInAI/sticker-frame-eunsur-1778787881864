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

const layouts: { value: FrameLayout; label: string }[] = [
  { value: '4cut', label: '4-Cut' },
  { value: '2cut', label: '2-Cut' },
  { value: '3cut', label: '3-Cut' },
];

export default function Toolbar({
  layout,
  onLayoutChange,
  selectedId,
  onRotate,
  onResize,
  onDelete,
  onSave,
}: Props) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <span className={styles.groupLabel}>Frame</span>
        <div className={styles.btnRow}>
          {layouts.map(l => (
            <button
              key={l.value}
              className={`${styles.btn} ${layout === l.value ? styles.btnActive : ''}`}
              onClick={() => onLayoutChange(l.value)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <span className={styles.groupLabel}>Sticker Tools</span>
        <div className={styles.btnRow}>
          <button
            className={styles.btn}
            onClick={() => onRotate(-15)}
            disabled={!selectedId}
            title="Rotate Left"
          >
            ↺ -15°
          </button>
          <button
            className={styles.btn}
            onClick={() => onRotate(15)}
            disabled={!selectedId}
            title="Rotate Right"
          >
            ↻ +15°
          </button>
          <button
            className={styles.btn}
            onClick={() => onResize(8)}
            disabled={!selectedId}
            title="Size Up"
          >
            🔍+
          </button>
          <button
            className={styles.btn}
            onClick={() => onResize(-8)}
            disabled={!selectedId}
            title="Size Down"
          >
            🔍-
          </button>
          <button
            className={`${styles.btn} ${styles.btnDanger}`}
            onClick={onDelete}
            disabled={!selectedId}
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      <button className={`${styles.btn} ${styles.btnSave}`} onClick={onSave}>
        💾 Save
      </button>
    </div>
  );
}
