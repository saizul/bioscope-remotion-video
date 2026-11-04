import React, { useEffect, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';

export const FontLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [handle] = useState(() => delayRender('Loading Bengali fonts...'));
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const regular = new FontFace(
      'Noto Serif Bengali',
      `url(${staticFile('fonts/NotoSerifBengali-Regular.ttf')})`,
      { weight: '400', style: 'normal' }
    );
    const semiBold = new FontFace(
      'Noto Serif Bengali',
      `url(${staticFile('fonts/NotoSerifBengali-SemiBold.ttf')})`,
      { weight: '600', style: 'normal' }
    );
    const bold = new FontFace(
      'Noto Serif Bengali',
      `url(${staticFile('fonts/NotoSerifBengali-Bold.ttf')})`,
      { weight: '700', style: 'normal' }
    );

    Promise.all([regular.load(), semiBold.load(), bold.load()])
      .then((loadedFonts) => {
        loadedFonts.forEach((f) => document.fonts.add(f));
        setFontsLoaded(true);
        continueRender(handle);
      })
      .catch((err) => {
        console.error('Font loading failed:', err);
        setFontsLoaded(true);
        continueRender(handle);
      });
  }, [handle]);

  if (!fontsLoaded) {
    return null;
  }

  return <>{children}</>;
};
