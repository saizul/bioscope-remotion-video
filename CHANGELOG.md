# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- `src/timeline.ts`: scene titles, start frames and lengths in one place; `Video.tsx`
  and `Root.tsx` are built from it.
- `npm run chapters` (`scripts/chapters.ts`): export the timeline as YouTube chapters
  (short scenes merged to meet YouTube's 10-second minimum), SRT, WebVTT chapters or JSON.
- `audioFile` and `audioVolume` props, validated before rendering; `npm run build:silent`
  renders without the uncommitted `public/audio.mp3`.
- Tests (`npm test`, node:test via tsx) and CI steps for tests and the chapter export.

## [1.0.0]

- 90-second, 11-scene BioscopePromo composition.
