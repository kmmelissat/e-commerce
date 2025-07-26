'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { updateProfile } from '@/lib/actions/user.actions';
import { updateProfileSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { User, Mail, Loader, Save } from 'lucide-react';

const ProfileForm = () => {
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? '',
      email: session?.user?.email ?? '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    const res = await updateProfile(values);

    if (!res.success) {
      return toast({
        variant: 'destructive',
        description: res.message,
      });
    }

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: values.name,
      },
    };

    await update(newSession);

    toast({
      description: 'Profile updated successfully!',
    });
  };

  return (
    <div className='space-y-6'>
      <div className='text-center mb-8'>
        <p className='text-gray-600 dark:text-gray-300 text-lg'>
          Update your account information to keep your profile current
        </p>
      </div>

      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          {/* Email Field */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  <Mail className='h-4 w-4 text-[#864AF9]' />
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder='Enter your email'
                    className='h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-[#864AF9] dark:focus:border-[#864AF9] rounded-xl transition-all duration-200 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    {...field}
                  />
                </FormControl>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Email cannot be changed for security reasons
                </p>
                <FormMessage className='text-red-500 text-sm' />
              </FormItem>
            )}
          />

          {/* Name Field */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  <User className='h-4 w-4 text-[#864AF9]' />
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your full name'
                    className='h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-[#864AF9] dark:focus:border-[#864AF9] rounded-xl transition-all duration-200 bg-white dark:bg-gray-800'
                    {...field}
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
              disabled={form.formState.isSubmitting}
              className='w-full bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200'
            >
              {form.formState.isSubmitting ? (
                <Loader className='w-5 h-5 animate-spin mr-2' />
              ) : (
                <Save className='w-5 h-5 mr-2' />
              )}
              Update Profile
            </Button>
          </div>
        </form>
      </Form>

      {/* Security Notice */}
      <div className='p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
        <div className='flex items-start gap-3'>
          <div className='w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
            <Mail className='h-3 w-3 text-blue-600 dark:text-blue-400' />
          </div>
          <div>
            <p className='text-sm font-medium text-blue-900 dark:text-blue-100 mb-1'>
              Email Security
            </p>
            <p className='text-xs text-blue-700 dark:text-blue-300'>
              Your email address is used for account verification and cannot be
              changed. Contact support if you need to update your email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
