# Bioscope Promo Video (Remotion)

Corporate promo video for Bioscope Limited built in code with [Remotion](https://remotion.dev) (React).

- Composition ID: `BioscopePromo`
- Format: 1920x1080, 30 fps, 2700 frames (90 seconds)
- Entry point: `src/index.ts`, composition registered in `src/Root.tsx`

## Scenes

`src/Video.tsx` lays out 11 scenes (intro, sectors, stats, two division scenes, verification, process, job seekers, apply, call to action and outro). Their titles, start frames and lengths live in one place, `src/timeline.ts`, which is also used for the composition length and the chapter export. Shared pieces (background, header, progress bar, font loader) live in `src/components/`.

## Usage

```bash
npm install
npm start            # Remotion Studio preview
npm run build        # renders out/bioscope-promo.mp4
npm run build:silent # same, without the audio track
npm run chapters     # print YouTube chapters for the description
npm run typecheck    # tsc --noEmit
npm test             # timeline, chapter and props tests (no rendering)
```

## Props

| Prop | Default | Meaning |
| --- | --- | --- |
| `audioFile` | `audio.mp3` | file inside `public/` played under the video; `""` renders without audio |
| `audioVolume` | `1` | 0 to 1 |

```bash
npx remotion render src/index.ts BioscopePromo out/promo.mp4 --props='{"audioFile":"music/bed.mp3","audioVolume":0.6}'
```

Props are checked before rendering (unknown keys, paths outside `public/`, unsupported extensions, volume range), so a typo fails at once with a clear message.

## Chapters and captions

`npm run chapters` turns the timeline into text you can paste or upload:

```bash
npm run chapters                                   # YouTube description chapters
npm run chapters -- --format srt --out out/scenes.srt
npm run chapters -- --format vtt --out out/chapters.vtt   # WebVTT chapters for HTML5 players
npm run chapters -- --format json
```

YouTube only shows chapters that start at `0:00`, number at least three and are each at least 10 seconds long. Short scenes are merged into their shorter neighbour (the merged chapter keeps the title of its longest scene, and the first chapter keeps "Brand intro"), so the current timeline gives:

```text
0:00 Brand intro
0:15 Divisions 1 to 4
0:42 Verification and payroll
1:00 For job seekers
1:11 How to apply
```

SRT and WebVTT keep all 11 scenes. The script refuses to run if `timeline.ts` has gaps or overlaps.

## Assets

- Fonts: Noto Serif Bengali is loaded from `public/fonts/` by `FontLoader`.
- Audio: by default the video plays `public/audio.mp3` (voice-over/music). The file is not committed, so add your own track at that path, point `audioFile` at another file, or render with `npm run build:silent`.

CI runs the type check, the tests and the chapter export on every push and pull request.

**Author:** [Saizul Amin](https://saizul.com)
