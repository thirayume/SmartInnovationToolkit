// src/hooks/useImageLoader.ts
import { useEffect, useRef } from 'react';

export const useImageLoader = (src: string) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  useEffect(() => {
    if (!imgRef.current) {
      const img = new Image();
      img.src = src;
      imgRef.current = img;
    }
  }, [src]);

  return imgRef.current;
};