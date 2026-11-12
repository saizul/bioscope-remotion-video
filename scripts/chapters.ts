// Export the scene timeline as YouTube chapters, SRT or WebVTT chapters.
// Usage: npx tsx scripts/chapters.ts [--format youtube|srt|vtt|json] [--out FILE]
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { FPS, SCENES, timelineProblems } from '../src/timeline';
import { srt, toChapters, webvttChapters, youtubeChapters } from '../src/chapters';

export const FORMATS = ['youtube', 'srt', 'vtt', 'json'] as const;
export type Format = (typeof FORMATS)[number];

export function render(format: Format): string {
  switch (format) {
    case 'youtube':
      return youtubeChapters(SCENES, FPS);
    case 'srt':
      return srt(SCENES, FPS);
    case 'vtt':
      return webvttChapters(SCENES, FPS);
    case 'json':
      return JSON.stringify(toChapters(SCENES).map((c) => ({ ...c, startSeconds: c.start / FPS, endSeconds: c.end / FPS })), null, 2) + '\n';
  }
}

export function parseArgs(argv: string[]): { format: Format; out?: string } | { error: string } {
  let format: string = 'youtube';
  let out: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--format' || a === '--out') {
      const v = argv[++i];
      if (!v || v.startsWith('--')) return { error: `${a} needs a value` };
      if (a === '--format') format = v;
      else out = v;
    } else {
      return { error: `unknown argument "${a}"` };
    }
  }
  if (!(FORMATS as readonly string[]).includes(format)) return { error: `--format must be one of ${FORMATS.join(', ')}` };
  return { format: format as Format, out };
}

if (process.argv[1] && /chapters\.ts$/.test(process.argv[1])) {
  const args = parseArgs(process.argv.slice(2));
  if ('error' in args) {
    console.error(`error: ${args.error}\nUsage: npx tsx scripts/chapters.ts [--format ${FORMATS.join('|')}] [--out FILE]`);
    process.exit(2);
  }
  const problems = timelineProblems();
  if (problems.length) {
    console.error(`error: src/timeline.ts is inconsistent:\n  - ${problems.join('\n  - ')}`);
    process.exit(1);
  }
  const text = render(args.format);
  if (args.out) {
    mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
    writeFileSync(args.out, text, 'utf8');
    console.error(`wrote ${args.out}`);
  } else {
    process.stdout.write(text);
  }
}
