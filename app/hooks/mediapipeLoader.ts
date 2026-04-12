const MEDIAPIPE_SCRIPTS = [
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1675466124/drawing_utils.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1675466862/camera_utils.js',
] as const;

let loadPromise: Promise<void> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-mp="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.crossOrigin = 'anonymous';
    s.dataset.mp = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export function ensureMediapipeLoaded(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  const w = window as unknown as { Pose?: unknown; Camera?: unknown };
  if (w.Pose && w.Camera) return Promise.resolve();

  if (!loadPromise) {
    loadPromise = (async () => {
      for (const src of MEDIAPIPE_SCRIPTS) {
        await loadScript(src);
      }
    })();
  }

  return loadPromise;
}
