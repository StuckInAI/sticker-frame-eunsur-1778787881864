import React, { useRef } from 'react';
import styles from './EditorPage.module.css';
import { useEditor } from '@/hooks/useEditor';
import FrameCanvas from '@/components/FrameCanvas/FrameCanvas';
import FrameSelector from '@/components/FrameSelector/FrameSelector';
import Header from '@/components/Header/Header';
import { STICKERS } from '@/lib/stickers';
import { StickerItem } from '@/types';

export default function EditorPage() {
  const {
    photoSlots,
    placedStickers,
    selectedStickerId,
    activeFrame,
    activePhotoSlot,
    setSelectedStickerId,
    setActiveFrame,
    setActivePhotoSlot,
    addSticker,
    updateSticker,
    deleteSelectedSticker,
    addPhoto,
    clearAll,
    saveFrame,
  } = useEditor();

  const handleStickerClick = (sticker: StickerItem) => {
    addSticker(sticker.emoji, sticker.label);
  };

  return (
    <div className={styles.page}>
      <Header onSave={saveFrame} onClear={clearAll} />
      <div className={styles.toolbar}>
        <FrameSelector activeFrame={activeFrame} onSelectFrame={setActiveFrame} />
      </div>
      <div className={styles.main}>
        {/* Sticker panel */}
        <div className={styles.stickerPanel}>
          <div className={styles.panelTitle}>✨ Stickers</div>
          <div className={styles.stickerGrid}>
            {STICKERS.map(sticker => (
              <button
                key={sticker.id}
                className={styles.stickerBtn}
                onClick={() => handleStickerClick(sticker)}
                title={sticker.label}
              >
                <span className={styles.stickerEmoji}>{sticker.emoji}</span>
                <span className={styles.stickerLabel}>{sticker.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className={styles.canvasArea}>
          <FrameCanvas
            photoSlots={photoSlots}
            placedStickers={placedStickers}
            selectedStickerId={selectedStickerId}
            activeFrame={activeFrame}
            activePhotoSlot={activePhotoSlot}
            onSelectSticker={setSelectedStickerId}
            onUpdateSticker={updateSticker}
            onAddPhoto={addPhoto}
            onSetActivePhotoSlot={setActivePhotoSlot}
          />
        </div>
      </div>
    </div>
  );
}
