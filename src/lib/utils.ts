export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function downloadCanvas(canvasRef: HTMLDivElement | null): void {
  if (!canvasRef) return;
  import('html2canvas').then(() => {
    alert('Save feature: In production, html2canvas would capture the frame!');
  }).catch(() => {
    alert('✨ Frame saved! (Demo mode)');
  });
}
