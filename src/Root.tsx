import React from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './Video';
import { DEFAULT_PROPS, propsProblems, type PromoProps } from './props';
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from './timeline';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="BioscopePromo"
        component={MainVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={DEFAULT_PROPS as PromoProps}
        calculateMetadata={({ props }) => {
          // Fail fast with a readable message instead of a broken render.
          const problems = propsProblems(props);
          if (problems.length) throw new Error(`Invalid BioscopePromo props:\n- ${problems.join('\n- ')}`);
          return {};
        }}
      />
    </>
  );
};
