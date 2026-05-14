import { useRef } from 'react';
import styles from './PhotoSlot.module.css';
import { PhotoSlot } from '@/types';
import { ImagePlus } from 'lucide-react';

type PhotoSlotProps = {
  slot: PhotoSlot;
  borderColor: string;
  onAddPhoto: (slotId: number, imageUrl: string) => void;
  onSetActivePhotoSlot: (id: number | null) => void;
};

export default function PhotoSlotEl({ slot, borderColor, onAddPhoto, onSetActivePhotoSlot }: PhotoSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    onSetActivePhotoSlot(slot.id);
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onAddPhoto(slot.id, url);
    onSetActivePhotoSlot(null);
    e.target.value = '';
  };

  const imageUrl = slot.imageUrl ?? slot.dataUrl;

  return (
    <div
      className={styles.slot}
      style={{ borderColor }}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Photo ${slot.id + 1}`}
          className={styles.photo}
          draggable={false}
        />
      ) : (
        <div className={styles.empty}>
          <ImagePlus size={20} strokeWidth={1.5} className={styles.emptyIcon} />
          <span className={styles.emptyText}>Add Photo</span>
          <span className={styles.emptyNum}>{slot.id + 1}</span>
        </div>
      )}
    </div>
  );
}
