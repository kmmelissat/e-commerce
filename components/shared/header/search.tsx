import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllCategories } from '@/lib/actions/product.actions';
import { SearchIcon } from 'lucide-react';

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <form action='/search' method='GET'>
      <div className='flex w-full items-center space-x-2'>
        <Select name='category'>
          <SelectTrigger className='w-[140px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:border-[#864AF9] focus:ring-[#864AF9]'>
            <SelectValue placeholder='All Categories' />
          </SelectTrigger>
          <SelectContent className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'>
            <SelectItem
              key='All'
              value='all'
              className='hover:bg-gray-50 dark:hover:bg-gray-800'
            >
              All Categories
            </SelectItem>
            {categories.map((x) => (
              <SelectItem
                key={x.category}
                value={x.category}
                className='hover:bg-gray-50 dark:hover:bg-gray-800'
              >
                {x.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='relative flex-1'>
          <Input
            name='q'
            type='text'
            placeholder='Search products...'
            className='w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:border-[#864AF9] focus:ring-[#864AF9] pr-12'
          />
          <Button
            type='submit'
            size='icon'
            className='absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-gradient-to-r from-[#4C1D95] to-[#864AF9] hover:from-[#3B3486] hover:to-[#7C3AED] text-white shadow-lg hover:shadow-xl transition-all duration-200'
          >
            <SearchIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Search;
