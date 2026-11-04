import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const features = [
  {
    icon: '🔍',
    title: 'যাচাইকৃত প্রার্থী ও ব্যাকগ্রাউন্ড চেক',
    desc: 'এনআইডি, জাতীয় পরিচয়পত্র, পূর্ববর্তী কাজের অভিজ্ঞতা এবং বিশ্বস্ত রেফারেন্স নিবিড়ভাবে যাচাই।',
    accent: '#38bdf8',
  },
  {
    icon: '📋',
    title: 'হাজিরা ও পেরোল ব্যবস্থাপনা',
    desc: 'কর্মীদের সার্বক্ষণিক উপস্থিতি ট্র্যাকিং, কার্যবিবরণী ও নিয়মতান্ত্রিক বেতন পরিশোধের ঝামেলামুক্ত সহায়তা।',
    accent: '#34d399',
  },
  {
    icon: '🔄',
    title: 'কর্মী প্রতিস্থাপন গ্যারান্টি',
    desc: 'চুক্তির শর্তানুযায়ী কোনো কর্মীর অনুপস্থিতি বা অমিলের ক্ষেত্রে তাৎক্ষণিক বিকল্প কর্মী নিশ্চিতকরণ।',
    accent: '#f59e0b',
  },
];

export const Scene6_Verification: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });
  const sceneOpacity = interpolate(frame, [259, 279], [1, 0], { extrapolateRight: 'clamp' });

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
          নির্ভরযোগ্যতা ও সুশাসন
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
          }}
        >
          যাচাই ও <span style={{ color: '#34d399' }}>ব্যবস্থাপনা সহায়তা</span>
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
          width: '100%',
          maxWidth: 1350,
        }}
      >
        {features.map((f, i) => {
          const delay = 12 + i * 10;
          const s = spring({
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
              key={f.title}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                backdropFilter: 'blur(16px)',
                borderRadius: 24,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '38px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                opacity: op,
                transform: `scale(${s})`,
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div
                style={{
                  fontSize: 44,
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: `${f.accent}18`,
                  border: `1px solid ${f.accent}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 12,
                  lineHeight: '1.3',
                }}
              >
                {f.title}
              </div>
              <div style={{ fontSize: 16, color: '#94a3b8', lineHeight: '1.6' }}>
                {f.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
