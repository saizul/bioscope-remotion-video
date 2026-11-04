import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene11_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.8 },
  });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Noto Serif Bengali', serif",
        textAlign: 'center',
        padding: '0 100px',
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 26,
          background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)',
          marginBottom: 28,
          transform: `scale(${spr})`,
          opacity,
        }}
      >
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="9" cy="7" r="4" stroke="#ffffff" strokeWidth="2.2" />
          <path
            d="M23 21v-2a4 4 0 0 0-3-3.87"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M16 3.13a4 4 0 0 1 0 7.75"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h1
        style={{
          fontSize: 68,
          fontWeight: 700,
          margin: '0 0 16px 0',
          background: 'linear-gradient(135deg, #ffffff 40%, #a5f3fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: `scale(${spr})`,
          opacity,
        }}
      >
        বায়োস্কোপ লিমিটেড
      </h1>

      <div
        style={{
          fontSize: 34,
          fontWeight: 600,
          color: '#34d399',
          marginBottom: 24,
          opacity: subOp,
        }}
      >
        দক্ষ জনবল • বিশ্বস্ত সমাধান
      </div>

      <div
        style={{
          fontSize: 22,
          color: '#94a3b8',
          letterSpacing: '1px',
          opacity: subOp,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        www.bioscopeltd.net
      </div>
    </div>
  );
};
