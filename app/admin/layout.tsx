import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/shared/header/menu';
import MainNav from './main-nav';
import AdminSearch from '@/components/admin/admin-search';
import { Shield, Settings, BarChart3 } from 'lucide-react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      {/* Top Navigation Bar */}
      <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50'>
        <div className='container mx-auto'>
          <div className='flex items-center h-16 px-4'>
            <Link href='/' className='flex items-center space-x-2'>
              <div className='relative'>
                <Image
                  src='/images/logo.svg'
                  height={40}
                  width={40}
                  alt={APP_NAME}
                  className='drop-shadow-sm'
                />
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white dark:border-gray-900'></div>
              </div>
              <span className='text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
                {APP_NAME}
              </span>
            </Link>

            <div className='ml-auto flex items-center space-x-4'>
              <AdminSearch />
              <div className='flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full'>
                <Shield className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                <span className='text-sm font-medium text-purple-700 dark:text-purple-300'>
                  Admin
                </span>
              </div>
              <Menu />
            </div>
          </div>
        </div>
      </div>

      <div className='flex'>
        {/* Sidebar */}
        <div className='w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 min-h-screen shadow-lg'>
          <div className='p-6'>
            <div className='space-y-6'>
              <div>
                <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Admin Panel
                </h2>
                <MainNav />
              </div>

              <div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
                    <BarChart3 className='w-4 h-4' />
                    <span>Analytics</span>
                  </div>
                  <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
                    <Settings className='w-4 h-4' />
                    <span>Settings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1'>
          <div className='p-8'>{children}</div>
        </div>
      </div>
    </div>
  );
}
