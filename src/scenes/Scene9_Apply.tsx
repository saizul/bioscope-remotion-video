import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const fields = [
  'পছন্দের পদ ও ক্যাটাগরি',
  'শিক্ষাগত যোগ্যতা ও সার্টিফিকেট',
  'কাজের বাস্তব অভিজ্ঞতা',
  'সচল মোবাইল নম্বর',
];

export const Scene9_Apply: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });
  const urlSpr = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, mass: 0.8 },
  });
  const urlOp = interpolate(frame, [40, 55], [0, 1], { extrapolateRight: 'clamp' });
  const sceneOpacity = interpolate(frame, [235, 255], [1, 0], { extrapolateRight: 'clamp' });

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
          অনলাইনে আবেদন প্রক্রিয়া
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
          }}
        >
          সহজে আবেদন করতে যা যা লাগবে
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 18,
          width: '100%',
          maxWidth: 1300,
          marginBottom: 40,
        }}
      >
        {fields.map((f, i) => {
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
              key={f}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                backdropFilter: 'blur(14px)',
                borderRadius: 18,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px 20px',
                textAlign: 'center',
                opacity: op,
                transform: `scale(${spr})`,
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>✍️</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#f8fafc' }}>
                {f}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(16, 185, 129, 0.2))',
          border: '2px solid rgba(16, 185, 129, 0.5)',
          borderRadius: 24,
          padding: '20px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          opacity: urlOp,
          transform: `scale(${urlSpr})`,
          boxShadow: '0 15px 40px rgba(16, 185, 129, 0.25)',
        }}
      >
        <span style={{ fontSize: 32 }}>🌐</span>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 16, color: '#94a3b8', fontWeight: 600 }}>
            অনলাইনে সরাসরি সিভি বা তথ্য জমা দিন
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: '#34d399',
              letterSpacing: '1px',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            bioscopeltd.net/apply/
          </div>
        </div>
      </div>
    </div>
  );
};
