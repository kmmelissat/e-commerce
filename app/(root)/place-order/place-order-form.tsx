'use client';

import { useRouter } from 'next/navigation';
import { Check, Loader, ShoppingBag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { createOrder } from '@/lib/actions/order.actions';
import { useToast } from '@/hooks/use-toast';

const PlaceOrderForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await createOrder();

      if (res.redirectTo) {
        toast({
          description: 'Order placed successfully! Redirecting to payment...',
        });
        router.push(res.redirectTo);
      } else if (res.success) {
        toast({
          description: 'Order placed successfully!',
        });
        router.push('/orders');
      } else {
        toast({
          variant: 'destructive',
          description:
            res.message || 'Failed to place order. Please try again.',
        });
      }
    } catch {
      toast({
        variant: 'destructive',
        description: 'An error occurred while placing your order.',
      });
    }
  };

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        className='w-full bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200'
      >
        {pending ? (
          <Loader className='w-5 h-5 animate-spin mr-2' />
        ) : (
          <Check className='w-5 h-5 mr-2' />
        )}
        Place Order
      </Button>
    );
  };

  return (
    <div className='space-y-4'>
      <form onSubmit={handleSubmit} className='w-full'>
        <PlaceOrderButton />
      </form>

      {/* Security Notice */}
      <div className='flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400'>
        <Shield className='h-3 w-3' />
        <span>Your payment information is secure and encrypted</span>
      </div>

      {/* Order Confirmation Info */}
      <div className='p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg'>
        <div className='flex items-center gap-2 text-sm text-green-700 dark:text-green-400'>
          <ShoppingBag className='h-4 w-4' />
          <span>You will receive an order confirmation email shortly</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderForm;
