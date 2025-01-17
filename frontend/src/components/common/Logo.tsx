// src/components/common/Logo.tsx
import React from 'react';
import LazyImage from './LazyImage';
import { IMAGES } from '../../constants/images';

const Logo = () => {
  return (
    <LazyImage
      src={IMAGES.LOGOS.MAIN}
      alt="Logo"
      width={150}
      height={50}
      className="w-auto h-auto"
      fallback={IMAGES.PLACEHOLDER.SMALL}
    />
  );
};

export default Logo;