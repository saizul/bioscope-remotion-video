import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FPS, SCENES, TOTAL_FRAMES, timelineProblems, type SceneSpec } from '../src/timeline';
import { cueTime, mergeShort, srt, toChapters, webvttChapters, youtubeChapters, youtubeTime } from '../src/chapters';
import { DEFAULT_PROPS, propsProblems } from '../src/props';
import { parseArgs, render } from '../scripts/chapters';

test('timeline is contiguous and 90 seconds long', () => {
  assert.deepEqual(timelineProblems(), []);
  assert.equal(SCENES.length, 11);
  assert.equal(TOTAL_FRAMES, 2700);
  assert.equal(TOTAL_FRAMES / FPS, 90);
});

test('timelineProblems finds gaps, overlaps, duplicates and empty titles', () => {
  const s: SceneSpec[] = JSON.parse(JSON.stringify(SCENES));
  s[2].from += 3;
  s[4].key = s[3].key;
  s[5].title = ' ';
  s[6].durationInFrames = 0;
  const msgs = timelineProblems(s).join('\n');
  assert.match(msgs, /stats: starts at 462, expected 459 \(gap\)/);
  assert.match(msgs, /overlap/);
  assert.match(msgs, /duplicate scene key "divisions1"/);
  assert.match(msgs, /title is empty/);
  assert.match(msgs, /positive integer/);
});

test('time formatting', () => {
  assert.equal(youtubeTime(0, 30), '0:00');
  assert.equal(youtubeTime(2145, 30), '1:11');
  assert.equal(youtubeTime(3600 * 30 + 65 * 30, 30), '1:01:05');
  assert.equal(cueTime(201, 30, ','), '00:00:06,700');
  assert.equal(cueTime(2589, 30, '.'), '00:01:26.300');
});

test('YouTube chapters: start at 0:00, at least 3, each >= 10 s', () => {
  const text = youtubeChapters(SCENES, FPS);
  const lines = text.trim().split('\n');
  assert.equal(lines[0], '0:00 Brand intro');
  assert.ok(lines.length >= 3);
  const merged = mergeShort(toChapters(SCENES), 10 * FPS);
  for (const c of merged) assert.ok(c.end - c.start >= 300, `${c.title} is shorter than 10 s`);
  assert.equal(merged[0].start, 0);
  assert.equal(merged[merged.length - 1].end, TOTAL_FRAMES);
  for (let i = 1; i < merged.length; i++) assert.equal(merged[i].start, merged[i - 1].end);
});

test('mergeShort joins with the shorter neighbour and keeps the longest title', () => {
  const ch = [
    { start: 0, end: 100, title: 'A' },
    { start: 100, end: 400, title: 'B' },
    { start: 400, end: 450, title: 'C' }, // short: neighbours B (300) and D (500) -> B
    { start: 450, end: 950, title: 'D' },
  ];
  assert.deepEqual(mergeShort(ch, 300), [
    { start: 0, end: 450, title: 'A' }, // first chapter keeps the first title
    { start: 450, end: 950, title: 'D' },
  ]);
  assert.deepEqual(mergeShort([{ start: 0, end: 10, title: 'Only' }], 300), [{ start: 0, end: 10, title: 'Only' }]);
});

test('too few long chapters is an error for YouTube', () => {
  const tiny: SceneSpec[] = [
    { key: 'intro', title: 'a', from: 0, durationInFrames: 300 },
    { key: 'outro', title: 'b', from: 300, durationInFrames: 300 },
  ];
  assert.throws(() => youtubeChapters(tiny, 30), /YouTube needs 3/);
});

test('SRT and WebVTT cover every scene', () => {
  const s = srt(SCENES, FPS);
  assert.equal(s.split('-->').length - 1, 11);
  assert.match(s, /^1\n00:00:00,000 --> 00:00:06,700\nBrand intro\n/);
  const v = webvttChapters(SCENES, FPS);
  assert.ok(v.startsWith('WEBVTT\n\nchapter-1\n00:00:00.000 --> 00:00:06.700\nBrand intro'));
  assert.match(v, /00:01:26\.300 --> 00:01:30\.000\nOutro\n$/);
});

test('chapters CLI argument parsing and JSON output', () => {
  assert.deepEqual(parseArgs([]), { format: 'youtube', out: undefined });
  assert.deepEqual(parseArgs(['--format', 'srt', '--out', 'out/x.srt']), { format: 'srt', out: 'out/x.srt' });
  assert.match((parseArgs(['--format', 'gif']) as { error: string }).error, /must be one of/);
  assert.match((parseArgs(['--out']) as { error: string }).error, /needs a value/);
  assert.match((parseArgs(['extra']) as { error: string }).error, /unknown argument/);
  const json = JSON.parse(render('json'));
  assert.equal(json.length, 11);
  assert.deepEqual(json[10], { start: 2589, end: 2700, title: 'Outro', startSeconds: 86.3, endSeconds: 90 });
});

test('props validation', () => {
  assert.deepEqual(propsProblems(DEFAULT_PROPS), []);
  assert.deepEqual(propsProblems({}), []);
  assert.deepEqual(propsProblems(JSON.parse(readFileSync('props/silent.json', 'utf8'))), []);
  assert.deepEqual(propsProblems({ audioFile: 'music/track.wav', audioVolume: 0.4 }), []);
  assert.deepEqual(propsProblems(null), ['props must be a JSON object']);
  const bad = propsProblems({ audioFile: '../secret.mp3', audioVolume: 2, audio: 'x' }).join('\n');
  assert.match(bad, /unknown prop "audio"/);
  assert.match(bad, /relative path inside public/);
  assert.match(bad, /between 0 and 1/);
  assert.match(propsProblems({ audioFile: 'https://x/a.mp3' }).join(), /relative path/);
  assert.match(propsProblems({ audioFile: 'notes.txt' }).join(), /\.mp3/);
  assert.match(propsProblems({ audioFile: 3 }).join(), /must be a string/);
});
