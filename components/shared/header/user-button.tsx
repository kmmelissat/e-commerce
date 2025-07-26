import Link from 'next/link';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import UserDropdown from './user-dropdown';

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button
        asChild
        className='bg-gradient-to-r from-[#4C1D95] to-[#864AF9] hover:from-[#3B3486] hover:to-[#7C3AED] text-white shadow-lg hover:shadow-xl transition-all duration-200'
      >
        <Link href='/sign-in' className='flex items-center gap-2'>
          <UserIcon className='h-4 w-4' />
          <span className='hidden lg:block'>Sign In</span>
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className='flex gap-2 items-center'>
      <UserDropdown user={session.user} firstInitial={firstInitial} />
    </div>
  );
};

export default UserButton;
