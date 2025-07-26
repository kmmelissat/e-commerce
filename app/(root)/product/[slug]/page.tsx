import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import ProductPrice from '@/components/shared/product/product-price';
import ProductImages from '@/components/shared/product/product-images';
import AddToCart from '@/components/shared/product/add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';
import ReviewList from './review-list';
import { auth } from '@/auth';
import Rating from '@/components/shared/product/rating';
import {
  Star,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  Share2,
  Package,
  CheckCircle,
  Clock,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user?.id;

  const cart = await getMyCart();

  const isNew =
    new Date(product.createdAt).getTime() >
    Date.now() - 7 * 24 * 60 * 60 * 1000;

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#F8E559]/5 via-white to-[#864AF9]/5 dark:from-[#F8E559]/5 dark:via-gray-900 dark:to-[#864AF9]/5'>
      <div className='container mx-auto px-4 py-8'>
        {/* Breadcrumb */}
        <div className='mb-8'>
          <nav className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
            <Link href='/' className='hover:text-[#864AF9] transition-colors'>
              Home
            </Link>
            <span>/</span>
            <Link
              href='/search'
              className='hover:text-[#864AF9] transition-colors'
            >
              Products
            </Link>
            <span>/</span>
            <span className='text-gray-900 dark:text-white font-medium'>
              {product.name}
            </span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16'>
          {/* Product Images */}
          <div className='lg:col-span-7'>
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10 overflow-hidden'>
              <CardContent className='p-6'>
                <ProductImages images={product.images} />
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className='lg:col-span-5'>
            <div className='space-y-6'>
              {/* Brand & Category */}
              <div className='flex items-center gap-3'>
                <Badge className='bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white'>
                  {product.brand}
                </Badge>
                <Badge
                  variant='outline'
                  className='border-[#F8E559] text-[#F8E559] dark:border-[#F8E559] dark:text-[#F8E559]'
                >
                  {product.category}
                </Badge>
                {isNew && (
                  <Badge className='bg-gradient-to-r from-[#F8E559] to-[#F8E559]/80 text-black'>
                    NEW
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge className='bg-gradient-to-r from-red-500 to-red-600 text-white'>
                    FEATURED
                  </Badge>
                )}
              </div>

              {/* Product Title */}
              <div>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4'>
                  {product.name}
                </h1>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <Rating value={Number(product.rating)} />
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      ({product.numReviews} reviews)
                    </span>
                  </div>
                  <div className='flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400'>
                    <Users className='h-4 w-4' />
                    <span>Verified Purchase</span>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className='bg-gradient-to-r from-[#F8E559]/10 to-[#864AF9]/10 dark:from-[#F8E559]/5 dark:to-[#864AF9]/5 rounded-2xl p-6 border border-[#F8E559]/20 dark:border-[#864AF9]/20'>
                <div className='flex items-center justify-between mb-4'>
                  <span className='text-lg font-semibold text-gray-700 dark:text-gray-300'>
                    Price
                  </span>
                  <ProductPrice
                    value={Number(product.price)}
                    className='text-3xl font-bold bg-gradient-to-r from-[#864AF9] to-[#4C1D95] bg-clip-text text-transparent'
                  />
                </div>

                {/* Stock Status */}
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    Availability
                  </span>
                  {product.stock > 0 ? (
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='h-4 w-4 text-green-500' />
                      <Badge className='bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'>
                        In Stock ({product.stock} available)
                      </Badge>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <Clock className='h-4 w-4 text-red-500' />
                      <Badge variant='destructive'>Out of Stock</Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Add to Cart Section */}
              {product.stock > 0 && (
                <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
                  <CardContent className='p-6'>
                    <div className='space-y-4'>
                      <AddToCart
                        cart={cart}
                        item={{
                          productId: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          qty: 1,
                          image: product.images![0],
                        }}
                      />

                      {/* Quick Actions */}
                      <div className='flex gap-3'>
                        <div className='flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50'>
                          <Heart className='h-4 w-4 text-gray-500' />
                          <span className='text-sm font-medium text-gray-500'>
                            Wishlist
                          </span>
                        </div>
                        <div className='flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50'>
                          <Share2 className='h-4 w-4 text-gray-500' />
                          <span className='text-sm font-medium text-gray-500'>
                            Share
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Features */}
              <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-lg bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                    <Package className='h-5 w-5' />
                    Product Features
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                        <Truck className='h-4 w-4 text-black' />
                      </div>
                      <div>
                        <p className='font-medium text-sm'>Free Shipping</p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          On orders over $100
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center'>
                        <Shield className='h-4 w-4 text-white' />
                      </div>
                      <div>
                        <p className='font-medium text-sm'>Secure Payment</p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          100% secure checkout
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                        <RefreshCw className='h-4 w-4 text-black' />
                      </div>
                      <div>
                        <p className='font-medium text-sm'>Easy Returns</p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          30-day return policy
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center'>
                        <Star className='h-4 w-4 text-white' />
                      </div>
                      <div>
                        <p className='font-medium text-sm'>Premium Quality</p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          Handpicked products
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10 mb-16'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
              Product Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='prose prose-gray dark:prose-invert max-w-none'>
              <p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg'>
                {product.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
              Customer Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewList
              userId={userId || ''}
              productId={product.id}
              productSlug={product.slug}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
