import { useState, useCallback, useRef } from 'react';
import { PlacedSticker, PhotoSlot, FrameTemplate } from '@/types';
import { generateId } from '@/lib/utils';
import { FRAME_TEMPLATES } from '@/lib/stickers';

export function useEditor() {
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [photoSlots, setPhotoSlots] = useState<PhotoSlot[]>([
    { id: 0, imageUrl: null },
    { id: 1, imageUrl: null },
    { id: 2, imageUrl: null },
    { id: 3, imageUrl: null },
  ]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [activeFrame, setActiveFrame] = useState<FrameTemplate>(FRAME_TEMPLATES[0]);
  const [activePhotoSlot, setActivePhotoSlot] = useState<number | null>(null);
  const nextZIndex = useRef(10);

  const addSticker = useCallback((emoji: string, stickerId: string, x: number, y: number) => {
    const newSticker: PlacedSticker = {
      id: generateId(),
      stickerId,
      emoji,
      x,
      y,
      rotation: Math.random() * 20 - 10,
      scale: 1,
      zIndex: nextZIndex.current++,
    };
    setPlacedStickers(prev => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
  }, []);

  const updateSticker = useCallback((id: string, updates: Partial<PlacedSticker>) => {
    setPlacedStickers(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates } : s))
    );
  }, []);

  const deleteSticker = useCallback((id: string) => {
    setPlacedStickers(prev => prev.filter(s => s.id !== id));
    setSelectedStickerId(null);
  }, []);

  const selectSticker = useCallback((id: string | null) => {
    if (id) {
      nextZIndex.current++;
      setPlacedStickers(prev =>
        prev.map(s => (s.id === id ? { ...s, zIndex: nextZIndex.current } : s))
      );
    }
    setSelectedStickerId(id);
  }, []);

  const rotateSelectedSticker = useCallback((delta: number) => {
    if (!selectedStickerId) return;
    setPlacedStickers(prev =>
      prev.map(s =>
        s.id === selectedStickerId ? { ...s, rotation: s.rotation + delta } : s
      )
    );
  }, [selectedStickerId]);

  const scaleSelectedSticker = useCallback((delta: number) => {
    if (!selectedStickerId) return;
    setPlacedStickers(prev =>
      prev.map(s =>
        s.id === selectedStickerId
          ? { ...s, scale: Math.max(0.3, Math.min(3, s.scale + delta)) }
          : s
      )
    );
  }, [selectedStickerId]);

  const addPhoto = useCallback((slotId: number, imageUrl: string) => {
    setPhotoSlots(prev =>
      prev.map(slot => (slot.id === slotId ? { ...slot, imageUrl } : slot))
    );
  }, []);

  const clearCanvas = useCallback(() => {
    setPlacedStickers([]);
    setSelectedStickerId(null);
    setPhotoSlots([
      { id: 0, imageUrl: null },
      { id: 1, imageUrl: null },
      { id: 2, imageUrl: null },
      { id: 3, imageUrl: null },
    ]);
  }, []);

  const selectedSticker = placedStickers.find(s => s.id === selectedStickerId) || null;

  return {
    placedStickers,
    photoSlots,
    selectedStickerId,
    selectedSticker,
    activeFrame,
    activePhotoSlot,
    setActiveFrame,
    setActivePhotoSlot,
    addSticker,
    updateSticker,
    deleteSticker,
    selectSticker,
    rotateSelectedSticker,
    scaleSelectedSticker,
    addPhoto,
    clearCanvas,
  };
}
