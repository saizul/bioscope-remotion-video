import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { FontLoader } from './components/FontLoader';
import { Scene1_Intro } from './scenes/Scene1_Intro';
import { Scene2_Sectors } from './scenes/Scene2_Sectors';
import { Scene3_Stats } from './scenes/Scene3_Stats';
import { Scene4_Divisions1 } from './scenes/Scene4_Divisions1';
import { Scene5_Divisions2 } from './scenes/Scene5_Divisions2';
import { Scene6_Verification } from './scenes/Scene6_Verification';
import { Scene7_Process } from './scenes/Scene7_Process';
import { Scene8_JobSeekers } from './scenes/Scene8_JobSeekers';
import { Scene9_Apply } from './scenes/Scene9_Apply';
import { Scene10_CTA } from './scenes/Scene10_CTA';
import { Scene11_Outro } from './scenes/Scene11_Outro';

export const MainVideo: React.FC = () => {
  return (
    <FontLoader>
      <div
        style={{
          position: 'relative',
          width: 1920,
          height: 1080,
          backgroundColor: '#070D1E',
          overflow: 'hidden',
        }}
      >
        {/* Background & Ambient Lighting */}
        <Background />

        {/* Global Persistent Header & Progress Bar */}
        <Header />
        <ProgressBar />

        {/* Voiceover Audio (89.63s duration, synced) */}
        <Audio src={staticFile('audio.mp3')} />

        {/* Scene 1: 0 - 201 (00:00 - 00:06.7) Brand Intro */}
        <Sequence from={0} durationInFrames={201}>
          <Scene1_Intro />
        </Sequence>

        {/* Scene 2: 201 - 459 (00:06.7 - 00:15.3) Sectors */}
        <Sequence from={201} durationInFrames={258}>
          <Scene2_Sectors />
        </Sequence>

        {/* Scene 3: 459 - 666 (00:15.3 - 00:22.2) Scale & Stats */}
        <Sequence from={459} durationInFrames={207}>
          <Scene3_Stats />
        </Sequence>

        {/* Scene 4: 666 - 966 (00:22.2 - 00:32.2) Divisions 1 to 4 */}
        <Sequence from={666} durationInFrames={300}>
          <Scene4_Divisions1 />
        </Sequence>

        {/* Scene 5: 966 - 1260 (00:32.2 - 00:42.0) Divisions 5 to 8 */}
        <Sequence from={966} durationInFrames={294}>
          <Scene5_Divisions2 />
        </Sequence>

        {/* Scene 6: 1260 - 1539 (00:42.0 - 00:51.3) Verification & Payroll */}
        <Sequence from={1260} durationInFrames={279}>
          <Scene6_Verification />
        </Sequence>

        {/* Scene 7: 1539 - 1809 (00:51.3 - 01:00.3) 4-Step Process */}
        <Sequence from={1539} durationInFrames={270}>
          <Scene7_Process />
        </Sequence>

        {/* Scene 8: 1809 - 2145 (01:00.3 - 01:11.5) Job Seekers */}
        <Sequence from={1809} durationInFrames={336}>
          <Scene8_JobSeekers />
        </Sequence>

        {/* Scene 9: 2145 - 2400 (01:11.5 - 01:20.0) How to Apply */}
        <Sequence from={2145} durationInFrames={255}>
          <Scene9_Apply />
        </Sequence>

        {/* Scene 10: 2400 - 2589 (01:20.0 - 01:26.3) CTA & Contacts */}
        <Sequence from={2400} durationInFrames={189}>
          <Scene10_CTA />
        </Sequence>

        {/* Scene 11: 2589 - 2700 (01:26.3 - 01:30.0) Outro Signature */}
        <Sequence from={2589} durationInFrames={111}>
          <Scene11_Outro />
        </Sequence>
      </div>
    </FontLoader>
  );
};
