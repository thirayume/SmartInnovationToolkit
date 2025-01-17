// src/components/common/LazyImage.tsx
import React, { memo } from 'react';
import { IMAGES } from '../../constants/images';

interface LazyImageProps {
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  size?: 'small' | 'large';
}

const LazyImage = memo(({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  size = 'small' 
}: LazyImageProps) => {
  const fallbackSrc = size === 'large' ? IMAGES.PLACEHOLDER.LARGE : IMAGES.PLACEHOLDER.SMALL;
  
  return (
    <img
      src={src || fallbackSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        e.currentTarget.src = fallbackSrc;
      }}
    />
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;