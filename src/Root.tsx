import React from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './Video';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="BioscopePromo"
        component={MainVideo}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
