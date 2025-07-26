'use client';

import Link from 'next/link';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Package, Settings } from 'lucide-react';
import { useState } from 'react';

const UserDropdown = ({
  user,
  firstInitial,
}: {
  user: { name?: string | null; email?: string | null; role?: string };
  firstInitial: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center'>
          <Button
            variant='ghost'
            className='relative w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#4C1D95] to-[#864AF9] text-white hover:from-[#3B3486] hover:to-[#7C3AED] transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-lg'
          >
            {firstInitial}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl'
        align='end'
        forceMount
      >
        <DropdownMenuLabel className='font-normal p-4'>
          <div className='flex flex-col space-y-2'>
            <div className='text-sm font-semibold leading-none text-[#4C1D95] dark:text-[#864AF9]'>
              {user?.name}
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-400 leading-none'>
              {user?.email}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-gray-200 dark:bg-gray-700' />

        <DropdownMenuItem className='p-0'>
          <Link
            href='/user/profile'
            className='w-full p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
          >
            <User className='h-4 w-4 text-[#4C1D95] dark:text-[#864AF9]' />
            <span>User Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='p-0'>
          <Link
            href='/user/orders'
            className='w-full p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
          >
            <Package className='h-4 w-4 text-[#4C1D95] dark:text-[#864AF9]' />
            <span>Order History</span>
          </Link>
        </DropdownMenuItem>

        {user?.role === 'admin' && (
          <>
            <DropdownMenuSeparator className='bg-gray-200 dark:bg-gray-700' />
            <DropdownMenuItem className='p-0'>
              <Link
                href='/admin/overview'
                className='w-full p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
              >
                <Settings className='h-4 w-4 text-[#F8E559]' />
                <span className='text-[#F8E559] font-medium'>Admin Panel</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className='bg-gray-200 dark:bg-gray-700' />
        <DropdownMenuItem className='p-0'>
          <form action={signOutUser} className='w-full'>
            <Button
              className='w-full p-3 h-auto justify-start bg-transparent hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 transition-colors'
              variant='ghost'
            >
              <LogOut className='h-4 w-4 mr-3' />
              Sign Out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
