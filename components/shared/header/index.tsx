import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';
import CategoryDrawer from './category-drawer';
import Search from './search';

const Header = () => {
  return (
    <header className='w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95'>
      <div className='wrapper flex-between py-4'>
        <div className='flex-start'>
          <CategoryDrawer />
          <Link href='/' className='flex-start ml-4 group'>
            <div className='relative'>
              <Image
                src='/images/logo.svg'
                alt={`${APP_NAME} logo`}
                height={48}
                width={48}
                priority={true}
                className='transition-transform group-hover:scale-105'
              />
            </div>
            <span className='hidden lg:block font-bold text-2xl ml-3 bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className='hidden md:block flex-1 max-w-2xl mx-8'>
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
