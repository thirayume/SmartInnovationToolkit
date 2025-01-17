// src/services/imageService.ts
const imageCache = new Map<string, string>();

export const getPlaceholderImage = (width: number, height: number): string => {
  const key = `${width}x${height}`;
  
  if (!imageCache.has(key)) {
    imageCache.set(key, `/api/placeholder/${width}/${height}`);
  }
  
  return imageCache.get(key)!;
};