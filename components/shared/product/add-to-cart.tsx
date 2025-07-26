'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader, ShoppingCart } from 'lucide-react';
import { Cart, CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { useTransition } from 'react';

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
        return;
      }

      // Handle success add to cart
      toast({
        description: res.message,
        action: (
          <ToastAction
            className='bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white hover:from-[#7C3AED] hover:to-[#3B3486]'
            altText='Go To Cart'
            onClick={() => router.push('/cart')}
          >
            Go To Cart
          </ToastAction>
        ),
      });
    });
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast({
        variant: res.success ? 'default' : 'destructive',
        description: res.message,
      });

      return;
    });
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div className='space-y-4'>
      <div className='flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-[#F8E559]/10 to-[#864AF9]/10 dark:from-[#F8E559]/5 dark:to-[#864AF9]/5 rounded-xl border border-[#F8E559]/20 dark:border-[#864AF9]/20'>
        <Button
          type='button'
          variant='outline'
          onClick={handleRemoveFromCart}
          className='w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200'
          disabled={isPending}
        >
          {isPending ? (
            <Loader className='w-5 h-5 animate-spin' />
          ) : (
            <Minus className='w-5 h-5' />
          )}
        </Button>

        <div className='text-center'>
          <div className='text-2xl font-bold text-gray-900 dark:text-white'>
            {existItem.qty}
          </div>
          <div className='text-xs text-gray-600 dark:text-gray-400'>
            in cart
          </div>
        </div>

        <Button
          type='button'
          variant='outline'
          onClick={handleAddToCart}
          className='w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-[#864AF9] hover:bg-[#864AF9]/10 transition-all duration-200'
          disabled={isPending}
        >
          {isPending ? (
            <Loader className='w-5 h-5 animate-spin' />
          ) : (
            <Plus className='w-5 h-5' />
          )}
        </Button>
      </div>

      <Button
        className='w-full bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200'
        onClick={() => router.push('/cart')}
      >
        <ShoppingCart className='w-5 h-5 mr-2' />
        View Cart
      </Button>
    </div>
  ) : (
    <Button
      className='w-full bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
      type='button'
      onClick={handleAddToCart}
      disabled={isPending}
    >
      {isPending ? (
        <Loader className='w-5 h-5 animate-spin mr-2' />
      ) : (
        <ShoppingCart className='w-5 h-5 mr-2' />
      )}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
