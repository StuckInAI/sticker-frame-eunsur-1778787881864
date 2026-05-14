import React, { forwardRef, useRef } from 'react';
import styles from './Canvas.module.css';
import { PlacedSticker, PhotoSlot, FrameLayout } from '../../types';
import StickerOverlay from '../StickerOverlay/StickerOverlay';

interface Props {
  layout: FrameLayout;
  slots: PhotoSlot[];
  stickers: PlacedSticker[];
  selectedId: string | null;
  onPhotoUpload: (slotId: number, file: File) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onSelectSticker: (id: string | null) => void;
  onMoveSticker: (id: string, x: number, y: number) => void;
}

const Canvas = forwardRef<HTMLDivElement, Props>((
  { layout, slots, stickers, selectedId, onPhotoUpload, onDrop, onDragOver, onSelectSticker, onMoveSticker },
  ref
) => {
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleSlotClick = (slotId: number) => {
    onSelectSticker(null);
    fileInputRefs.current[slotId]?.click();
  };

  const handleFileChange = (slotId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onPhotoUpload(slotId, file);
    e.target.value = '';
  };

  const layoutClass = {
    '4cut': styles.grid4,
    '2cut': styles.grid2,
    'strip': styles.gridStrip,
  }[layout];

  return (
    <div
      ref={ref}
      className={`${styles.canvas} ${layoutClass}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => onSelectSticker(null)}
    >
      {/* Photo slots */}
      <div className={styles.slotsGrid}>
        {slots.map(slot => (
          <div
            key={slot.id}
            className={styles.slot}
            onClick={(e) => { e.stopPropagation(); handleSlotClick(slot.id); }}
          >
            {slot.dataUrl ? (
              <img src={slot.dataUrl} alt={`Photo ${slot.id + 1}`} className={styles.slotImg} />
            ) : (
              <div className={styles.slotEmpty}>
                <span className={styles.addIcon}>📷</span>
                <span className={styles.addText}>Add Photo</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={el => { fileInputRefs.current[slot.id] = el; }}
              onChange={(e) => handleFileChange(slot.id, e)}
            />
          </div>
        ))}
      </div>

      {/* Sticker overlays */}
      {stickers.map(sticker => (
        <StickerOverlay
          key={sticker.id}
          sticker={sticker}
          isSelected={selectedId === sticker.id}
          canvasRef={ref as React.RefObject<HTMLDivElement>}
          onSelect={onSelectSticker}
          onMove={onMoveSticker}
        />
      ))}
    </div>
  );
});

Canvas.displayName = 'Canvas';
export default Canvas;
