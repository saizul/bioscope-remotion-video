import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const rot1 = interpolate(frame, [0, 2700], [0, 180]);
  const rot2 = interpolate(frame, [0, 2700], [0, -240]);
  const pulse = Math.sin(frame / 40) * 0.15 + 0.85;

  return (
    <div
      style={{
        position: 'absolute',
        width: 1920,
        height: 1080,
        top: 0,
        left: 0,
        backgroundColor: '#070D1E',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Subtle Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.7,
        }}
      />

      {/* Ambient Orb 1 - Deep Cyan */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          top: -200,
          right: -100,
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.22) 0%, rgba(14, 165, 233, 0) 70%)',
          transform: `rotate(${rot1}deg) scale(${pulse})`,
          filter: 'blur(80px)',
        }}
      />

      {/* Ambient Orb 2 - Emerald Glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          bottom: -200,
          left: -100,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0) 70%)',
          transform: `rotate(${rot2}deg) scale(${pulse})`,
          filter: 'blur(90px)',
        }}
      />

      {/* Ambient Orb 3 - Center subtle Royal Blue */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          top: '25%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0) 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Sleek vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(5, 10, 24, 0.75) 100%)',
        }}
      />
    </div>
  );
};
