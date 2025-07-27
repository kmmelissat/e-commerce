'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface CategorySearchProps {
  onSearch: (query: string) => void;
}

const CategorySearch = ({ onSearch }: CategorySearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className='relative mt-4'>
      <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
      <Input
        placeholder='Search categories...'
        value={searchQuery}
        onChange={handleSearchChange}
        className='pl-10 pr-4 h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:border-[#864AF9] focus:ring-[#864AF9]'
      />
    </div>
  );
};

export default CategorySearch;
