import { useRef, useCallback } from 'react';
import styles from './FrameCanvas.module.css';
import { PlacedSticker, PhotoSlot, FrameTemplate } from '@/types';
import PlacedStickerEl from '@/components/PlacedSticker/PlacedSticker';
import PhotoSlotEl from '@/components/PhotoSlot/PhotoSlot';

type FrameCanvasProps = {
  photoSlots: PhotoSlot[];
  placedStickers: PlacedSticker[];
  selectedStickerId: string | null;
  activeFrame: FrameTemplate;
  activePhotoSlot: number | null;
  onSelectSticker: (id: string | null) => void;
  onUpdateSticker: (id: string, updates: Partial<PlacedSticker>) => void;
  onAddPhoto: (slotId: number, imageUrl: string) => void;
  onSetActivePhotoSlot: (id: number | null) => void;
};

export default function FrameCanvas({
  photoSlots,
  placedStickers,
  selectedStickerId,
  activeFrame,
  onSelectSticker,
  onUpdateSticker,
  onAddPhoto,
  onSetActivePhotoSlot,
}: FrameCanvasProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!selectedStickerId) return;
      if (e.buttons !== 1) return;
    },
    [selectedStickerId]
  );

  return (
    <div
      ref={frameRef}
      className={styles.frame}
      style={{
        borderColor: activeFrame.borderColor,
        background: activeFrame.bgColor,
        boxShadow: `0 8px 40px ${activeFrame.borderColor}44, 0 2px 12px rgba(0,0,0,0.08)`,
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Decorative corner stars */}
      <span className={styles.cornerTL}>✦</span>
      <span className={styles.cornerTR}>✦</span>
      <span className={styles.cornerBL}>✦</span>
      <span className={styles.cornerBR}>✦</span>

      {/* Frame border decoration */}
      <div className={styles.frameBorderInner} style={{ borderColor: activeFrame.borderColor }} />

      {/* Photo grid */}
      <div className={styles.photoGrid}>
        {photoSlots.map(slot => (
          <PhotoSlotEl
            key={slot.id}
            slot={slot}
            borderColor={activeFrame.borderColor}
            onAddPhoto={onAddPhoto}
            onSetActivePhotoSlot={onSetActivePhotoSlot}
          />
        ))}
      </div>

      {/* Placed stickers */}
      {placedStickers.map(sticker => (
        <PlacedStickerEl
          key={sticker.id}
          sticker={sticker}
          isSelected={sticker.id === selectedStickerId}
          onSelect={onSelectSticker}
          onUpdate={onUpdateSticker}
          frameRef={frameRef}
        />
      ))}

      {/* Frame label */}
      <div className={styles.frameLabel} style={{ color: activeFrame.borderColor }}>
        ✨ my photo frame ✨
      </div>
    </div>
  );
}
