import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const sectors = [
  { icon: '🏢', name: 'কর্পোরেট অফিস', desc: 'প্রশাসনিক ও সহযোগী কর্মী' },
  { icon: '🏦', name: 'ব্যাংক ও আর্থিক প্রতিষ্ঠান', desc: 'নিরাপত্তা ও সাপোর্ট স্টাফ' },
  { icon: '🏭', name: 'শিল্প কারখানা', desc: 'উৎপাদন ও ফ্লোর অপারেটর' },
  { icon: '🏥', name: 'হাসপাতাল ও ক্লিনিক', desc: 'হাউসকিপিং ও অ্যাটেনডেন্ট' },
  { icon: '🏨', name: 'হোটেল ও রেস্তোরাঁ', desc: 'সার্ভিস ও শেফ অ্যাসিস্ট্যান্ট' },
  { icon: '🛍️', name: 'শোরুম ও আউটলেট', desc: 'সেলস ও কাস্টমার অ্যাসিস্ট' },
  { icon: '🏗️', name: 'নির্মাণ প্রকল্প', desc: 'টেকনিশিয়ান ও সুপারভাইজর' },
  { icon: '🏠', name: 'বাসাবাড়ি ও ফ্ল্যাট', desc: 'বিশ্বস্ত কেয়ারটেকার ও ড্রাইভার' },
];

export const Scene2_Sectors: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });

  // Outro fade
  const sceneOpacity = interpolate(frame, [240, 258], [1, 0], { extrapolateRight: 'clamp' });

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
            fontSize: 20,
            color: '#38bdf8',
            fontWeight: 600,
            marginBottom: 8,
            letterSpacing: '1px',
          }}
        >
          সেবার কর্মক্ষেত্র ও প্রতিষ্ঠান
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
          }}
        >
          প্রতিষ্ঠান ও বাসাবাড়ির জন্য{' '}
          <span style={{ color: '#34d399' }}>নির্ভরযোগ্য জনবল</span>
        </h2>
      </div>

      {/* Grid of 8 sectors */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          width: '100%',
          maxWidth: 1400,
        }}
      >
        {sectors.map((sec, i) => {
          const cardDelay = 10 + i * 5;
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
              key={sec.name}
              style={{
                background: 'rgba(30, 41, 59, 0.65)',
                backdropFilter: 'blur(12px)',
                borderRadius: 20,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                opacity: cardOpacity,
                transform: `scale(${cardSpring})`,
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                style={{
                  fontSize: 34,
                  marginBottom: 12,
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {sec.icon}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 6,
                }}
              >
                {sec.name}
              </div>
              <div style={{ fontSize: 15, color: '#94a3b8', lineHeight: '1.4' }}>
                {sec.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
