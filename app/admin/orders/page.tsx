import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog';
import { requireAdmin } from '@/lib/auth-guard';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Orders',
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  const { page = '1', query: searchText } = await props.searchParams;

  await requireAdmin();

  const orders = await getAllOrders({
    page: Number(page),
    query: searchText,
  });

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3'>
            <ShoppingCart className='h-8 w-8 text-green-600 dark:text-green-400' />
            <span>Orders Management</span>
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            Track and manage customer orders, payments, and deliveries
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      {searchText && (
        <Card className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Search className='h-4 w-4 text-green-600 dark:text-green-400' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>
                  Filtered by:{' '}
                  <span className='font-semibold text-green-700 dark:text-green-300'>
                    &quot;{searchText}&quot;
                  </span>
                </span>
              </div>
              <Link href='/admin/orders'>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-green-300 text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20'
                >
                  Clear Filter
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders Table */}
      <Card className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl'>
        <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
          <CardTitle className='flex items-center space-x-2'>
            <Filter className='h-5 w-5 text-gray-600 dark:text-gray-400' />
            <span>Order History</span>
            <span className='text-sm text-gray-500 dark:text-gray-400 font-normal'>
              ({orders.data.length} orders)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Order ID
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Customer
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Date
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300 text-right'>
                    Total
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Payment
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Delivery
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300 text-center'>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.data.map((order) => (
                  <TableRow
                    key={order.id}
                    className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors'
                  >
                    <TableCell className='font-mono text-sm text-gray-600 dark:text-gray-400'>
                      {formatId(order.id)}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center'>
                          <User className='h-4 w-4 text-green-600 dark:text-green-400' />
                        </div>
                        <div>
                          <p className='font-medium text-gray-900 dark:text-white'>
                            {order.user.name}
                          </p>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {order.user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4 text-gray-400' />
                        <span className='text-sm text-gray-700 dark:text-gray-300'>
                          {formatDateTime(order.createdAt).dateOnly}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex items-center justify-end space-x-2'>
                        <DollarSign className='h-4 w-4 text-green-500' />
                        <span className='font-semibold text-green-600 dark:text-green-400'>
                          {formatCurrency(order.totalPrice)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.isPaid && order.paidAt ? (
                        <div className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span className='text-sm text-green-700 dark:text-green-300 font-medium'>
                            Paid
                          </span>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <Clock className='h-4 w-4 text-yellow-500' />
                          <span className='text-sm text-yellow-700 dark:text-yellow-300 font-medium'>
                            Pending
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered && order.deliveredAt ? (
                        <div className='flex items-center space-x-2'>
                          <CheckCircle className='h-4 w-4 text-green-500' />
                          <span className='text-sm text-green-700 dark:text-green-300 font-medium'>
                            Delivered
                          </span>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <XCircle className='h-4 w-4 text-red-500' />
                          <span className='text-sm text-red-700 dark:text-red-300 font-medium'>
                            Not Delivered
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center justify-center space-x-2'>
                        <Button
                          asChild
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                        >
                          <Link href={`/order/${order.id}`}>
                            <Eye className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                          </Link>
                        </Button>
                        <DeleteDialog id={order.id} action={deleteOrder} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {orders.totalPages > 1 && (
        <div className='flex justify-center'>
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
