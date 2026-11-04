import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const scale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleY = interpolate(frame, [15, 35], [30, 0], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });

  const cardY = interpolate(frame, [45, 65], [40, 0], { extrapolateRight: 'clamp' });
  const cardOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: 'clamp' });

  // Outro fade
  const sceneOpacity = interpolate(frame, [185, 201], [1, 0], { extrapolateRight: 'clamp' });

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
        textAlign: 'center',
      }}
    >
      {/* Top category pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 24px',
          borderRadius: 50,
          background: 'rgba(14, 165, 233, 0.15)',
          border: '1px solid rgba(14, 165, 233, 0.4)',
          color: '#38bdf8',
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 28,
          opacity: titleOpacity,
        }}
      >
        <span>🏢</span>
        <span>বিশ্বস্ত কর্পোরেট ও গৃহস্থালি জনবল সেবা</span>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontSize: 74,
          fontWeight: 700,
          margin: '0 0 16px 0',
          background: 'linear-gradient(135deg, #ffffff 40%, #a5f3fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: `scale(${scale})`,
          opacity: titleOpacity,
          letterSpacing: '-0.5px',
          textShadow: '0 10px 40px rgba(14, 165, 233, 0.3)',
        }}
      >
        বায়োস্কোপ লিমিটেড
      </h1>

      {/* English sub-title */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: '#94a3b8',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: 24,
          opacity: titleOpacity,
        }}
      >
        Bioscope Limited • Manpower Solutions
      </div>

      {/* Slogan */}
      <div
        style={{
          fontSize: 42,
          fontWeight: 600,
          color: '#34d399',
          marginBottom: 40,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        “দক্ষ জনবল, সমৃদ্ধ প্রতিষ্ঠান”
      </div>

      {/* Highlight Box */}
      <div
        style={{
          maxWidth: 960,
          padding: '24px 44px',
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(16px)',
          borderRadius: 24,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          fontSize: 28,
          lineHeight: '1.6',
          color: '#e2e8f0',
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
        }}
      >
        আপনার প্রতিষ্ঠানের প্রয়োজন অনুযায়ী{' '}
        <span style={{ color: '#38bdf8', fontWeight: 700 }}>বিশ্বস্ত ও সুসংগঠিত</span> জনবল সেবা।
      </div>
    </div>
  );
};
