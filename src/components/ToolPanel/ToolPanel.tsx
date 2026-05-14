import styles from './ToolPanel.module.css';
import { PlacedSticker, PhotoSlot } from '@/types';

type ToolPanelProps = {
  selectedSticker: PlacedSticker | null;
  photoSlots: PhotoSlot[];
  onRotate: (delta: number) => void;
  onResize: (delta: number) => void;
  onDelete: () => void;
};

export default function ToolPanel({ selectedSticker, photoSlots, onRotate, onResize, onDelete }: ToolPanelProps) {
  return (
    <div className={styles.panel}>
      {/* Photo slots section */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>📸 Photos</div>
        <div className={styles.slotList}>
          {photoSlots.map(slot => {
            const imageUrl = slot.imageUrl ?? slot.dataUrl;
            return (
              <div key={slot.id} className={styles.slotThumb}>
                {imageUrl ? (
                  <img src={imageUrl} alt="" className={styles.thumbImg} />
                ) : (
                  <div className={styles.thumbEmpty}>{slot.id + 1}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticker tools section */}
      {selectedSticker && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>🎨 Sticker</div>
          <div className={styles.toolRow}>
            <span className={styles.toolLabel}>Rotate</span>
            <button className={styles.toolBtn} onClick={() => onRotate(-15)}>-15°</button>
            <button className={styles.toolBtn} onClick={() => onRotate(15)}>+15°</button>
          </div>
          <div className={styles.toolRow}>
            <span className={styles.toolLabel}>Scale</span>
            <button className={styles.toolBtn} onClick={() => onResize(-0.1)}>–</button>
            <span className={styles.toolValue}>
              {((selectedSticker.scale ?? 1) * 100).toFixed(0)}%
            </span>
            <button className={styles.toolBtn} onClick={() => onResize(0.1)}>+</button>
          </div>
          <button className={styles.deletBtn} onClick={onDelete}>🗑 Delete Sticker</button>
        </div>
      )}
    </div>
  );
}
