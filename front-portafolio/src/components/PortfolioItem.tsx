import React from 'react';
import Image from 'next/image';

interface PortfolioItemProps {
  item: {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    width: number;
    height: number;
  };
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item }) => {
  const { title, imageUrl, description, width = 200, height = 400 } = item;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative h-64">
        <Image
          src={imageUrl}
          alt={title}
          layout="responsive"
          width={width}
          height={height}
          objectFit="cover"
          objectPosition="center"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default PortfolioItem;
