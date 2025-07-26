'use client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { paymentMethodSchema } from '@/lib/validators';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Loader,
  CreditCard,
  DollarSign,
  Truck,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { updateUserPaymentMethod } from '@/lib/actions/user.actions';

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
        return;
      }

      toast({
        description: 'Payment method updated successfully!',
      });

      router.push('/place-order');
    });
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'PayPal':
        return <CreditCard className='h-6 w-6 text-blue-600' />;
      case 'Stripe':
        return <CreditCard className='h-6 w-6 text-purple-600' />;
      case 'CashOnDelivery':
        return <Truck className='h-6 w-6 text-green-600' />;
      default:
        return <DollarSign className='h-6 w-6 text-gray-600' />;
    }
  };

  const getPaymentMethodDescription = (method: string) => {
    switch (method) {
      case 'PayPal':
        return 'Pay securely with your PayPal account or credit card';
      case 'Stripe':
        return 'Pay with any major credit or debit card';
      case 'CashOnDelivery':
        return 'Pay with cash when your order is delivered';
      default:
        return 'Secure payment processing';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='text-center mb-8'>
        <p className='text-gray-600 dark:text-gray-300 text-lg'>
          Choose the payment method that works best for you
        </p>
      </div>

      <Form {...form}>
        <form
          method='post'
          className='space-y-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='space-y-4'>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className='space-y-4'
                  >
                    {PAYMENT_METHODS.map((paymentMethod) => (
                      <FormItem key={paymentMethod} className='relative'>
                        <FormControl>
                          <div className='relative'>
                            <RadioGroupItem
                              value={paymentMethod}
                              checked={field.value === paymentMethod}
                              className='sr-only'
                            />
                            <div
                              className={`
                                relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200
                                ${
                                  field.value === paymentMethod
                                    ? 'border-[#864AF9] bg-gradient-to-r from-[#864AF9]/5 to-[#4C1D95]/5 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#864AF9]/50 hover:shadow-md'
                                }
                              `}
                              onClick={() => field.onChange(paymentMethod)}
                            >
                              {/* Selection Indicator */}
                              <div
                                className={`
                                absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                                ${
                                  field.value === paymentMethod
                                    ? 'border-[#864AF9] bg-[#864AF9]'
                                    : 'border-gray-300 dark:border-gray-600'
                                }
                              `}
                              >
                                {field.value === paymentMethod && (
                                  <div className='w-2 h-2 bg-white rounded-full' />
                                )}
                              </div>

                              {/* Payment Method Content */}
                              <div className='flex items-start gap-4'>
                                <div
                                  className={`
                                  p-3 rounded-lg transition-all duration-200
                                  ${
                                    field.value === paymentMethod
                                      ? 'bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80'
                                      : 'bg-gray-100 dark:bg-gray-700'
                                  }
                                `}
                                >
                                  {getPaymentMethodIcon(paymentMethod)}
                                </div>

                                <div className='flex-1'>
                                  <h3
                                    className={`
                                    text-lg font-semibold mb-2 transition-colors duration-200
                                    ${
                                      field.value === paymentMethod
                                        ? 'text-[#864AF9]'
                                        : 'text-gray-900 dark:text-white'
                                    }
                                  `}
                                  >
                                    {paymentMethod}
                                  </h3>
                                  <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
                                    {getPaymentMethodDescription(paymentMethod)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className='text-red-500 text-sm' />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className='pt-6'>
            <Button
              type='submit'
              disabled={isPending}
              className='w-full bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200'
            >
              {isPending ? (
                <Loader className='w-5 h-5 animate-spin mr-2' />
              ) : (
                <ArrowRight className='w-5 h-5 mr-2' />
              )}
              Continue to Order Review
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentMethodForm;
