import React, { forwardRef, useRef, useCallback } from 'react';
import styles from './Canvas.module.css';
import { PlacedSticker, PhotoSlot, FrameLayout } from '../../types';

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

const Canvas = forwardRef<HTMLDivElement, Props>(function Canvas(
  { layout, slots, stickers, selectedId, onPhotoUpload, onDrop, onDragOver, onSelectSticker, onMoveSticker },
  ref
) {
  const dragState = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getGridClass = () => {
    switch (layout) {
      case '2cut': return styles.grid2;
      case '3cut': return styles.grid3;
      default: return styles.grid4;
    }
  };

  const handleSlotClick = (slotId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onPhotoUpload(slotId, file);
    };
    input.click();
  };

  const handleStickerMouseDown = useCallback((e: React.MouseEvent, sticker: PlacedSticker) => {
    e.stopPropagation();
    e.preventDefault();
    onSelectSticker(sticker.id);
    dragState.current = {
      id: sticker.id,
      startX: e.clientX,
      startY: e.clientY,
      origX: sticker.x,
      origY: sticker.y,
    };

    const handleMouseMove = (ev: MouseEvent) => {
      if (!dragState.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = ((ev.clientX - dragState.current.startX) / rect.width) * 100;
      const dy = ((ev.clientY - dragState.current.startY) / rect.height) * 100;
      onMoveSticker(dragState.current.id, dragState.current.origX + dx, dragState.current.origY + dy);
    };

    const handleMouseUp = () => {
      dragState.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [onSelectSticker, onMoveSticker]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(`.${styles.slotWrapper}`)) {
      // Don't deselect when clicking slots
    } else if (!(e.target as HTMLElement).closest(`.${styles.sticker}`)) {
      onSelectSticker(null);
    }
  };

  const setRefs = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  }, [ref]);

  return (
    <div
      ref={setRefs}
      className={styles.canvas}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={handleCanvasClick}
    >
      {/* Frame background decoration */}
      <div className={styles.frameDecor}>
        <div className={styles.frameInner}>
          <div className={`${styles.photoGrid} ${getGridClass()}`}>
            {slots.map(slot => (
              <div
                key={slot.id}
                className={styles.slotWrapper}
                onClick={(e) => { e.stopPropagation(); handleSlotClick(slot.id); }}
              >
                {slot.dataUrl ? (
                  <img src={slot.dataUrl} alt={`Photo ${slot.id + 1}`} className={styles.photo} />
                ) : (
                  <div className={styles.emptySlot}>
                    <span className={styles.emptyIcon}>📸</span>
                    <span className={styles.emptyText}>Click to add photo</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Branding at bottom */}
          <div className={styles.frameBrand}>✨ y2k memories ✨</div>
        </div>
      </div>

      {/* Placed stickers layer */}
      {stickers.map(sticker => (
        <div
          key={sticker.id}
          className={`${styles.sticker} ${selectedId === sticker.id ? styles.stickerSelected : ''}`}
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            fontSize: `${sticker.size}px`,
            transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
          }}
          onMouseDown={(e) => handleStickerMouseDown(e, sticker)}
        >
          <span className={styles.stickerEmoji}>{sticker.emoji}</span>
          {selectedId === sticker.id && (
            <>
              <div className={styles.handle + ' ' + styles.handleTL} />
              <div className={styles.handle + ' ' + styles.handleTR} />
              <div className={styles.handle + ' ' + styles.handleBL} />
              <div className={styles.handle + ' ' + styles.handleBR} />
            </>
          )}
        </div>
      ))}
    </div>
  );
});

export default Canvas;
