/**
 * Turns the scene timeline into YouTube chapters, SRT captions or WebVTT chapters.
 *
 * YouTube only shows chapters when the list starts at 0:00, has at least three entries
 * and every chapter is at least 10 seconds long. Short scenes (the 6.7 s intro, the
 * 3.7 s outro) are therefore merged into their shorter neighbour; a merged chapter keeps
 * the title of its longest scene, except that the chapter at 0:00 keeps the first scene's
 * title (viewers expect "Intro" there).
 */
import type { SceneSpec } from './timeline';

export type Chapter = { start: number; end: number; title: string };

export const YOUTUBE_MIN_SECONDS = 10;
export const YOUTUBE_MIN_CHAPTERS = 3;

export const toChapters = (scenes: readonly SceneSpec[]): Chapter[] =>
  scenes.map((s) => ({ start: s.from, end: s.from + s.durationInFrames, title: s.title }));

/** Merge chapters shorter than `minFrames` into a neighbour (the shorter neighbour first). */
export function mergeShort(chapters: readonly Chapter[], minFrames: number): Chapter[] {
  type Group = Chapter & { main: number };
  const groups: Group[] = chapters.map((c) => ({ ...c, main: c.end - c.start }));
  const len = (g: Group) => g.end - g.start;
  for (;;) {
    let idx = -1;
    for (let i = 0; i < groups.length; i++) {
      if (len(groups[i]) < minFrames && (idx === -1 || len(groups[i]) < len(groups[idx]))) idx = i;
    }
    if (idx === -1 || groups.length === 1) break;
    const prev = groups[idx - 1];
    const next = groups[idx + 1];
    const target = !prev ? idx + 1 : !next ? idx - 1 : len(prev) <= len(next) ? idx - 1 : idx + 1;
    const [a, b] = target < idx ? [groups[target], groups[idx]] : [groups[idx], groups[target]];
    // `main` is the length of the longest original scene in the group; its title wins.
    const merged: Group = { start: a.start, end: b.end, title: a.main >= b.main ? a.title : b.title, main: Math.max(a.main, b.main) };
    groups.splice(Math.min(idx, target), 2, merged);
  }
  const out = groups.map(({ start, end, title }) => ({ start, end, title }));
  if (out.length && chapters.length) out[0].title = chapters[0].title;
  return out;
}

const pad = (n: number, w = 2) => String(n).padStart(w, '0');

/** "m:ss", or "h:mm:ss" past an hour, as YouTube expects. */
export function youtubeTime(frames: number, fps: number): string {
  const total = Math.floor(frames / fps);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** "hh:mm:ss,mmm" (SRT) or "hh:mm:ss.mmm" (WebVTT). */
export function cueTime(frames: number, fps: number, sep: ',' | '.'): string {
  const ms = Math.round((frames / fps) * 1000);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)}${sep}${pad(ms % 1000, 3)}`;
}

export function youtubeChapters(scenes: readonly SceneSpec[], fps: number): string {
  const chapters = mergeShort(toChapters(scenes), YOUTUBE_MIN_SECONDS * fps);
  if (chapters.length < YOUTUBE_MIN_CHAPTERS) {
    throw new Error(`only ${chapters.length} chapter(s) of at least ${YOUTUBE_MIN_SECONDS} s; YouTube needs ${YOUTUBE_MIN_CHAPTERS}`);
  }
  return chapters.map((c) => `${youtubeTime(c.start, fps)} ${c.title}`).join('\n') + '\n';
}

export function srt(scenes: readonly SceneSpec[], fps: number): string {
  return (
    toChapters(scenes)
      .map((c, i) => `${i + 1}\n${cueTime(c.start, fps, ',')} --> ${cueTime(c.end, fps, ',')}\n${c.title}\n`)
      .join('\n')
  );
}

export function webvttChapters(scenes: readonly SceneSpec[], fps: number): string {
  const body = toChapters(scenes)
    .map((c, i) => `chapter-${i + 1}\n${cueTime(c.start, fps, '.')} --> ${cueTime(c.end, fps, '.')}\n${c.title}\n`)
    .join('\n');
  return `WEBVTT\n\n${body}`;
}
