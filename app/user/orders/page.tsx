import { Metadata } from 'next';
import { getMyOrders } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/pagination';
import {
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Eye,
  Calendar,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Orders',
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  const orders = await getMyOrders({
    page: Number(page) || 1,
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#F8E559]/5 via-white to-[#864AF9]/5 dark:from-[#F8E559]/5 dark:via-gray-900 dark:to-[#864AF9]/5'>
      <div className='container mx-auto px-4 py-8'>
        {/* Page Header */}
        <div className='mb-8 text-center'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center shadow-lg'>
              <ShoppingBag className='h-6 w-6 text-black' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
              My Orders
            </h1>
            <div className='w-12 h-12 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center shadow-lg'>
              <Package className='h-6 w-6 text-white' />
            </div>
          </div>
          <p className='text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto'>
            Track your orders and view their current status
          </p>
        </div>

        {/* Orders Summary */}
        <div className='mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-lg flex items-center justify-center'>
                    <Package className='h-5 w-5 text-black' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Total Orders
                    </p>
                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                      {orders.data.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-lg flex items-center justify-center'>
                    <CheckCircle className='h-5 w-5 text-white' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Paid Orders
                    </p>
                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                      {orders.data.filter((order) => order.isPaid).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardContent className='p-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center'>
                    <Truck className='h-5 w-5 text-white' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Delivered
                    </p>
                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                      {orders.data.filter((order) => order.isDelivered).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Orders Table */}
        <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
              <Package className='h-5 w-5' />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-gray-50 dark:bg-gray-800'>
                    <TableHead className='font-semibold text-gray-900 dark:text-white'>
                      Order ID
                    </TableHead>
                    <TableHead className='font-semibold text-gray-900 dark:text-white'>
                      Date
                    </TableHead>
                    <TableHead className='font-semibold text-gray-900 dark:text-white text-right'>
                      Total
                    </TableHead>
                    <TableHead className='font-semibold text-gray-900 dark:text-white text-center'>
                      Payment
                    </TableHead>
                    <TableHead className='font-semibold text-gray-900 dark:text-white text-center'>
                      Delivery
                    </TableHead>
                    <TableHead className='font-semibold text-gray-900 dark:text-white text-center'>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.data.map((order) => (
                    <TableRow
                      key={order.id}
                      className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200'
                    >
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-lg flex items-center justify-center'>
                            <Package className='h-4 w-4 text-black' />
                          </div>
                          <span className='font-mono text-sm font-medium text-gray-900 dark:text-white'>
                            {formatId(order.id)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4 text-gray-500' />
                          <span className='text-sm text-gray-700 dark:text-gray-300'>
                            {formatDateTime(order.createdAt).dateTime}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex items-center justify-end gap-2'>
                          <DollarSign className='h-4 w-4 text-green-600' />
                          <span className='font-semibold text-gray-900 dark:text-white'>
                            {formatCurrency(order.totalPrice)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        {order.isPaid && order.paidAt ? (
                          <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800'>
                            <CheckCircle className='h-3 w-3 mr-1' />
                            Paid
                          </Badge>
                        ) : (
                          <Badge
                            variant='destructive'
                            className='flex items-center gap-1 mx-auto w-fit'
                          >
                            <Clock className='h-3 w-3' />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className='text-center'>
                        {order.isDelivered && order.deliveredAt ? (
                          <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800'>
                            <Truck className='h-3 w-3 mr-1' />
                            Delivered
                          </Badge>
                        ) : (
                          <Badge
                            variant='destructive'
                            className='flex items-center gap-1 mx-auto w-fit'
                          >
                            <Clock className='h-3 w-3' />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className='text-center'>
                        <Link href={`/order/${order.id}`}>
                          <Button
                            variant='outline'
                            size='sm'
                            className='flex items-center gap-2 hover:bg-[#864AF9] hover:text-white transition-all duration-200'
                          >
                            <Eye className='h-4 w-4' />
                            Details
                            <ArrowRight className='h-3 w-3' />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Empty State */}
            {orders.data.length === 0 && (
              <div className='text-center py-12'>
                <div className='w-16 h-16 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Package className='h-8 w-8 text-black' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  No orders yet
                </h3>
                <p className='text-gray-600 dark:text-gray-400 mb-6'>
                  Start shopping to see your orders here
                </p>
                <Link href='/'>
                  <Button className='bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white'>
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {orders.totalPages > 1 && (
          <div className='mt-8 flex justify-center'>
            <Pagination
              page={Number(page) || 1}
              totalPages={orders?.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
