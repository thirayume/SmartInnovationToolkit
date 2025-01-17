// src/components/common/Image.tsx
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, fallback = '/assets/placeholder.png', ...props }) => {
  const [error, setError] = React.useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default Image;