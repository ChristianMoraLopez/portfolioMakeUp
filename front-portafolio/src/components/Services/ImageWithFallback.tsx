import React from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt }) => (
  <div style={{ width: 300, height: 200, position: 'relative' }}>
    <Image src={src || 'https://via.placeholder.com/250'} alt={alt} layout="fill" objectFit="cover" />
  </div>
);

export default ImageWithFallback;
