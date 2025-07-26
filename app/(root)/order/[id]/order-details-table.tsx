'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { Order } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import {
  createPayPalOrder,
  approvePayPalOrder,
  updateOrderToPaidCOD,
  deliverOrder,
} from '@/lib/actions/order.actions';
import StripePayment from './stripe-payment';
import {
  CreditCard,
  MapPin,
  Package,
  CheckCircle,
  Clock,
  Truck,
  DollarSign,
  Calendar,
  User,
  ShoppingBag,
} from 'lucide-react';

const OrderDetailsTable = ({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret,
}: {
  order: Omit<Order, 'paymentResult'>;
  paypalClientId: string;
  isAdmin: boolean;
  stripeClientSecret: string | null;
}) => {
  const {
    id,
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    createdAt,
  } = order;

  const { toast } = useToast();

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = '';

    if (isPending) {
      status = 'Loading PayPal...';
    } else if (isRejected) {
      status = 'Error Loading PayPal';
    }
    return status;
  };

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order.id);

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
    }

    return res.data;
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(order.id, data);

    toast({
      variant: res.success ? 'default' : 'destructive',
      description: res.message,
    });
  };

  // Button to mark order as paid
  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id);
            toast({
              variant: res.success ? 'default' : 'destructive',
              description: res.message,
            });
          })
        }
        className='w-full bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
      >
        {isPending ? 'Processing...' : 'Mark As Paid'}
      </Button>
    );
  };

  // Button to mark order as delivered
  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id);
            toast({
              variant: res.success ? 'default' : 'destructive',
              description: res.message,
            });
          })
        }
        className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
      >
        {isPending ? 'Processing...' : 'Mark As Delivered'}
      </Button>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#F8E559]/5 via-white to-[#864AF9]/5 dark:from-[#F8E559]/5 dark:via-gray-900 dark:to-[#864AF9]/5'>
      <div className='container mx-auto px-4 py-8'>
        {/* Page Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center shadow-lg'>
              <ShoppingBag className='h-6 w-6 text-black' />
            </div>
            <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
              Order {formatId(id)}
            </h1>
          </div>
          <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              <span>Ordered on {formatDateTime(createdAt).dateTime}</span>
            </div>
            <div className='flex items-center gap-2'>
              <User className='h-4 w-4' />
              <span>{shippingAddress.fullName}</span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Payment Method */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <CreditCard className='h-5 w-5' />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-lg flex items-center justify-center'>
                      <CreditCard className='h-5 w-5 text-white' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900 dark:text-white text-lg'>
                        {paymentMethod}
                      </p>
                      {isPaid && (
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          Paid on {formatDateTime(paidAt!).dateTime}
                        </p>
                      )}
                    </div>
                  </div>
                  {isPaid ? (
                    <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800 px-3 py-1'>
                      <CheckCircle className='h-3 w-3 mr-1' />
                      Paid
                    </Badge>
                  ) : (
                    <Badge variant='destructive' className='px-3 py-1'>
                      <Clock className='h-3 w-3 mr-1' />
                      Pending
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <MapPin className='h-5 w-5' />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-lg flex items-center justify-center'>
                      <MapPin className='h-5 w-5 text-black' />
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900 dark:text-white text-lg'>
                        {shippingAddress.fullName}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {shippingAddress.streetAddress}, {shippingAddress.city}{' '}
                        {shippingAddress.postalCode}, {shippingAddress.country}
                      </p>
                    </div>
                  </div>
                  {isDelivered ? (
                    <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800 px-3 py-1'>
                      <Truck className='h-3 w-3 mr-1' />
                      Delivered
                    </Badge>
                  ) : (
                    <Badge variant='destructive' className='px-3 py-1'>
                      <Clock className='h-3 w-3 mr-1' />
                      Pending
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <Package className='h-5 w-5' />
                  Order Items ({orderitems.reduce((a, c) => a + c.qty, 0)})
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
                      {orderitems.map((item) => (
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

          {/* Order Summary & Payment */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Order Summary */}
            <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10 sticky top-4'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                  <DollarSign className='h-5 w-5' />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Items ({orderitems.reduce((a, c) => a + c.qty, 0)})
                    </span>
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      {formatCurrency(itemsPrice)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Tax
                    </span>
                    <span className='font-semibold text-gray-900 dark:text-white'>
                      {formatCurrency(taxPrice)}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Shipping
                    </span>
                    <span className='font-semibold text-green-600'>
                      {formatCurrency(shippingPrice)}
                    </span>
                  </div>
                  <div className='border-t border-gray-200 dark:border-gray-700 pt-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-lg font-bold text-gray-900 dark:text-white'>
                        Total
                      </span>
                      <span className='text-2xl font-bold bg-gradient-to-r from-[#864AF9] to-[#4C1D95] bg-clip-text text-transparent'>
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                {!isPaid && (
                  <div className='space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                    {/* PayPal Payment */}
                    {paymentMethod === 'PayPal' && (
                      <div className='space-y-2'>
                        <h3 className='font-semibold text-gray-900 dark:text-white'>
                          Pay with PayPal
                        </h3>
                        <PayPalScriptProvider
                          options={{ clientId: paypalClientId }}
                        >
                          <PrintLoadingState />
                          <PayPalButtons
                            createOrder={handleCreatePayPalOrder}
                            onApprove={handleApprovePayPalOrder}
                          />
                        </PayPalScriptProvider>
                      </div>
                    )}

                    {/* Stripe Payment */}
                    {paymentMethod === 'Stripe' && stripeClientSecret && (
                      <div className='space-y-2'>
                        <h3 className='font-semibold text-gray-900 dark:text-white'>
                          Pay with Card
                        </h3>
                        <StripePayment
                          priceInCents={Number(order.totalPrice) * 100}
                          orderId={order.id}
                          clientSecret={stripeClientSecret}
                        />
                      </div>
                    )}

                    {/* Cash On Delivery */}
                    {isAdmin && paymentMethod === 'CashOnDelivery' && (
                      <div className='space-y-2'>
                        <h3 className='font-semibold text-gray-900 dark:text-white'>
                          Cash on Delivery
                        </h3>
                        <MarkAsPaidButton />
                      </div>
                    )}
                  </div>
                )}

                {/* Admin Actions */}
                {isAdmin && isPaid && !isDelivered && (
                  <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                    <h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
                      Admin Actions
                    </h3>
                    <MarkAsDeliveredButton />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTable;
