import React, { useRef, useState, useCallback } from 'react';
import styles from './Editor.module.css';
import StickerPanel from '../StickerPanel/StickerPanel';
import Canvas from '../Canvas/Canvas';
import Toolbar from '../Toolbar/Toolbar';
import { PlacedSticker, PhotoSlot, FrameLayout } from '../../types';
import { StickerDef } from '../../data/stickers';

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

const INITIAL_SLOTS = (count: number): PhotoSlot[] =>
  Array.from({ length: count }, (_, i) => ({ id: i, dataUrl: null }));

export default function Editor() {
  const [layout, setLayout] = useState<FrameLayout>('4cut');
  const [slots, setSlots] = useState<PhotoSlot[]>(INITIAL_SLOTS(4));
  const [stickers, setStickers] = useState<PlacedSticker[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragStickerDef, setDragStickerDef] = useState<StickerDef | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Change layout
  const handleLayoutChange = useCallback((l: FrameLayout) => {
    setLayout(l);
    const count = l === '4cut' ? 4 : l === '2cut' ? 2 : 3;
    setSlots(INITIAL_SLOTS(count));
    setStickers([]);
    setSelectedId(null);
  }, []);

  // Photo upload per slot
  const handlePhotoUpload = useCallback((slotId: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSlots(prev =>
        prev.map(s => s.id === slotId ? { ...s, dataUrl: e.target?.result as string } : s)
      );
    };
    reader.readAsDataURL(file);
  }, []);

  // Drop sticker onto canvas
  const handleCanvasDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragStickerDef || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const newSticker: PlacedSticker = {
      id: makeId(),
      emoji: dragStickerDef.emoji,
      label: dragStickerDef.label,
      x: xPct,
      y: yPct,
      size: 52,
      rotation: 0,
    };
    setStickers(prev => [...prev, newSticker]);
    setSelectedId(newSticker.id);
    setDragStickerDef(null);
  }, [dragStickerDef]);

  // Select sticker
  const handleSelectSticker = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  // Move sticker
  const handleMoveSticker = useCallback((id: string, x: number, y: number) => {
    setStickers(prev => prev.map(s => s.id === id ? { ...s, x, y } : s));
  }, []);

  // Rotate selected sticker
  const handleRotate = useCallback((delta: number) => {
    if (!selectedId) return;
    setStickers(prev =>
      prev.map(s => s.id === selectedId ? { ...s, rotation: s.rotation + delta } : s)
    );
  }, [selectedId]);

  // Resize selected sticker
  const handleResize = useCallback((delta: number) => {
    if (!selectedId) return;
    setStickers(prev =>
      prev.map(s => s.id === selectedId ? { ...s, size: Math.max(24, s.size + delta) } : s)
    );
  }, [selectedId]);

  // Delete selected sticker
  const handleDeleteSticker = useCallback(() => {
    if (!selectedId) return;
    setStickers(prev => prev.filter(s => s.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  // Save / export canvas as PNG
  const handleSave = useCallback(() => {
    if (!canvasRef.current) return;
    import('html2canvas').then(({ default: html2canvas }) => {
      html2canvas(canvasRef.current!, { useCORS: true, scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'y2k-photo-frame.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }).catch(() => {
      alert('⚠️ Save feature requires the html2canvas package. For now, use your browser\'s screenshot tool!');
    });
  }, []);

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <span className={styles.logo}>✨ Y2K Photo Frame Editor ✨</span>
        <span className={styles.tagline}>drag stickers • add photos • save your vibe</span>
      </header>

      <main className={styles.main}>
        {/* Left: Sticker Panel */}
        <aside className={styles.aside}>
          <StickerPanel onDragStart={setDragStickerDef} />
        </aside>

        {/* Centre: Canvas + Toolbar */}
        <section className={styles.center}>
          <Toolbar
            layout={layout}
            onLayoutChange={handleLayoutChange}
            selectedId={selectedId}
            onRotate={handleRotate}
            onResize={handleResize}
            onDelete={handleDeleteSticker}
            onSave={handleSave}
          />
          <Canvas
            ref={canvasRef}
            layout={layout}
            slots={slots}
            stickers={stickers}
            selectedId={selectedId}
            onPhotoUpload={handlePhotoUpload}
            onDrop={handleCanvasDrop}
            onDragOver={(e) => e.preventDefault()}
            onSelectSticker={handleSelectSticker}
            onMoveSticker={handleMoveSticker}
          />
          <p className={styles.hint}>
            💡 Drag a sticker from the panel onto the canvas &nbsp;|&nbsp; Click a slot to add a photo
          </p>
        </section>

        {/* Right: decorative panel */}
        <aside className={styles.decorAside}>
          <div className={styles.decorPanel}>
            <div className={styles.decorTitle}>✦ tips ✦</div>
            {[
              '🎀 Drag stickers onto the frame',
              '📸 Click any slot to upload a photo',
              '🔄 Use Rotate ± to spin stickers',
              '🔍 Use Size ± to resize stickers',
              '🗑 Delete removes selected sticker',
              '💾 Save exports your masterpiece',
            ].map(t => (
              <div key={t} className={styles.tip}>{t}</div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
