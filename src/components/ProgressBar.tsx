import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: 'clamp',
  });

  const currentSeconds = Math.floor(frame / 30);
  const currentFraction = frame % 30;
  const currentFormatted = `${String(Math.floor(currentSeconds / 60)).padStart(2, '0')}:${String(
    currentSeconds % 60
  ).padStart(2, '0')}`;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 30,
        left: 80,
        right: 80,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        zIndex: 50,
        fontFamily: "'Noto Serif Bengali', serif",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 6,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #0ea5e9, #10b981)',
            borderRadius: 4,
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
          }}
        />
      </div>

      <div
        style={{
          fontSize: 14,
          color: '#94a3b8',
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.5px',
        }}
      >
        {currentFormatted} / 01:30
      </div>
    </div>
  );
};
