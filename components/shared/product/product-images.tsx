'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className='space-y-6'>
      {/* Main Image */}
      <div className='relative group'>
        <div className='relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800'>
          <Image
            src={images[current]}
            alt='product image'
            width={800}
            height={800}
            className='w-full h-[500px] md:h-[600px] object-cover object-center transition-all duration-300 group-hover:scale-105'
            priority={true}
          />

          {/* Zoom Overlay */}
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
            <div className='w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg'>
              <ZoomIn className='h-6 w-6 text-gray-700 dark:text-gray-300' />
            </div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700'
              >
                <ChevronLeft className='h-5 w-5 text-gray-700 dark:text-gray-300' />
              </button>
              <button
                onClick={nextImage}
                className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700'
              >
                <ChevronRight className='h-5 w-5 text-gray-700 dark:text-gray-300' />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className='absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium'>
              {current + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className='space-y-3'>
          <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Product Images ({images.length})
          </h3>
          <div className='grid grid-cols-4 md:grid-cols-5 gap-3'>
            {images.map((image, index) => (
              <button
                key={image}
                onClick={() => setCurrent(index)}
                className={cn(
                  'relative overflow-hidden rounded-xl border-2 transition-all duration-200 hover:scale-105',
                  current === index
                    ? 'border-[#864AF9] shadow-lg shadow-[#864AF9]/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#F8E559]'
                )}
              >
                <Image
                  src={image}
                  alt={`product image ${index + 1}`}
                  width={120}
                  height={120}
                  className='w-full h-20 md:h-24 object-cover object-center'
                />

                {/* Active Indicator */}
                {current === index && (
                  <div className='absolute inset-0 bg-[#864AF9]/20 flex items-center justify-center'>
                    <div className='w-6 h-6 bg-[#864AF9] rounded-full flex items-center justify-center'>
                      <div className='w-2 h-2 bg-white rounded-full'></div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Navigation Dots */}
      {images.length > 1 && (
        <div className='flex justify-center space-x-2'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                current === index
                  ? 'bg-[#864AF9] w-6'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-[#F8E559]'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
