import { useRef, useState } from 'react';
import styles from './EditorPage.module.css';
import Header from '@/components/Header/Header';
import StickerPanel from '@/components/StickerPanel/StickerPanel';
import FrameCanvas from '@/components/FrameCanvas/FrameCanvas';
import ToolPanel from '@/components/ToolPanel/ToolPanel';
import FrameSelector from '@/components/FrameSelector/FrameSelector';
import { useEditor } from '@/hooks/useEditor';
import { StickerItem } from '@/types';

export default function EditorPage() {
  const editor = useEditor();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedSticker, setDraggedSticker] = useState<StickerItem | null>(null);

  const handleStickerDragStart = (sticker: StickerItem) => {
    setDraggedSticker(sticker);
  };

  const handleCanvasDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedSticker || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    editor.addSticker(draggedSticker.emoji, draggedSticker.id, x, y);
    setDraggedSticker(null);
  };

  const handleCanvasDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSave = () => {
    alert('✨ Frame saved! In production, this would export your beautiful frame as an image!');
  };

  return (
    <div className={styles.page}>
      <Header onSave={handleSave} onClear={editor.clearCanvas} />
      <div className={styles.workspace}>
        <StickerPanel
          onStickerDragStart={handleStickerDragStart}
          onStickerClick={(sticker) => {
            const canvasEl = canvasRef.current;
            if (!canvasEl) return;
            const rect = canvasEl.getBoundingClientRect();
            const x = 80 + Math.random() * (rect.width - 160);
            const y = 80 + Math.random() * (rect.height - 160);
            editor.addSticker(sticker.emoji, sticker.id, x, y);
          }}
        />
        <div className={styles.centerArea}>
          <FrameSelector
            activeFrame={editor.activeFrame}
            onSelectFrame={editor.setActiveFrame}
          />
          <div
            ref={canvasRef}
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            onClick={() => editor.selectSticker(null)}
            className={styles.canvasWrapper}
          >
            <FrameCanvas
              photoSlots={editor.photoSlots}
              placedStickers={editor.placedStickers}
              selectedStickerId={editor.selectedStickerId}
              activeFrame={editor.activeFrame}
              activePhotoSlot={editor.activePhotoSlot}
              onSelectSticker={editor.selectSticker}
              onUpdateSticker={editor.updateSticker}
              onAddPhoto={editor.addPhoto}
              onSetActivePhotoSlot={editor.setActivePhotoSlot}
            />
          </div>
        </div>
        <ToolPanel
          selectedSticker={editor.selectedSticker}
          onRotate={editor.rotateSelectedSticker}
          onScale={editor.scaleSelectedSticker}
          onDelete={editor.deleteSticker}
          onSave={handleSave}
          photoSlots={editor.photoSlots}
          activePhotoSlot={editor.activePhotoSlot}
          onAddPhoto={editor.addPhoto}
          onSetActivePhotoSlot={editor.setActivePhotoSlot}
        />
      </div>
    </div>
  );
}
