import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const divisions = [
  {
    num: '০১',
    title: 'অফিস ও প্রশাসন',
    roles: 'রিসেপশনিস্ট, অফিস সহকারী, ডাটা এন্ট্রি অপারেটর, পিয়ন ও সাপোর্ট স্টাফ',
    icon: '💼',
    accent: '#38bdf8',
  },
  {
    num: '০২',
    title: 'পরিচ্ছন্নতা, হাউসকিপিং ও পরিচর্যা',
    roles: 'অফিস ও হাসপাতাল ক্লিনার, হাউসকিপার, কেয়ারগিভার ও পরিচর্যাকর্মী',
    icon: '✨',
    accent: '#34d399',
  },
  {
    num: '০৩',
    title: 'নিরাপত্তা, রক্ষণাবেক্ষণ ও ফ্যাসিলিটি',
    roles: 'নিরাপত্তা প্রহরী, সুপারভাইজর, ইলেকট্রিশিয়ান, প্লাম্বার ও টেকনিশিয়ান',
    icon: '🛡️',
    accent: '#fbbf24',
  },
  {
    num: '০৪',
    title: 'ড্রাইভিং ও পণ্য ডেলিভারি',
    roles: 'লাইসেন্সধারী দক্ষ ড্রাইভার, রাইডার, কুরিয়ার ও ডেলিভারি কর্মী',
    icon: '🚚',
    accent: '#f43f5e',
  },
];

export const Scene4_Divisions1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });

  // Outro fade
  const sceneOpacity = interpolate(frame, [280, 300], [1, 0], { extrapolateRight: 'clamp' });

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
      {/* Title */}
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
          জনবল বিভাগ (১ম পর্ব)
        </div>
        <h2
          style={{
            fontSize: 46,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
          }}
        >
          বিশেষায়িত জনবল বিভাগ: <span style={{ color: '#34d399' }}>১ থেকে ৪</span>
        </h2>
      </div>

      {/* 4 Division Rows / Cards */}
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
