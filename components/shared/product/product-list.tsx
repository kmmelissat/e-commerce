import ProductCard from './product-card';
import { Product } from '@/types';
import { Sparkles, TrendingUp } from 'lucide-react';

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <section className='py-16 px-4'>
      <div className='container mx-auto'>
        {/* Section Header */}
        {title && (
          <div className='text-center mb-12'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                <Sparkles className='h-4 w-4 text-black' />
              </div>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-white'>
                {title}
              </h2>
              <div className='w-8 h-8 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center'>
                <TrendingUp className='h-4 w-4 text-white' />
              </div>
            </div>
            <p className='text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto'>
              Discover our latest arrivals and trending products. Fresh styles,
              innovative designs, and unbeatable quality.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {data.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {limitedData.map((product: Product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Sparkles className='h-8 w-8 text-gray-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-2'>
              No products found
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Check back soon for new arrivals!
            </p>
          </div>
        )}

        {/* View More Section */}
        {limit && data.length > limit && (
          <div className='text-center mt-12'>
            <div className='inline-flex items-center gap-2 text-[#864AF9] hover:text-[#7C3AED] transition-colors duration-200 cursor-pointer'>
              <span className='font-semibold'>
                View all {data.length} products
              </span>
              <TrendingUp className='h-4 w-4' />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
