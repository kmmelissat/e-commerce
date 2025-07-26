import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ShippingAddress } from '@/types';
import ShippingAddressForm from './shipping-address-form';
import CheckoutSteps from '@/components/shared/checkout-steps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Truck, Shield, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Address',
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect('/cart');

  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error('No user ID');

  const user = await getUserById(userId);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#F8E559]/5 via-white to-[#864AF9]/5 dark:from-[#F8E559]/5 dark:via-gray-900 dark:to-[#864AF9]/5'>
      <div className='container mx-auto px-4 py-8'>
        {/* Page Header */}
        <div className='mb-8 text-center'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center shadow-lg'>
              <MapPin className='h-6 w-6 text-black' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
              Shipping Address
            </h1>
            <div className='w-12 h-12 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center shadow-lg'>
              <Truck className='h-6 w-6 text-white' />
            </div>
          </div>
          <p className='text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto'>
            Enter your shipping address to ensure your order is delivered to the
            right location
          </p>
        </div>

        {/* Checkout Steps */}
        <div className='mb-12'>
          <CheckoutSteps current={1} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Shipping Address Form */}
          <div className='lg:col-span-2'>
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-2xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <MapPin className='h-6 w-6' />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ShippingAddressForm
                  address={user.address as ShippingAddress}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Features */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Order Summary */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10 sticky top-4'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <Package className='h-5 w-5' />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Items ({cart.items.reduce((a, c) => a + c.qty, 0)})
                    </span>
                    <span className='font-semibold'>
                      ${Number(cart.itemsPrice)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Shipping
                    </span>
                    <span className='font-semibold text-green-600'>
                      {Number(cart.itemsPrice) > 100 ? 'Free' : '$10.00'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Tax
                    </span>
                    <span className='font-semibold'>
                      ${(Number(cart.itemsPrice) * 0.08).toFixed(2)}
                    </span>
                  </div>
                  <div className='border-t border-gray-200 dark:border-gray-700 pt-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-lg font-bold text-gray-900 dark:text-white'>
                        Total
                      </span>
                      <span className='text-2xl font-bold bg-gradient-to-r from-[#864AF9] to-[#4C1D95] bg-clip-text text-transparent'>
                        $
                        {(
                          Number(cart.itemsPrice) +
                          (Number(cart.itemsPrice) > 100 ? 0 : 10) +
                          Number(cart.itemsPrice) * 0.08
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Features */}
            <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-lg bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <Shield className='h-5 w-5' />
                  Shipping Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                      <Truck className='h-4 w-4 text-black' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>Free Shipping</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        On orders over $100
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center'>
                      <Shield className='h-4 w-4 text-white' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>Secure Delivery</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        Track your package
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                      <Package className='h-4 w-4 text-black' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>Fast Processing</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        Same day shipping
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

export default ShippingAddressPage;
