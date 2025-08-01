'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';
import { Package, ShoppingCart, Users, Home } from 'lucide-react';

const links = [
  {
    title: 'Overview',
    href: '/admin/overview',
    icon: Home,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
];

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  return (
    <nav className={cn('space-y-2', className)} {...props}>
      {links.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.includes(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            )}
          >
            <Icon
              className={cn(
                'w-5 h-5 transition-colors',
                isActive
                  ? 'text-white'
                  : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
              )}
            />
            <span>{item.title}</span>
            {isActive && (
              <div className='ml-auto w-2 h-2 bg-white rounded-full'></div>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
