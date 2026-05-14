import { useRef } from 'react';
import styles from './ToolPanel.module.css';
import { PlacedSticker, PhotoSlot } from '@/types';
import { RotateCcw, RotateCw, ZoomIn, ZoomOut, Trash2, ImagePlus, Download } from 'lucide-react';

type ToolPanelProps = {
  selectedSticker: PlacedSticker | null;
  onRotate: (delta: number) => void;
  onScale: (delta: number) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  photoSlots: PhotoSlot[];
  activePhotoSlot: number | null;
  onAddPhoto: (slotId: number, imageUrl: string) => void;
  onSetActivePhotoSlot: (id: number | null) => void;
};

export default function ToolPanel({
  selectedSticker,
  onRotate,
  onScale,
  onDelete,
  onSave,
  photoSlots,
  onAddPhoto,
  onSetActivePhotoSlot,
}: ToolPanelProps) {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);

  const handlePhotoClick = (slotId: number) => {
    onSetActivePhotoSlot(slotId);
    fileInputRefs.current[slotId]?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, slotId: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onAddPhoto(slotId, url);
    onSetActivePhotoSlot(null);
    e.target.value = '';
  };

  return (
    <aside className={styles.panel}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>📸 Photos</div>
        <div className={styles.photoGrid}>
          {photoSlots.map(slot => (
            <div key={slot.id} className={styles.photoThumb} onClick={() => handlePhotoClick(slot.id)}>
              <input
                ref={el => { fileInputRefs.current[slot.id] = el; }}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, slot.id)}
                style={{ display: 'none' }}
              />
              {slot.imageUrl ? (
                <img src={slot.imageUrl} alt="" className={styles.thumbImg} />
              ) : (
                <div className={styles.thumbEmpty}>
                  <ImagePlus size={14} />
                  <span>{slot.id + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className={styles.addPhotoBtn} onClick={() => handlePhotoClick(0)}>
          <ImagePlus size={13} />
          <span>Add Photo</span>
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionTitle}>🎨 Sticker Tools</div>
        {selectedSticker ? (
          <>
            <div className={styles.selectedInfo}>
              <span className={styles.selectedEmoji}>{selectedSticker.emoji}</span>
              <span className={styles.selectedLabel}>Selected</span>
            </div>

            <div className={styles.toolGroup}>
              <div className={styles.toolLabel}>Rotate</div>
              <div className={styles.toolRow}>
                <button className={styles.toolBtn} onClick={() => onRotate(-15)} title="Rotate Left">
                  <RotateCcw size={14} />
                </button>
                <span className={styles.toolValue}>{Math.round(selectedSticker.rotation)}°</span>
                <button className={styles.toolBtn} onClick={() => onRotate(15)} title="Rotate Right">
                  <RotateCw size={14} />
                </button>
              </div>
            </div>

            <div className={styles.toolGroup}>
              <div className={styles.toolLabel}>Scale</div>
              <div className={styles.toolRow}>
                <button className={styles.toolBtn} onClick={() => onScale(-0.1)} title="Scale Down">
                  <ZoomOut size={14} />
                </button>
                <span className={styles.toolValue}>{(selectedSticker.scale * 100).toFixed(0)}%</span>
                <button className={styles.toolBtn} onClick={() => onScale(0.1)} title="Scale Up">
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(selectedSticker.id)}
            >
              <Trash2 size={13} />
              <span>Remove Sticker</span>
            </button>
          </>
        ) : (
          <div className={styles.noSelection}>
            <span className={styles.noSelectionIcon}>🎯</span>
            <span>Select a sticker to edit it</span>
          </div>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionTitle}>💾 Export</div>
        <button className={styles.saveBtn} onClick={onSave}>
          <Download size={14} />
          <span>Save Frame</span>
        </button>
        <div className={styles.saveHint}>Exports as PNG image</div>
      </div>

      <div className={styles.decoSection}>
        <div className={styles.decoStickers}>
          <span>🌸</span>
          <span>💫</span>
          <span>🎀</span>
          <span>🌈</span>
          <span>💎</span>
        </div>
        <div className={styles.decoText}>✨ make it cute ✨</div>
      </div>
    </aside>
  );
}
