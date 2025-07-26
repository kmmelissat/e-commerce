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
import CartBadge from './cart-badge';

const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-2'>
        <ModeToggle />
        <Button
          asChild
          variant='ghost'
          className='relative group hover:bg-gradient-to-r hover:from-[#4C1D95] hover:to-[#864AF9] hover:text-white transition-all duration-200 rounded-xl'
        >
          <Link href='/cart' className='flex items-center gap-2 px-4 py-2'>
            <ShoppingCart className='h-5 w-5' />
            <span className='hidden lg:block font-medium'>Cart</span>
            <CartBadge />
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
              className='hover:bg-gradient-to-r hover:from-[#4C1D95] hover:to-[#864AF9] hover:text-white rounded-xl'
            >
              <MenuIcon className='h-5 w-5' />
            </Button>
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-950 dark:to-[#864AF9]/5 border-l border-gray-200 dark:border-gray-800'>
            <SheetTitle className='text-2xl font-bold bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent mb-6'>
              Menu
            </SheetTitle>
            <div className='flex flex-col gap-4 w-full'>
              <div className='flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-[#F8E559]/10 to-[#864AF9]/10 dark:from-[#F8E559]/5 dark:to-[#864AF9]/5 border border-[#F8E559]/20 dark:border-[#864AF9]/20'>
                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Theme
                </span>
                <ModeToggle />
              </div>
              <Button
                asChild
                variant='ghost'
                className='w-full justify-start hover:bg-gradient-to-r hover:from-[#4C1D95] hover:to-[#864AF9] hover:text-white transition-all duration-200 rounded-xl p-4'
              >
                <Link href='/cart' className='flex items-center gap-3 w-full'>
                  <div className='relative'>
                    <ShoppingCart className='h-5 w-5' />
                    <CartBadge />
                  </div>
                  <span className='font-medium'>Shopping Cart</span>
                </Link>
              </Button>
              <div className='w-full'>
                <UserButton />
              </div>
            </div>
            <SheetDescription className='mt-auto text-xs text-gray-500 dark:text-gray-400 text-center'>
              © 2024 {APP_NAME}. All rights reserved.
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
