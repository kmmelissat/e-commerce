import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOrderSummary } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatNumber } from '@/lib/utils';
import {
  BadgeDollarSign,
  CreditCard,
  TrendingUp,
  Package,
  ShoppingBag,
  UserCheck,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import Charts from './charts';
import { requireAdmin } from '@/lib/auth-guard';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

const AdminOverviewPage = async () => {
  await requireAdmin();

  const summary = await getOrderSummary();

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Dashboard Overview
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            Welcome back! Here&apos;s what&apos;s happening with your store
            today.
          </p>
        </div>
        <div className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full'>
          <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
          <span className='text-sm font-medium text-green-700 dark:text-green-300'>
            Live
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-blue-700 dark:text-blue-300'>
              Total Revenue
            </CardTitle>
            <div className='p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg'>
              <BadgeDollarSign className='h-4 w-4 text-blue-600 dark:text-blue-400' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-900 dark:text-blue-100'>
              {formatCurrency(
                summary.totalSales._sum.totalPrice?.toString() || 0
              )}
            </div>
            <p className='text-xs text-blue-600 dark:text-blue-400 mt-1'>
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-green-700 dark:text-green-300'>
              Total Orders
            </CardTitle>
            <div className='p-2 bg-green-100 dark:bg-green-900/50 rounded-lg'>
              <ShoppingBag className='h-4 w-4 text-green-600 dark:text-green-400' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-900 dark:text-green-100'>
              {formatNumber(summary.ordersCount)}
            </div>
            <p className='text-xs text-green-600 dark:text-green-400 mt-1'>
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-purple-700 dark:text-purple-300'>
              Active Customers
            </CardTitle>
            <div className='p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg'>
              <UserCheck className='h-4 w-4 text-purple-600 dark:text-purple-400' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-purple-900 dark:text-purple-100'>
              {formatNumber(summary.usersCount)}
            </div>
            <p className='text-xs text-purple-600 dark:text-purple-400 mt-1'>
              +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800 shadow-lg hover:shadow-xl transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-orange-700 dark:text-orange-300'>
              Total Products
            </CardTitle>
            <div className='p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg'>
              <Package className='h-4 w-4 text-orange-600 dark:text-orange-400' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-900 dark:text-orange-100'>
              {formatNumber(summary.productsCount)}
            </div>
            <p className='text-xs text-orange-600 dark:text-orange-400 mt-1'>
              +3.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Sales */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl'>
          <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
            <CardTitle className='flex items-center space-x-2'>
              <TrendingUp className='h-5 w-5 text-blue-600 dark:text-blue-400' />
              <span>Sales Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <Charts
              data={{
                salesData: summary.salesData,
              }}
            />
          </CardContent>
        </Card>

        <Card className='col-span-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl'>
          <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
            <CardTitle className='flex items-center space-x-2'>
              <CreditCard className='h-5 w-5 text-green-600 dark:text-green-400' />
              <span>Recent Sales</span>
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='space-y-4'>
              {summary.latestSales.map((order) => (
                <div
                  key={order.id}
                  className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                      <span className='text-white text-xs font-medium'>
                        {order?.user?.name
                          ? order.user.name.charAt(0).toUpperCase()
                          : 'U'}
                      </span>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900 dark:text-white'>
                        {order?.user?.name ? order.user.name : 'Deleted User'}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        {formatDateTime(order.createdAt).dateOnly}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-semibold text-gray-900 dark:text-white'>
                      {formatCurrency(order.totalPrice)}
                    </p>
                    <Link
                      href={`/order/${order.id}`}
                      className='text-xs text-blue-600 dark:text-blue-400 hover:underline'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
