import { useRef, useCallback } from 'react';
import styles from './PlacedSticker.module.css';
import { PlacedSticker } from '@/types';

type PlacedStickerProps = {
  sticker: PlacedSticker;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<PlacedSticker>) => void;
  frameRef: React.RefObject<HTMLDivElement | null>;
};

export default function PlacedStickerEl({ sticker, isSelected, onSelect, onUpdate, frameRef }: PlacedStickerProps) {
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onSelect(sticker.id);
      isDragging.current = true;
      dragOffset.current = { x: e.clientX - sticker.x, y: e.clientY - sticker.y };

      const handleMouseMove = (ev: MouseEvent) => {
        if (!isDragging.current || !frameRef.current) return;
        const rect = frameRef.current.getBoundingClientRect();
        const newX = ev.clientX - dragOffset.current.x;
        const newY = ev.clientY - dragOffset.current.y;
        onUpdate(sticker.id, {
          x: Math.max(0, Math.min(rect.width, newX)),
          y: Math.max(0, Math.min(rect.height, newY)),
        });
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [sticker, onSelect, onUpdate, frameRef]
  );

  const scale = sticker.scale ?? 1;
  const zIndex = sticker.zIndex ?? 10;

  return (
    <div
      className={isSelected ? styles.stickerSelected : styles.sticker}
      style={{
        left: sticker.x,
        top: sticker.y,
        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${scale})`,
        zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <span className={styles.emoji}>{sticker.emoji}</span>

      {isSelected && (
        <>
          <div className={styles.boundingBox} />
          <div className={styles.rotateHandle} title="Drag to rotate">
            ↻
          </div>
        </>
      )}
    </div>
  );
}
