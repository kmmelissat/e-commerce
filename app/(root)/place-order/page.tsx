import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { ShippingAddress } from '@/types';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import CheckoutSteps from '@/components/shared/checkout-steps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import PlaceOrderForm from './place-order-form';
import {
  MapPin,
  CreditCard,
  Package,
  Edit,
  ShoppingBag,
  Shield,
  Truck,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Place Order',
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('User not found');

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect('/cart');
  if (!user.address) redirect('/shipping-address');
  if (!user.paymentMethod) redirect('/payment-method');

  const userAddress = user.address as ShippingAddress;

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
              Place Order
            </h1>
            <div className='w-12 h-12 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center shadow-lg'>
              <CheckCircle className='h-6 w-6 text-white' />
            </div>
          </div>
          <p className='text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto'>
            Review your order details and confirm your purchase
          </p>
        </div>

        {/* Checkout Steps */}
        <div className='mb-12'>
          <CheckoutSteps current={3} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Shipping Address */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <MapPin className='h-5 w-5' />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                  <p className='font-semibold text-gray-900 dark:text-white mb-1'>
                    {userAddress.fullName}
                  </p>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {userAddress.streetAddress}, {userAddress.city}{' '}
                    {userAddress.postalCode}, {userAddress.country}
                  </p>
                </div>
                <div className='flex justify-end'>
                  <Link href='/shipping-address'>
                    <Button
                      variant='outline'
                      className='flex items-center gap-2 hover:bg-[#864AF9] hover:text-white transition-all duration-200'
                    >
                      <Edit className='h-4 w-4' />
                      Edit Address
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <CreditCard className='h-5 w-5' />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                  <p className='font-semibold text-gray-900 dark:text-white'>
                    {user.paymentMethod}
                  </p>
                </div>
                <div className='flex justify-end'>
                  <Link href='/payment-method'>
                    <Button
                      variant='outline'
                      className='flex items-center gap-2 hover:bg-[#864AF9] hover:text-white transition-all duration-200'
                    >
                      <Edit className='h-4 w-4' />
                      Edit Payment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <Package className='h-5 w-5' />
                  Order Items ({cart.items.reduce((a, c) => a + c.qty, 0)})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
                  <Table>
                    <TableHeader>
                      <TableRow className='bg-gray-50 dark:bg-gray-800'>
                        <TableHead className='font-semibold text-gray-900 dark:text-white'>
                          Item
                        </TableHead>
                        <TableHead className='font-semibold text-gray-900 dark:text-white text-center'>
                          Quantity
                        </TableHead>
                        <TableHead className='font-semibold text-gray-900 dark:text-white text-right'>
                          Price
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.items.map((item) => (
                        <TableRow
                          key={item.slug}
                          className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200'
                        >
                          <TableCell>
                            <Link
                              href={`/product/${item.slug}`}
                              className='flex items-center gap-3 hover:opacity-80 transition-opacity duration-200'
                            >
                              <div className='relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700'>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className='object-cover'
                                />
                              </div>
                              <span className='font-medium text-gray-900 dark:text-white'>
                                {item.name}
                              </span>
                            </Link>
                          </TableCell>
                          <TableCell className='text-center'>
                            <span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium'>
                              {item.qty}
                            </span>
                          </TableCell>
                          <TableCell className='text-right font-semibold text-gray-900 dark:text-white'>
                            ${item.price}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Place Order */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Order Summary */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10 sticky top-4'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <ShoppingBag className='h-5 w-5' />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Items ({cart.items.reduce((a, c) => a + c.qty, 0)})
                    </span>
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      {formatCurrency(cart.itemsPrice)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Tax
                    </span>
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      {formatCurrency(cart.taxPrice)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Shipping
                    </span>
                    <span className='font-semibold text-green-600'>
                      {formatCurrency(cart.shippingPrice)}
                    </span>
                  </div>
                  <div className='border-t border-gray-200 dark:border-gray-700 pt-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-lg font-bold text-gray-900 dark:text-white'>
                        Total
                      </span>
                      <span className='text-2xl font-bold bg-gradient-to-r from-[#864AF9] to-[#4C1D95] bg-clip-text text-transparent'>
                        {formatCurrency(cart.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order Form */}
                <div className='pt-4'>
                  <PlaceOrderForm />
                </div>
              </CardContent>
            </Card>

            {/* Order Guarantees */}
            <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-lg bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <Shield className='h-5 w-5' />
                  Order Guarantees
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                      <Shield className='h-4 w-4 text-black' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>Secure Payment</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        SSL encrypted transactions
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center'>
                      <Truck className='h-4 w-4 text-white' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>Fast Delivery</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        Same day processing
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                      <CheckCircle className='h-4 w-4 text-black' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>Money Back</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        30-day return policy
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
