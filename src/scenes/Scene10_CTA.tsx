import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene10_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });

  const card1Spr = spring({
    frame: frame - 15,
    fps,
    config: { damping: 13, mass: 0.7 },
  });
  const card2Spr = spring({
    frame: frame - 28,
    fps,
    config: { damping: 13, mass: 0.7 },
  });

  const sceneOpacity = interpolate(frame, [170, 189], [1, 0], { extrapolateRight: 'clamp' });

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
          প্রতিষ্ঠানের জনবল প্রয়োজন?
        </div>
        <h2
          style={{
            fontSize: 50,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
          }}
        >
          আজই আমাদের সাথে <span style={{ color: '#34d399' }}>যোগাযোগ করুন</span>
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 36,
          width: '100%',
          maxWidth: 1100,
        }}
      >
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.75)',
            backdropFilter: 'blur(16px)',
            borderRadius: 26,
            border: '1px solid rgba(14, 165, 233, 0.4)',
            padding: '40px 32px',
            textAlign: 'center',
            transform: `scale(${card1Spr})`,
            boxShadow: '0 20px 40px rgba(14, 165, 233, 0.2)',
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 12 }}>🌐</div>
          <div style={{ fontSize: 18, color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>
            ওয়েবসাইটে বিস্তারিত দেখুন
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: '#38bdf8',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            bioscopeltd.net
          </div>
        </div>

        <div
          style={{
            background: 'rgba(30, 41, 59, 0.75)',
            backdropFilter: 'blur(16px)',
            borderRadius: 26,
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '40px 32px',
            textAlign: 'center',
            transform: `scale(${card2Spr})`,
            boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)',
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 12 }}>📞</div>
          <div style={{ fontSize: 18, color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>
            সরাসরি কল বা WhatsApp
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: '#34d399',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            +880 1915 808746
          </div>
        </div>
      </div>
    </div>
  );
};
