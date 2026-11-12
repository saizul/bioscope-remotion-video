/**
 * Scene timeline for BioscopePromo: the single source of truth used by Video.tsx,
 * Root.tsx and scripts/chapters.ts. No React imports, so it also runs in plain Node.
 * Frame numbers were aligned to the 89.6 s voice-over.
 */
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export type SceneKey =
  | 'intro'
  | 'sectors'
  | 'stats'
  | 'divisions1'
  | 'divisions2'
  | 'verification'
  | 'process'
  | 'jobSeekers'
  | 'apply'
  | 'cta'
  | 'outro';

export type SceneSpec = { key: SceneKey; title: string; from: number; durationInFrames: number };

export const SCENES: readonly SceneSpec[] = [
  { key: 'intro', title: 'Brand intro', from: 0, durationInFrames: 201 },
  { key: 'sectors', title: 'Sectors we serve', from: 201, durationInFrames: 258 },
  { key: 'stats', title: 'Scale and numbers', from: 459, durationInFrames: 207 },
  { key: 'divisions1', title: 'Divisions 1 to 4', from: 666, durationInFrames: 300 },
  { key: 'divisions2', title: 'Divisions 5 to 8', from: 966, durationInFrames: 294 },
  { key: 'verification', title: 'Verification and payroll', from: 1260, durationInFrames: 279 },
  { key: 'process', title: 'Our 4-step process', from: 1539, durationInFrames: 270 },
  { key: 'jobSeekers', title: 'For job seekers', from: 1809, durationInFrames: 336 },
  { key: 'apply', title: 'How to apply', from: 2145, durationInFrames: 255 },
  { key: 'cta', title: 'Contact us', from: 2400, durationInFrames: 189 },
  { key: 'outro', title: 'Outro', from: 2589, durationInFrames: 111 },
];

export const TOTAL_FRAMES = SCENES.reduce((sum, s) => sum + s.durationInFrames, 0);

/** Problems with the timeline itself (gaps, overlaps, bad lengths, duplicate keys). */
export function timelineProblems(scenes: readonly SceneSpec[] = SCENES): string[] {
  const problems: string[] = [];
  let cursor = 0;
  const keys = new Set<string>();
  for (const s of scenes) {
    if (keys.has(s.key)) problems.push(`duplicate scene key "${s.key}"`);
    keys.add(s.key);
    if (!Number.isInteger(s.durationInFrames) || s.durationInFrames < 1) {
      problems.push(`${s.key}: durationInFrames must be a positive integer`);
    }
    if (!s.title.trim()) problems.push(`${s.key}: title is empty`);
    if (s.from !== cursor) problems.push(`${s.key}: starts at ${s.from}, expected ${cursor} (${s.from > cursor ? 'gap' : 'overlap'})`);
    cursor = s.from + s.durationInFrames;
  }
  return problems;
}
