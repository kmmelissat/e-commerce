'use client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import {
  ShoppingBag,
  Package,
  Truck,
  CreditCard,
  Shield,
  Plus,
  Minus,
  Loader,
} from 'lucide-react';
import { Cart, CartItem } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

// Enhanced Add Button
function AddButton({ item }: { item: CartItem }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      variant='outline'
      size='sm'
      type='button'
      className='w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-[#864AF9] hover:bg-[#864AF9]/10 transition-all duration-200'
      onClick={() =>
        startTransition(async () => {
          const res = await addItemToCart(item);

          if (!res.success) {
            toast({
              variant: 'destructive',
              description: res.message,
            });
          } else {
            toast({
              description: 'Item added to cart',
            });
          }
        })
      }
    >
      {isPending ? (
        <Loader className='w-3 h-3 animate-spin' />
      ) : (
        <Plus className='w-3 h-3' />
      )}
    </Button>
  );
}

// Enhanced Remove Button
function RemoveButton({ item }: { item: CartItem }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      variant='outline'
      size='sm'
      type='button'
      className='w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200'
      onClick={() =>
        startTransition(async () => {
          const res = await removeItemFromCart(item.productId);

          if (!res.success) {
            toast({
              variant: 'destructive',
              description: res.message,
            });
          } else {
            toast({
              description: 'Item removed from cart',
            });
          }
        })
      }
    >
      {isPending ? (
        <Loader className='w-3 h-3 animate-spin' />
      ) : (
        <Minus className='w-3 h-3' />
      )}
    </Button>
  );
}

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const totalItems = cart?.items?.reduce((a, c) => a + c.qty, 0) || 0;
  const subtotal = Number(cart?.itemsPrice) || 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#F8E559]/5 via-white to-[#864AF9]/5 dark:from-[#F8E559]/5 dark:via-gray-900 dark:to-[#864AF9]/5'>
      <div className='container mx-auto px-4 py-8'>
        {/* Page Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center shadow-lg'>
              <ShoppingBag className='h-6 w-6 text-black' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
              Shopping Cart
            </h1>
          </div>
          <p className='text-gray-600 dark:text-gray-300 text-lg'>
            Review your items and proceed to checkout
          </p>
        </div>

        {!cart || cart.items.length === 0 ? (
          <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
            <CardContent className='text-center py-16'>
              <div className='w-20 h-20 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
                <ShoppingBag className='h-10 w-10 text-black' />
              </div>
              <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
                Your cart is empty
              </h3>
              <p className='text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto'>
                Looks like you haven&apos;t added any items to your cart yet.
                Start shopping to discover amazing products!
              </p>
              <Button
                asChild
                className='bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200'
              >
                <Link href='/search'>Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2 space-y-4'>
              {cart.items.map((item) => (
                <Card
                  key={item.slug}
                  className='border-0 shadow-lg bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10 overflow-hidden'
                >
                  <CardContent className='p-6'>
                    <div className='flex items-center gap-4'>
                      {/* Product Image */}
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex-shrink-0'
                      >
                        <div className='relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className='w-20 h-20 object-cover object-center hover:scale-110 transition-transform duration-300'
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className='flex-1 min-w-0'>
                        <Link href={`/product/${item.slug}`}>
                          <h3 className='font-semibold text-gray-900 dark:text-white hover:text-[#864AF9] transition-colors duration-200 line-clamp-2'>
                            {item.name}
                          </h3>
                        </Link>
                        <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                          Price:{' '}
                          <span className='font-semibold text-[#864AF9]'>
                            {formatCurrency(Number(item.price))}
                          </span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className='flex items-center gap-3'>
                        <RemoveButton item={item} />
                        <div className='w-12 h-12 bg-gradient-to-r from-[#F8E559]/10 to-[#864AF9]/10 dark:from-[#F8E559]/5 dark:to-[#864AF9]/5 rounded-xl border border-[#F8E559]/20 dark:border-[#864AF9]/20 flex items-center justify-center'>
                          <span className='font-bold text-gray-900 dark:text-white'>
                            {item.qty}
                          </span>
                        </div>
                        <AddButton item={item} />
                      </div>

                      {/* Total Price */}
                      <div className='text-right'>
                        <p className='font-bold text-lg text-gray-900 dark:text-white'>
                          {formatCurrency(Number(item.price) * item.qty)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
              <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10 sticky top-4'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                    <Package className='h-5 w-5' />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                  {/* Summary Details */}
                  <div className='space-y-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-600 dark:text-gray-400'>
                        Items ({totalItems})
                      </span>
                      <span className='font-semibold'>
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-600 dark:text-gray-400'>
                        Shipping
                      </span>
                      <span className='font-semibold'>
                        {shipping === 0 ? (
                          <span className='text-green-600 flex items-center gap-1'>
                            <Truck className='h-4 w-4' />
                            Free
                          </span>
                        ) : (
                          formatCurrency(shipping)
                        )}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-600 dark:text-gray-400'>
                        Tax
                      </span>
                      <span className='font-semibold'>
                        {formatCurrency(tax)}
                      </span>
                    </div>
                    <div className='border-t border-gray-200 dark:border-gray-700 pt-3'>
                      <div className='flex justify-between items-center'>
                        <span className='text-lg font-bold text-gray-900 dark:text-white'>
                          Total
                        </span>
                        <span className='text-2xl font-bold bg-gradient-to-r from-[#864AF9] to-[#4C1D95] bg-clip-text text-transparent'>
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    className='w-full bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200'
                    disabled={isPending}
                    onClick={() =>
                      startTransition(() => router.push('/shipping-address'))
                    }
                  >
                    {isPending ? (
                      <Loader className='w-5 h-5 animate-spin mr-2' />
                    ) : (
                      <CreditCard className='w-5 h-5 mr-2' />
                    )}
                    Proceed to Checkout
                  </Button>

                  {/* Security Badge */}
                  <div className='flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                    <Shield className='h-4 w-4' />
                    <span>Secure Checkout</span>
                  </div>

                  {/* Continue Shopping */}
                  <div className='text-center'>
                    <Button
                      asChild
                      variant='outline'
                      className='w-full border-[#F8E559] text-[#F8E559] hover:bg-[#F8E559]/10 dark:border-[#F8E559] dark:text-[#F8E559] dark:hover:bg-[#F8E559]/10'
                    >
                      <Link href='/search'>Continue Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTable;
