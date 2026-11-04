import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const seekerBenefits = [
  { icon: '🔓', title: 'ডাটাবেজ নিবন্ধন উন্মুক্ত', desc: 'যে কোনো সময় আপনার সিভি বা তথ্য জমা দিতে পারেন' },
  { icon: '🆓', title: 'কোনো আবেদন ফি নেই', desc: 'শতভাগ বিনামূল্যে ও স্বচ্ছ প্রক্রিয়ায় রেজিস্ট্রেশন' },
  { icon: '📅', title: 'কোনো শেষ তারিখ নেই', desc: 'সারা বছর নতুন আবেদনকারী ও প্রার্থীরা যুক্ত হতে পারেন' },
  { icon: '📞', title: 'সুযোগ এলে টিম যোগাযোগ করবে', desc: 'আপনার যোগ্যতার সাথে ম্যাচিং চাকরির নোটিফিকেশন' },
];

export const Scene8_JobSeekers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });
  const sceneOpacity = interpolate(frame, [316, 336], [1, 0], { extrapolateRight: 'clamp' });

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
          marginBottom: 40,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: '#34d399',
            fontWeight: 600,
            marginBottom: 6,
            letterSpacing: '1px',
          }}
        >
          কর্মপ্রার্থীদের জন্য বিশেষ সুযোগ
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
          }}
        >
          চাকরিপ্রার্থীদের <span style={{ color: '#38bdf8' }}>ডাটাবেজ নিবন্ধন</span>
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          width: '100%',
          maxWidth: 1250,
        }}
      >
        {seekerBenefits.map((b, i) => {
          const delay = 10 + i * 8;
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
              key={b.title}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                backdropFilter: 'blur(14px)',
                borderRadius: 22,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '28px 30px',
                display: 'flex',
                gap: 20,
                alignItems: 'center',
                opacity: op,
                transform: `scale(${spr})`,
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                style={{
                  fontSize: 34,
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: 'rgba(52, 211, 153, 0.12)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {b.icon}
              </div>

              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>
                  {b.title}
                </div>
                <div style={{ fontSize: 16, color: '#94a3b8', lineHeight: '1.5' }}>
                  {b.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
