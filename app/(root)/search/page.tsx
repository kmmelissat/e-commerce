import ProductCard from '@/components/shared/product/product-card';
import { Button } from '@/components/ui/button';
import {
  getAllProducts,
  getAllCategories,
} from '@/lib/actions/product.actions';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Filter,
  Search,
  X,
  Star,
  DollarSign,
  Tag,
  SortAsc,
  SortDesc,
  Clock,
  Star as StarIcon,
} from 'lucide-react';
import { Product } from '@/types';

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
    icon: DollarSign,
  },
  {
    name: '$51 to $100',
    value: '51-100',
    icon: DollarSign,
  },
  {
    name: '$101 to $200',
    value: '101-200',
    icon: DollarSign,
  },
  {
    name: '$201 to $500',
    value: '201-500',
    icon: DollarSign,
  },
  {
    name: '$501 to $1000',
    value: '501-1000',
    icon: DollarSign,
  },
];

const ratings = [4, 3, 2, 1];

const sortOrders = [
  { value: 'newest', label: 'Newest', icon: Clock },
  { value: 'lowest', label: 'Price: Low to High', icon: SortAsc },
  { value: 'highest', label: 'Price: High to Low', icon: SortDesc },
  { value: 'rating', label: 'Highest Rated', icon: StarIcon },
];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
  } = await props.searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet =
    category && category !== 'all' && category.trim() !== '';
  const isPriceSet = price && price !== 'all' && price.trim() !== '';
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `
      Search ${isQuerySet ? q : ''} 
      ${isCategorySet ? `: Category ${category}` : ''}
      ${isPriceSet ? `: Price ${price}` : ''}
      ${isRatingSet ? `: Rating ${rating}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams;

  // Construct filter url
  const getFilterUrl = ({
    c,
    p,
    s,
    r,
    pg,
  }: {
    c?: string;
    p?: string;
    s?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  const hasActiveFilters =
    (q !== 'all' && q !== '') ||
    (category !== 'all' && category !== '') ||
    rating !== 'all' ||
    price !== 'all';

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#F8E559]/10 via-white to-[#864AF9]/10 dark:from-[#F8E559]/5 dark:via-gray-900 dark:to-[#864AF9]/5'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid lg:grid-cols-5 gap-8'>
          {/* Filters Sidebar */}
          <div className='lg:col-span-1'>
            <Card className='sticky top-4 border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader className='pb-4 border-b border-[#F8E559]/20 dark:border-[#864AF9]/20'>
                <CardTitle className='flex items-center gap-2 text-lg bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <Filter className='h-5 w-5 text-[#864AF9]' />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-6 pt-6'>
                {/* Category Filters */}
                <div>
                  <h3 className='flex items-center gap-2 font-semibold text-gray-800 dark:text-white mb-3'>
                    <div className='w-6 h-6 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                      <Tag className='h-3 w-3 text-black' />
                    </div>
                    Category
                  </h3>
                  <div className='space-y-2'>
                    <Link
                      className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                        category === 'all' || category === ''
                          ? 'bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white shadow-lg'
                          : 'hover:bg-[#F8E559]/20 dark:hover:bg-[#864AF9]/20 text-gray-700 dark:text-gray-300 border border-transparent hover:border-[#F8E559]/30'
                      }`}
                      href={getFilterUrl({ c: 'all' })}
                    >
                      All Categories
                    </Link>
                    {categories.map((x) => (
                      <Link
                        key={x.category}
                        className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                          category === x.category
                            ? 'bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white shadow-lg'
                            : 'hover:bg-[#F8E559]/20 dark:hover:bg-[#864AF9]/20 text-gray-700 dark:text-gray-300 border border-transparent hover:border-[#F8E559]/30'
                        }`}
                        href={getFilterUrl({ c: x.category })}
                      >
                        {x.category}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Price Filters */}
                <div>
                  <h3 className='flex items-center gap-2 font-semibold text-gray-800 dark:text-white mb-3'>
                    <div className='w-6 h-6 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center'>
                      <DollarSign className='h-3 w-3 text-white' />
                    </div>
                    Price Range
                  </h3>
                  <div className='space-y-2'>
                    <Link
                      className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                        price === 'all'
                          ? 'bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white shadow-lg'
                          : 'hover:bg-[#F8E559]/20 dark:hover:bg-[#864AF9]/20 text-gray-700 dark:text-gray-300 border border-transparent hover:border-[#F8E559]/30'
                      }`}
                      href={getFilterUrl({ p: 'all' })}
                    >
                      Any Price
                    </Link>
                    {prices.map((p) => (
                      <Link
                        key={p.value}
                        className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                          price === p.value
                            ? 'bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white shadow-lg'
                            : 'hover:bg-[#F8E559]/20 dark:hover:bg-[#864AF9]/20 text-gray-700 dark:text-gray-300 border border-transparent hover:border-[#F8E559]/30'
                        }`}
                        href={getFilterUrl({ p: p.value })}
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Rating Filters */}
                <div>
                  <h3 className='flex items-center gap-2 font-semibold text-gray-800 dark:text-white mb-3'>
                    <div className='w-6 h-6 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                      <Star className='h-3 w-3 text-black' />
                    </div>
                    Customer Rating
                  </h3>
                  <div className='space-y-2'>
                    <Link
                      className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                        rating === 'all'
                          ? 'bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white shadow-lg'
                          : 'hover:bg-[#F8E559]/20 dark:hover:bg-[#864AF9]/20 text-gray-700 dark:text-gray-300 border border-transparent hover:border-[#F8E559]/30'
                      }`}
                      href={getFilterUrl({ r: 'all' })}
                    >
                      Any Rating
                    </Link>
                    {ratings.map((r) => (
                      <Link
                        key={r}
                        className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                          rating === r.toString()
                            ? 'bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white shadow-lg'
                            : 'hover:bg-[#F8E559]/20 dark:hover:bg-[#864AF9]/20 text-gray-700 dark:text-gray-300 border border-transparent hover:border-[#F8E559]/30'
                        }`}
                        href={getFilterUrl({ r: `${r}` })}
                      >
                        <div className='flex items-center gap-2'>
                          <div className='flex'>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < r
                                    ? 'text-[#F8E559] fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span>& up</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className='lg:col-span-4'>
            {/* Results Header */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10 mb-6'>
              <CardContent className='p-6'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                  {/* Active Filters */}
                  <div className='flex flex-wrap items-center gap-2'>
                    {hasActiveFilters && (
                      <>
                        <span className='text-sm text-gray-600 dark:text-gray-400'>
                          Active filters:
                        </span>
                        {q !== 'all' && q !== '' && (
                          <Badge className='bg-gradient-to-r from-[#F8E559] to-[#F8E559]/80 text-black shadow-lg'>
                            Search: {q}
                          </Badge>
                        )}
                        {category !== 'all' && category !== '' && (
                          <Badge className='bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white shadow-lg'>
                            {category}
                          </Badge>
                        )}
                        {price !== 'all' && (
                          <Badge className='bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'>
                            Price: {price}
                          </Badge>
                        )}
                        {rating !== 'all' && (
                          <Badge className='bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'>
                            {rating}+ stars
                          </Badge>
                        )}
                        <Button
                          variant='outline'
                          size='sm'
                          asChild
                          className='border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-lg'
                        >
                          <Link
                            href='/search'
                            className='flex items-center gap-1'
                          >
                            <X className='h-3 w-3' />
                            Clear All
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Sort Options */}
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      Sort by:
                    </span>
                    <div className='flex flex-wrap gap-1'>
                      {sortOrders.map((s) => (
                        <Link
                          key={s.value}
                          className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 shadow-lg ${
                            sort === s.value
                              ? 'bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white'
                              : 'bg-gradient-to-r from-[#F8E559]/20 to-[#F8E559]/10 dark:from-[#864AF9]/20 dark:to-[#864AF9]/10 text-gray-700 dark:text-gray-300 hover:from-[#F8E559]/30 hover:to-[#F8E559]/20 dark:hover:from-[#864AF9]/30 dark:hover:to-[#864AF9]/20 border border-[#F8E559]/30 dark:border-[#864AF9]/30'
                          }`}
                          href={getFilterUrl({ s: s.value })}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Count */}
                <div className='mt-4 pt-4 border-t border-[#F8E559]/20 dark:border-[#864AF9]/20'>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Showing{' '}
                    <span className='font-semibold text-[#864AF9]'>
                      {products.data.length}
                    </span>{' '}
                    of{' '}
                    <span className='font-semibold text-[#864AF9]'>
                      {products.data.length}
                    </span>{' '}
                    products
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            {products.data.length === 0 ? (
              <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
                <CardContent className='text-center py-16'>
                  <div className='w-20 h-20 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
                    <Search className='h-10 w-10 text-black' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-2'>
                    No products found
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 mb-6'>
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    asChild
                    className='bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white shadow-lg'
                  >
                    <Link href='/search'>Clear All Filters</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {products.data.map((product) => {
                  const serializedProduct = {
                    ...product,
                    createdAt: product.createdAt.toISOString(),
                  } as Product & { createdAt: string };
                  return (
                    <ProductCard key={product.id} product={serializedProduct} />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
