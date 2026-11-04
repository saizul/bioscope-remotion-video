import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const divisions = [
  {
    num: '০৫',
    title: 'আইটি, সফটওয়্যার ও মিডিয়া',
    roles: 'গ্রাফিক্স ডিজাইনার, ভিডিও এডিটর, ওয়েব ডেভেলপার ও আইটি সাপোর্ট',
    icon: '💻',
    accent: '#38bdf8',
  },
  {
    num: '০৬',
    title: 'প্রকৌশল ও নির্মাণ',
    roles: 'সিভিল ও ইলেকট্রিক্যাল সহকারী, সাইট সুপারভাইজর ও ড্রাফটসম্যান',
    icon: '🏗️',
    accent: '#f59e0b',
  },
  {
    num: '০৭',
    title: 'বিক্রয়, বিপণন ও গ্রাহকসেবা',
    roles: 'সেলস এক্সিকিউটিভ, কাস্টমার কেয়ার এজেন্ট, শোরুম প্রমোটার ও রিটেল স্টাফ',
    icon: '📈',
    accent: '#10b981',
  },
  {
    num: '০৮',
    title: 'প্রশিক্ষণ ও দক্ষতা উন্নয়ন',
    roles: 'পেশাদার প্রশিক্ষক, কারিগরি মেন্টর, ভাষা ও সফট-স্কিল ট্রেইনার',
    icon: '🎓',
    accent: '#8b5cf6',
  },
];

export const Scene5_Divisions2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });
  const sceneOpacity = interpolate(frame, [274, 294], [1, 0], { extrapolateRight: 'clamp' });

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
          marginBottom: 36,
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
          জনবল বিভাগ (২য় পর্ব)
        </div>
        <h2
          style={{
            fontSize: 46,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
          }}
        >
          বিশেষায়িত জনবল বিভাগ: <span style={{ color: '#34d399' }}>৫ থেকে ৮</span>
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          width: '100%',
          maxWidth: 1350,
        }}
      >
        {divisions.map((d, i) => {
          const cardDelay = 10 + i * 8;
          const cardSpring = spring({
            frame: frame - cardDelay,
            fps,
            config: { damping: 14, mass: 0.6 },
          });
          const cardOpacity = interpolate(frame, [cardDelay, cardDelay + 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={d.num}
              style={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(14px)',
                borderRadius: 22,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '28px 30px',
                display: 'flex',
                gap: 20,
                alignItems: 'center',
                opacity: cardOpacity,
                transform: `scale(${cardSpring})`,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  width: 68,
                  height: 68,
                  borderRadius: 18,
                  background: `${d.accent}18`,
                  border: `1px solid ${d.accent}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {d.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: d.accent,
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '2px 8px',
                      borderRadius: 6,
                    }}
                  >
                    বিভাগ {d.num}
                  </span>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#ffffff' }}>
                    {d.title}
                  </div>
                </div>
                <div style={{ fontSize: 16, color: '#94a3b8', lineHeight: '1.5' }}>
                  {d.roles}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
