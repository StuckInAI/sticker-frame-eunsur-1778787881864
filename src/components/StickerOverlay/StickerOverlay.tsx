import React, { useRef } from 'react';
import styles from './StickerOverlay.module.css';
import { PlacedSticker } from '../../types';

interface Props {
  sticker: PlacedSticker;
  isSelected: boolean;
  canvasRef: React.RefObject<HTMLDivElement>;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}

export default function StickerOverlay({ sticker, isSelected, canvasRef, onSelect, onMove }: Props) {
  const dragging = useRef(false);
  const startPos = useRef({ mx: 0, my: 0, sx: 0, sy: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect(sticker.id);
    if (!canvasRef.current) return;
    dragging.current = true;
    startPos.current = {
      mx: e.clientX,
      my: e.clientY,
      sx: sticker.x,
      sy: sticker.y,
    };

    const onMouseMove = (me: MouseEvent) => {
      if (!dragging.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = ((me.clientX - startPos.current.mx) / rect.width) * 100;
      const dy = ((me.clientY - startPos.current.my) / rect.height) * 100;
      const newX = Math.max(0, Math.min(100, startPos.current.sx + dx));
      const newY = Math.max(0, Math.min(100, startPos.current.sy + dy));
      onMove(sticker.id, newX, newY);
    };

    const onMouseUp = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className={`${styles.sticker} ${isSelected ? styles.selected : ''}`}
      style={{
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        width: sticker.size,
        height: sticker.size,
        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
        fontSize: sticker.size * 0.62,
      }}
      onMouseDown={handleMouseDown}
      title={sticker.label}
    >
      {sticker.emoji}
      {isSelected && (
        <>
          <div className={`${styles.handle} ${styles.handleTL}`} />
          <div className={`${styles.handle} ${styles.handleTR}`} />
          <div className={`${styles.handle} ${styles.handleBL}`} />
          <div className={`${styles.handle} ${styles.handleBR}`} />
          <div className={styles.rotateHandle}>↻</div>
        </>
      )}
    </div>
  );
}
