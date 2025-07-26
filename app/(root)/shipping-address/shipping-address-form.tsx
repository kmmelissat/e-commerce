'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { ShippingAddress } from '@/types';
import { shippingAddressSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Loader,
  MapPin,
  User,
  Building,
  Mail,
  Globe,
} from 'lucide-react';
import { updateUserAddress } from '@/lib/actions/user.actions';
import { shippingAddressDefaultValues } from '@/lib/constants';

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        });
        return;
      }

      toast({
        description: 'Shipping address updated successfully!',
      });

      router.push('/payment-method');
    });
  };

  return (
    <div className='space-y-6'>
      <div className='text-center mb-8'>
        <p className='text-gray-600 dark:text-gray-300 text-lg'>
          Please provide your complete shipping address to ensure accurate
          delivery
        </p>
      </div>

      <Form {...form}>
        <form
          method='post'
          className='space-y-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name='fullName'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                'fullName'
              >;
            }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  <User className='h-4 w-4 text-[#864AF9]' />
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your full name'
                    {...field}
                    className='h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-[#864AF9] dark:focus:border-[#864AF9] rounded-xl transition-all duration-200 bg-white dark:bg-gray-800'
                  />
                </FormControl>
                <FormMessage className='text-red-500 text-sm' />
              </FormItem>
            )}
          />

          {/* Street Address */}
          <FormField
            control={form.control}
            name='streetAddress'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                'streetAddress'
              >;
            }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  <MapPin className='h-4 w-4 text-[#864AF9]' />
                  Street Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your street address'
                    {...field}
                    className='h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-[#864AF9] dark:focus:border-[#864AF9] rounded-xl transition-all duration-200 bg-white dark:bg-gray-800'
                  />
                </FormControl>
                <FormMessage className='text-red-500 text-sm' />
              </FormItem>
            )}
          />

          {/* City and Postal Code Row */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='city'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'city'
                >;
              }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                    <Building className='h-4 w-4 text-[#864AF9]' />
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your city'
                      {...field}
                      className='h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-[#864AF9] dark:focus:border-[#864AF9] rounded-xl transition-all duration-200 bg-white dark:bg-gray-800'
                    />
                  </FormControl>
                  <FormMessage className='text-red-500 text-sm' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='postalCode'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'postalCode'
                >;
              }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                    <Mail className='h-4 w-4 text-[#864AF9]' />
                    Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter postal code'
                      {...field}
                      className='h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-[#864AF9] dark:focus:border-[#864AF9] rounded-xl transition-all duration-200 bg-white dark:bg-gray-800'
                    />
                  </FormControl>
                  <FormMessage className='text-red-500 text-sm' />
                </FormItem>
              )}
            />
          </div>

          {/* Country */}
          <FormField
            control={form.control}
            name='country'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                'country'
              >;
            }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  <Globe className='h-4 w-4 text-[#864AF9]' />
                  Country
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your country'
                    {...field}
                    className='h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-[#864AF9] dark:focus:border-[#864AF9] rounded-xl transition-all duration-200 bg-white dark:bg-gray-800'
                  />
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
              Continue to Payment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
