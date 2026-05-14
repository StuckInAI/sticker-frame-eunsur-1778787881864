import React, { forwardRef, useRef, useState, useCallback } from 'react';
import styles from './Canvas.module.css';
import { PlacedSticker, PhotoSlot, FrameLayout } from '../../types';

interface CanvasProps {
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

const Canvas = forwardRef<HTMLDivElement, CanvasProps>(function Canvas(
  { layout, slots, stickers, selectedId, onPhotoUpload, onDrop, onDragOver, onSelectSticker, onMoveSticker },
  ref
) {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const draggingSticker = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const gridClass =
    layout === '4cut' ? styles.grid4 :
    layout === '2cut' ? styles.grid2 :
    styles.grid3;

  const handleSlotClick = (slotId: number) => {
    fileInputRefs.current[slotId]?.click();
  };

  const handleFileChange = (slotId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onPhotoUpload(slotId, file);
    e.target.value = '';
  };

  const handleStickerMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onSelectSticker(id);
    const sticker = stickers.find(s => s.id === id);
    if (!sticker) return;
    draggingSticker.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: sticker.x,
      origY: sticker.y,
    };
  }, [stickers, onSelectSticker]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingSticker.current) return;
    const el = (ref as React.RefObject<HTMLDivElement>)?.current ?? containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = ((e.clientX - draggingSticker.current.startX) / rect.width) * 100;
    const dy = ((e.clientY - draggingSticker.current.startY) / rect.height) * 100;
    onMoveSticker(
      draggingSticker.current.id,
      draggingSticker.current.origX + dx,
      draggingSticker.current.origY + dy
    );
  }, [ref, onMoveSticker]);

  const handleMouseUp = useCallback(() => {
    draggingSticker.current = null;
  }, []);

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={styles.canvas}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={() => onSelectSticker(null)}
    >
      {/* decorative border */}
      <div className={styles.outerBorder} />

      {/* Photo grid */}
      <div className={`${styles.photoGrid} ${gridClass}`}>
        {slots.map((slot, idx) => (
          <div
            key={slot.id}
            className={styles.photoSlot}
            onClick={(e) => { e.stopPropagation(); handleSlotClick(slot.id); }}
          >
            {slot.dataUrl ? (
              <img src={slot.dataUrl} alt={`Photo ${idx + 1}`} className={styles.photo} />
            ) : (
              <div className={styles.emptySlot}>
                <span className={styles.addIcon}>📷</span>
                <span className={styles.addText}>Add Photo</span>
              </div>
            )}
            <input
              ref={el => { fileInputRefs.current[slot.id] = el; }}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={(e) => handleFileChange(slot.id, e)}
            />
          </div>
        ))}
      </div>

      {/* Placed stickers */}
      {stickers.map(sticker => (
        <div
          key={sticker.id}
          className={`${styles.sticker} ${sticker.id === selectedId ? styles.stickerSelected : ''}`}
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            fontSize: `${sticker.size}px`,
            transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
            zIndex: sticker.id === selectedId ? 100 : 10,
          }}
          onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
        >
          {sticker.emoji}
          {sticker.id === selectedId && (
            <>
              <div className={styles.boundingBox} />
              <div className={`${styles.handle} ${styles.handleTL}`} />
              <div className={`${styles.handle} ${styles.handleTR}`} />
              <div className={`${styles.handle} ${styles.handleBL}`} />
              <div className={`${styles.handle} ${styles.handleBR}`} />
            </>
          )}
        </div>
      ))}

      {/* frame label */}
      <div className={styles.frameLabel}>✨ my photo frame ✨</div>
    </div>
  );
});

export default Canvas;
