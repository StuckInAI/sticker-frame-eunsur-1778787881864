import styles from './FrameSelector.module.css';
import { FRAME_TEMPLATES } from '@/lib/stickers';
import { FrameTemplate } from '@/types';

type FrameSelectorProps = {
  activeFrame: FrameTemplate;
  onSelectFrame: (frame: FrameTemplate) => void;
};

export default function FrameSelector({ activeFrame, onSelectFrame }: FrameSelectorProps) {
  return (
    <div className={styles.selector}>
      <span className={styles.label}>Frame:</span>
      {FRAME_TEMPLATES.map(frame => (
        <button
          key={frame.id}
          className={activeFrame.id === frame.id ? styles.frameBtnActive : styles.frameBtn}
          onClick={() => onSelectFrame(frame)}
          style={{
            borderColor: frame.borderColor,
            background: activeFrame.id === frame.id ? frame.bgColor : 'white',
          }}
        >
          <span
            className={styles.frameColorDot}
            style={{ background: frame.borderColor }}
          />
          <span className={styles.frameName}>{frame.name}</span>
        </button>
      ))}
    </div>
  );
}
