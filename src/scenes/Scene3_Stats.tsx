import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const stats = [
  {
    numEn: 8,
    numBn: '৮টি',
    label: 'বিশেষায়িত বিভাগ',
    sub: 'প্রতিটি খাতের জন্য আলাদা ক্যাটাগরি',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
  },
  {
    numEn: 67,
    numBn: '৬৭টি',
    label: 'জনবলের ভিন্ন পদ',
    sub: 'দক্ষ, আধা-দক্ষ ও অভিজ্ঞ কর্মী',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
  },
  {
    numEn: 64,
    numBn: '৬৪টি',
    label: 'জেলায় সেবা নেটওয়ার্ক',
    sub: 'সারাদেশে দ্রুত জনবল সরবরাহ',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  },
];

export const Scene3_Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });

  // Outro fade
  const sceneOpacity = interpolate(frame, [190, 207], [1, 0], { extrapolateRight: 'clamp' });

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
        padding: '0 120px',
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 50,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: '#38bdf8',
            fontWeight: 600,
            marginBottom: 8,
            letterSpacing: '1px',
          }}
        >
          আমাদের সক্ষমতা ও বিস্তৃতি
        </div>
        <h2
          style={{
            fontSize: 50,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
          }}
        >
          সেবার সুসংগঠিত পরিধি ও{' '}
          <span style={{ color: '#34d399' }}>দেশব্যাপী নেটওয়ার্ক</span>
        </h2>
      </div>

      {/* 3 Large Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 36,
          width: '100%',
          maxWidth: 1300,
        }}
      >
        {stats.map((s, i) => {
          const cardDelay = 10 + i * 10;
          const cardSpring = spring({
            frame: frame - cardDelay,
            fps,
            config: { damping: 13, mass: 0.7 },
          });
          const cardOpacity = interpolate(frame, [cardDelay, cardDelay + 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={s.label}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                backdropFilter: 'blur(16px)',
                borderRadius: 28,
                border: `1px solid rgba(255, 255, 255, 0.12)`,
                padding: '44px 32px',
                textAlign: 'center',
                opacity: cardOpacity,
                transform: `scale(${cardSpring})`,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent glow line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: s.gradient,
                }}
              />

              <div
                style={{
                  fontSize: 78,
                  fontWeight: 800,
                  color: s.color,
                  lineHeight: '1.1',
                  marginBottom: 16,
                  textShadow: `0 8px 30px ${s.color}40`,
                }}
              >
                {s.numBn}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 10,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: '#94a3b8',
                  lineHeight: '1.4',
                }}
              >
                {s.sub}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
