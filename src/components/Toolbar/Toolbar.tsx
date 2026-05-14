import React from 'react';
import styles from './Toolbar.module.css';
import { FrameLayout } from '../../types';

interface ToolbarProps {
  layout: FrameLayout;
  onLayoutChange: (l: FrameLayout) => void;
  selectedId: string | null;
  onRotate: (delta: number) => void;
  onResize: (delta: number) => void;
  onDelete: () => void;
  onSave: () => void;
}

export default function Toolbar({
  layout,
  onLayoutChange,
  selectedId,
  onRotate,
  onResize,
  onDelete,
  onSave,
}: ToolbarProps) {
  const layouts: { id: FrameLayout; label: string }[] = [
    { id: '4cut', label: '4-Cut' },
    { id: '2cut', label: '2-Cut' },
    { id: '3cut', label: '3-Cut' },
  ];

  return (
    <div className={styles.toolbar}>
      {/* Layout picker */}
      <div className={styles.group}>
        <span className={styles.groupLabel}>Frame</span>
        {layouts.map(l => (
          <button
            key={l.id}
            className={`${styles.btn} ${layout === l.id ? styles.btnActive : ''}`}
            onClick={() => onLayoutChange(l.id)}
          >
            {l.label}
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
          title="Rotate Left"
        >
          ↺ Rotate
        </button>
        <button
          className={styles.btn}
          disabled={!selectedId}
          onClick={() => onRotate(15)}
          title="Rotate Right"
        >
          ↻ Rotate
        </button>
        <button
          className={styles.btn}
          disabled={!selectedId}
          onClick={() => onResize(-8)}
          title="Shrink"
        >
          − Size
        </button>
        <button
          className={styles.btn}
          disabled={!selectedId}
          onClick={() => onResize(8)}
          title="Grow"
        >
          + Size
        </button>
        <button
          className={`${styles.btn} ${styles.btnDanger}`}
          disabled={!selectedId}
          onClick={onDelete}
          title="Delete Sticker"
        >
          🗑 Delete
        </button>
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
