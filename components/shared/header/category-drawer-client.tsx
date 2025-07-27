'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  MenuIcon,
  Shirt,
  Watch,
  Smartphone,
  Headphones,
  Camera,
  Laptop,
  Gamepad2,
  BookOpen,
  Heart,
  Star,
  Zap,
  Tag,
  SearchIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import CategorySearch from './category-search';

// Category icon mapping
const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();

  if (categoryLower.includes('shirt') || categoryLower.includes('dress'))
    return Shirt;
  if (categoryLower.includes('watch') || categoryLower.includes('clock'))
    return Watch;
  if (categoryLower.includes('phone') || categoryLower.includes('mobile'))
    return Smartphone;
  if (categoryLower.includes('headphone') || categoryLower.includes('audio'))
    return Headphones;
  if (categoryLower.includes('camera') || categoryLower.includes('photo'))
    return Camera;
  if (categoryLower.includes('laptop') || categoryLower.includes('computer'))
    return Laptop;
  if (categoryLower.includes('game') || categoryLower.includes('console'))
    return Gamepad2;
  if (categoryLower.includes('book') || categoryLower.includes('reading'))
    return BookOpen;
  if (categoryLower.includes('favorite') || categoryLower.includes('trending'))
    return Heart;
  if (categoryLower.includes('premium') || categoryLower.includes('featured'))
    return Star;
  if (categoryLower.includes('sale') || categoryLower.includes('deal'))
    return Zap;

  return Tag; // Default icon
};

interface Category {
  category: string;
  _count: number;
}

interface CategoryDrawerClientProps {
  categories: Category[];
}

const CategoryDrawerClient = ({ categories }: CategoryDrawerClientProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;

    return categories.filter((category) =>
      category.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          className='border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
        >
          <MenuIcon className='h-4 w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='w-full sm:max-w-sm p-0 bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700'
      >
        <SheetHeader className='border-b border-gray-200 dark:border-gray-700 pb-6 p-6'>
          <div className='flex items-center justify-center'>
            <SheetTitle className='text-xl font-bold bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
              Categories
            </SheetTitle>
          </div>

          {/* Search Bar */}
          <CategorySearch onSearch={setSearchQuery} />
        </SheetHeader>

        <div className='flex-1 overflow-y-auto p-6'>
          <div className='space-y-6'>
            {/* All Categories Option */}
            <SheetClose asChild>
              <Link href='/search'>
                <div className='group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#F8E559]/20 to-[#F8E559]/10 dark:from-[#864AF9]/20 dark:to-[#864AF9]/10 border border-[#F8E559]/30 dark:border-[#864AF9]/30 hover:from-[#F8E559]/30 hover:to-[#F8E559]/20 dark:hover:from-[#864AF9]/30 dark:hover:to-[#864AF9]/20 transition-all duration-200 cursor-pointer'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 dark:from-[#864AF9] dark:to-[#864AF9]/80 flex items-center justify-center'>
                      <Tag className='h-5 w-5 text-black dark:text-white' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-[#4C1D95] dark:group-hover:text-[#864AF9] transition-colors'>
                        All Categories
                      </h3>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Browse all products
                      </p>
                    </div>
                  </div>
                  <Badge className='bg-gradient-to-r from-[#F8E559] to-[#F8E559]/80 dark:from-[#864AF9] dark:to-[#864AF9]/80 text-black dark:text-white font-medium'>
                    All
                  </Badge>
                </div>
              </Link>
            </SheetClose>

            {/* Category List */}
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => {
                const IconComponent = getCategoryIcon(category.category);
                return (
                  <SheetClose asChild key={category.category}>
                    <Link href={`/search?category=${category.category}`}>
                      <div className='group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-[#F8E559]/10 hover:to-[#864AF9]/10 dark:hover:from-[#864AF9]/10 dark:hover:to-[#F8E559]/10 hover:border-[#864AF9]/30 dark:hover:border-[#864AF9]/30 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 group-hover:from-[#F8E559]/20 group-hover:to-[#864AF9]/20 dark:group-hover:from-[#864AF9]/20 dark:group-hover:to-[#F8E559]/20 flex items-center justify-center transition-all duration-200'>
                            <IconComponent className='h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-[#4C1D95] dark:group-hover:text-[#864AF9] transition-colors' />
                          </div>
                          <div>
                            <h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-[#4C1D95] dark:group-hover:text-[#864AF9] transition-colors'>
                              {category.category}
                            </h3>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                              {category._count} product
                              {category._count !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        <Badge className='bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 group-hover:bg-[#864AF9] group-hover:text-white transition-all duration-200 font-medium'>
                          {category._count}
                        </Badge>
                      </div>
                    </Link>
                  </SheetClose>
                );
              })
            ) : (
              <div className='text-center py-8'>
                <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
                  <SearchIcon className='h-8 w-8 text-gray-400' />
                </div>
                <p className='text-gray-500 dark:text-gray-400 font-medium'>
                  No categories found
                </p>
                <p className='text-sm text-gray-400 dark:text-gray-500 mt-1'>
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='border-t border-gray-200 dark:border-gray-700 p-6'>
          <div className='text-center'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Discover amazing products in our curated categories
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryDrawerClient;
