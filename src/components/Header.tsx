import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const Header: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [0, 25], [-20, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 80,
        right: 80,
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 20,
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex: 50,
        fontFamily: "'Noto Serif Bengali', serif",
      }}
    >
      {/* Brand logo & name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '0.5px' }}>
            BIOSCOPE LIMITED
          </div>
          <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>
            বায়োস্কোপ লিমিটেড • দক্ষ জনবল সেবা
          </div>
        </div>
      </div>

      {/* Tag / Status badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 30,
            color: '#34d399',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981',
            }}
          />
          সারা দেশে বিশ্বস্ত জনবল সরবরাহ
        </div>
      </div>
    </div>
  );
};
