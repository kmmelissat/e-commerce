import { Button } from '@/components/ui/button';
import ModeToggle from './mode-toggle';
import Link from 'next/link';
import { ShoppingCart, Menu as MenuIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserButton from './user-button';
import { APP_NAME } from '@/lib/constants';

const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-2'>
        <ModeToggle />
        <Button
          asChild
          variant='ghost'
          className='relative group hover:bg-[#4C1D95] hover:text-white transition-all duration-200'
        >
          <Link href='/cart' className='flex items-center gap-2'>
            <ShoppingCart className='h-5 w-5' />
            <span className='hidden lg:block'>Cart</span>
            <div className='absolute -top-1 -right-1 bg-[#F8E559] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold'>
              0
            </div>
          </Link>
        </Button>
        <UserButton />
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-[#4C1D95] hover:text-white'
            >
              <MenuIcon className='h-5 w-5' />
            </Button>
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800'>
            <SheetTitle className='text-[#4C1D95] dark:text-[#864AF9] font-bold text-xl mb-6'>
              Menu
            </SheetTitle>
            <div className='flex flex-col gap-4 w-full'>
              <div className='flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-900'>
                <span className='text-sm font-medium'>Theme</span>
                <ModeToggle />
              </div>
              <Button
                asChild
                variant='ghost'
                className='w-full justify-start hover:bg-[#4C1D95] hover:text-white transition-all duration-200'
              >
                <Link href='/cart' className='flex items-center gap-3'>
                  <ShoppingCart className='h-5 w-5' />
                  <span>Cart</span>
                  <div className='ml-auto bg-[#F8E559] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold'>
                    0
                  </div>
                </Link>
              </Button>
              <div className='w-full'>
                <UserButton />
              </div>
            </div>
            <SheetDescription className='mt-auto text-xs text-gray-500 dark:text-gray-400'>
              © 2024 {APP_NAME}. All rights reserved.
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
