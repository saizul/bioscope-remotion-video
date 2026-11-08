# Bioscope Promo Video (Remotion)

Corporate promo video for Bioscope Limited built in code with [Remotion](https://remotion.dev) (React).

- Composition ID: `BioscopePromo`
- Format: 1920x1080, 30 fps, 2700 frames (90 seconds)
- Entry point: `src/index.ts`, composition registered in `src/Root.tsx`

## Scenes

`src/Video.tsx` lays out 11 scenes with `<Sequence>` blocks (intro, sectors, stats, two division scenes, verification, process, job seekers, apply, call to action and outro). Scene timings are frame offsets in that file; shared pieces (background, header, progress bar, font loader) live in `src/components/`.

## Usage

```bash
npm install
npm start            # Remotion Studio preview
npm run build        # renders out/bioscope-promo.mp4
npm run typecheck    # tsc --noEmit
```

## Assets

- Fonts: Noto Serif Bengali is loaded from `public/fonts/` by `FontLoader`.
- Audio: the video references `public/audio.mp3` (voice-over/music). The file is not committed, so add your own track at that path before rendering.

CI runs the type check on every push and pull request.

**Author:** [Saizul Amin](https://saizul.com)
