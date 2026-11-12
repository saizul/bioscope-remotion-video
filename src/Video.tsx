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
import { DEFAULT_PROPS, type PromoProps } from './props';
import { HEIGHT, SCENES, WIDTH, type SceneKey } from './timeline';

const SCENE_COMPONENTS: Record<SceneKey, React.FC> = {
  intro: Scene1_Intro,
  sectors: Scene2_Sectors,
  stats: Scene3_Stats,
  divisions1: Scene4_Divisions1,
  divisions2: Scene5_Divisions2,
  verification: Scene6_Verification,
  process: Scene7_Process,
  jobSeekers: Scene8_JobSeekers,
  apply: Scene9_Apply,
  cta: Scene10_CTA,
  outro: Scene11_Outro,
};

export const MainVideo: React.FC<PromoProps> = ({ audioFile = DEFAULT_PROPS.audioFile, audioVolume = DEFAULT_PROPS.audioVolume }) => {
  return (
    <FontLoader>
      <div
        style={{
          position: 'relative',
          width: WIDTH,
          height: HEIGHT,
          backgroundColor: '#070D1E',
          overflow: 'hidden',
        }}
      >
        {/* Background & Ambient Lighting */}
        <Background />

        {/* Global Persistent Header & Progress Bar */}
        <Header />
        <ProgressBar />

        {/* Voice-over / music track: optional, configured through props (see README) */}
        {audioFile ? <Audio src={staticFile(audioFile)} volume={audioVolume} /> : null}

        {/* Scenes: frame ranges come from src/timeline.ts */}
        {SCENES.map((scene) => {
          const SceneComponent = SCENE_COMPONENTS[scene.key];
          return (
            <Sequence key={scene.key} from={scene.from} durationInFrames={scene.durationInFrames} name={scene.title}>
              <SceneComponent />
            </Sequence>
          );
        })}
      </div>
    </FontLoader>
  );
};
