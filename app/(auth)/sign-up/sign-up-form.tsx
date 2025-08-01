'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signUpUser } from '@/lib/actions/user.actions';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

type SignUpState = {
  success: boolean;
  message: string;
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  redirectTo?: string;
};

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
    formData: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    redirectTo: undefined,
  } as SignUpState);

  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // Use form data from previous state if available, otherwise use default values
  const formValues = data?.formData || signUpDefaultValues;

  // Handle redirect after successful sign-up
  useEffect(() => {
    if (data?.success && data?.redirectTo) {
      const timer = setTimeout(() => {
        router.push(data.redirectTo);
      }, 1500); // Small delay to show success message

      return () => clearTimeout(timer);
    }
  }, [data?.success, data?.redirectTo, router]);

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            type='text'
            required
            autoComplete='name'
            defaultValue={formValues.name}
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            defaultValue={formValues.email}
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='new-password'
            defaultValue={formValues.password}
          />
        </div>
        <div>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='new-password'
            defaultValue={formValues.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}

        {data && data.success && (
          <div className='text-center text-green-600 dark:text-green-400'>
            {data.message}
          </div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          Already have an account?{' '}
          <Link href='/sign-in' target='_self' className='link'>
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
