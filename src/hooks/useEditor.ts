import { useState, useCallback } from 'react';
import { PlacedSticker, PhotoSlot, FrameTemplate } from '@/types';
import { FRAME_TEMPLATES } from '@/lib/stickers';

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

const INITIAL_SLOTS: PhotoSlot[] = [
  { id: 0, dataUrl: null },
  { id: 1, dataUrl: null },
  { id: 2, dataUrl: null },
  { id: 3, dataUrl: null },
];

export function useEditor() {
  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>(INITIAL_SLOTS);
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [activeFrame, setActiveFrame] = useState<FrameTemplate>(FRAME_TEMPLATES[0]);
  const [activePhotoSlot, setActivePhotoSlot] = useState<number | null>(null);

  const addSticker = useCallback((emoji: string, label: string) => {
    const newSticker: PlacedSticker = {
      id: makeId(),
      emoji,
      label,
      x: 190,
      y: 210,
      size: 48,
      rotation: 0,
      scale: 1,
      zIndex: placedStickers.length + 10,
    };
    setPlacedStickers(prev => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
  }, [placedStickers.length]);

  const updateSticker = useCallback((id: string, updates: Partial<PlacedSticker>) => {
    setPlacedStickers(prev =>
      prev.map(s => s.id === id ? { ...s, ...updates } : s)
    );
  }, []);

  const deleteSticker = useCallback((id: string) => {
    setPlacedStickers(prev => prev.filter(s => s.id !== id));
    setSelectedStickerId(prev => prev === id ? null : prev);
  }, []);

  const deleteSelectedSticker = useCallback(() => {
    if (!selectedStickerId) return;
    deleteSticker(selectedStickerId);
  }, [selectedStickerId, deleteSticker]);

  const resizeSticker = useCallback((delta: number) => {
    if (!selectedStickerId) return;
    setPlacedStickers(prev =>
      prev.map(s =>
        s.id === selectedStickerId
          ? { ...s, scale: Math.max(0.3, Math.min(3, (s.scale ?? 1) + delta)) }
          : s
      )
    );
  }, [selectedStickerId]);

  const rotateSticker = useCallback((delta: number) => {
    if (!selectedStickerId) return;
    setPlacedStickers(prev =>
      prev.map(s =>
        s.id === selectedStickerId
          ? { ...s, rotation: s.rotation + delta }
          : s
      )
    );
  }, [selectedStickerId]);

  const addPhoto = useCallback((slotId: number, imageUrl: string) => {
    setPhotoSlots(prev =>
      prev.map(s => s.id === slotId ? { ...s, dataUrl: imageUrl } : s)
    );
  }, []);

  const clearAll = useCallback(() => {
    setPhotoSlots([
      { id: 0, dataUrl: null },
      { id: 1, dataUrl: null },
      { id: 2, dataUrl: null },
      { id: 3, dataUrl: null },
    ]);
    setPlacedStickers([]);
    setSelectedStickerId(null);
  }, []);

  const saveFrame = useCallback(() => {
    alert('💾 To save your frame, use your browser screenshot tool (e.g. Ctrl+Shift+S).');
  }, []);

  return {
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
    deleteSticker,
    deleteSelectedSticker,
    resizeSticker,
    rotateSticker,
    addPhoto,
    clearAll,
    saveFrame,
  };
}
