import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import ProductPrice from './product-price';
import { Product } from '@/types';
import Rating from './rating';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';

const ProductCard = ({ product }: { product: Product }) => {
  const isNew =
    new Date(product.createdAt).getTime() >
    Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days
  const isOnSale = Number(product.price) > 50; // Example sale condition

  return (
    <Card className='group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-900'>
      {/* Image Container */}
      <div className='relative overflow-hidden'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
            className='w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-300'
          />
        </Link>

        {/* Badges */}
        <div className='absolute top-3 left-3 flex flex-col gap-2'>
          {isNew && (
            <Badge className='bg-[#F8E559] text-black hover:bg-[#F8E559]/90 text-xs font-semibold'>
              NEW
            </Badge>
          )}
          {isOnSale && (
            <Badge className='bg-red-500 text-white hover:bg-red-600 text-xs font-semibold'>
              SALE
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className='bg-[#864AF9] text-white hover:bg-[#7C3AED] text-xs font-semibold'>
              FEATURED
            </Badge>
          )}
        </div>

        {/* Stock Status */}
        {product.stock === 0 && (
          <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
            <Badge className='bg-red-500 text-white text-sm font-semibold'>
              OUT OF STOCK
            </Badge>
          </div>
        )}

        {/* Quick Actions */}
        <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <button className='w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-[#F8E559] hover:text-black transition-all duration-200'>
            <Heart className='h-4 w-4' />
          </button>
          <button className='w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-[#864AF9] hover:text-white transition-all duration-200'>
            <Eye className='h-4 w-4' />
          </button>
        </div>
      </div>

      {/* Content */}
      <CardContent className='p-4 space-y-3'>
        {/* Brand */}
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium text-[#864AF9] uppercase tracking-wider'>
            {product.brand}
          </span>
          <div className='flex items-center gap-1'>
            <Star className='h-3 w-3 text-[#F8E559] fill-current' />
            <span className='text-xs text-gray-600 dark:text-gray-400'>
              {product.numReviews} reviews
            </span>
          </div>
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className='font-semibold text-gray-800 dark:text-white hover:text-[#864AF9] transition-colors duration-200 line-clamp-2'>
            {product.name}
          </h3>
        </Link>

        {/* Category */}
        <div className='flex items-center gap-2'>
          <Badge
            variant='outline'
            className='text-xs border-gray-200 dark:border-gray-700'
          >
            {product.category}
          </Badge>
        </div>

        {/* Rating and Price */}
        <div className='flex items-center justify-between'>
          <Rating value={Number(product.rating)} />
          <div className='text-right'>
            {product.stock > 0 ? (
              <ProductPrice value={Number(product.price)} />
            ) : (
              <p className='text-red-500 font-semibold text-sm'>Out of Stock</p>
            )}
          </div>
        </div>

        {/* Stock Info */}
        {product.stock > 0 && (
          <div className='flex items-center justify-between text-xs text-gray-600 dark:text-gray-400'>
            <span>
              {product.stock <= 5 ? (
                <span className='text-orange-500 font-medium'>
                  Only {product.stock} left!
                </span>
              ) : (
                <span>In Stock</span>
              )}
            </span>
            <span>{product.stock} available</span>
          </div>
        )}

        {/* Quick Add to Cart */}
        {product.stock > 0 && (
          <button className='w-full bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg'>
            <ShoppingCart className='h-4 w-4' />
            Add to Cart
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
