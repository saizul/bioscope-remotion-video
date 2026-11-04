import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const steps = [
  {
    step: '১',
    title: 'চাহিদা জানান',
    desc: 'কর্মীর পদ, সংখ্যা, দায়িত্ব ও প্রয়োজনীয় শিক্ষাগত যোগ্যতা উল্লেখ করুন।',
    accent: '#38bdf8',
  },
  {
    step: '২',
    title: 'প্রার্থী বাছাই',
    desc: 'আমাদের যাচাইকৃত ডাটাবেজ তালিকা থেকে উপযুক্ত প্রার্থী নির্বাচন করুন।',
    accent: '#34d399',
  },
  {
    step: '৩',
    title: 'চুক্তি সম্পাদন',
    desc: 'স্বচ্ছ শর্তাবলী ও নিয়মের ভিত্তিতে উভয় পক্ষের লিখিত চুক্তি সম্পন্ন।',
    accent: '#fbbf24',
  },
  {
    step: '৪',
    title: 'কর্মী নিয়োজিত',
    desc: 'নির্ধারিত সময়ে সঠিক স্থানে নিশ্চিন্তে যোগ্য কর্মী কাজে যোগদান।',
    accent: '#a855f7',
  },
];

export const Scene7_Process: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });
  const sceneOpacity = interpolate(frame, [250, 270], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: sceneOpacity,
        fontFamily: "'Noto Serif Bengali', serif",
        padding: '0 100px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: 44,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: '#38bdf8',
            fontWeight: 600,
            marginBottom: 6,
            letterSpacing: '1px',
          }}
        >
          সহজ ও স্বচ্ছ প্রক্রিয়া
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
          }}
        >
          সেবা গ্রহণের <span style={{ color: '#34d399' }}>সহজ ৪টি ধাপ</span>
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          width: '100%',
          maxWidth: 1380,
          position: 'relative',
        }}
      >
        {steps.map((s, i) => {
          const delay = 10 + i * 10;
          const spr = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, mass: 0.6 },
          });
          const op = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={s.step}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                backdropFilter: 'blur(14px)',
                borderRadius: 22,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                opacity: op,
                transform: `scale(${spr})`,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  background: `${s.accent}20`,
                  border: `2px solid ${s.accent}`,
                  color: s.accent,
                  fontSize: 26,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  boxShadow: `0 0 20px ${s.accent}40`,
                }}
              >
                {s.step}
              </div>

              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 10,
                }}
              >
                {s.title}
              </div>

              <div style={{ fontSize: 15, color: '#94a3b8', lineHeight: '1.6' }}>
                {s.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
