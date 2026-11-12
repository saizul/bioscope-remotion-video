/**
 * Input props for BioscopePromo. Pass them with `--props` when rendering, e.g.
 *   npx remotion render src/index.ts BioscopePromo out/x.mp4 --props='{"audioFile":""}'
 * Pure module (no React) so it can be validated and tested in Node.
 */
export type PromoProps = {
  /** File inside public/ to play under the video; empty string renders silently. */
  audioFile?: string;
  /** 0 (mute) to 1 (full). */
  audioVolume?: number;
};

export const DEFAULT_PROPS: Required<PromoProps> = { audioFile: 'audio.mp3', audioVolume: 1 };

/** Returns a list of problems; an empty list means the props are usable. */
export function propsProblems(input: unknown): string[] {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) return ['props must be a JSON object'];
  const p = input as Record<string, unknown>;
  const problems: string[] = [];
  for (const key of Object.keys(p)) {
    if (!(key in DEFAULT_PROPS)) problems.push(`unknown prop "${key}" (known: ${Object.keys(DEFAULT_PROPS).join(', ')})`);
  }
  if (p.audioFile !== undefined) {
    if (typeof p.audioFile !== 'string') problems.push('audioFile must be a string');
    else if (p.audioFile && (/^(\/|[a-z]+:)/i.test(p.audioFile) || p.audioFile.split('/').includes('..'))) {
      problems.push('audioFile must be a relative path inside public/ (no "/", "..", or URL)');
    } else if (p.audioFile && !/\.(mp3|wav|m4a|aac|ogg)$/i.test(p.audioFile)) {
      problems.push('audioFile must be an .mp3, .wav, .m4a, .aac or .ogg file');
    }
  }
  if (p.audioVolume !== undefined && (typeof p.audioVolume !== 'number' || !(p.audioVolume >= 0 && p.audioVolume <= 1))) {
    problems.push('audioVolume must be a number between 0 and 1');
  }
  return problems;
}
