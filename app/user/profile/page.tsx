import { Metadata } from 'next';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import ProfileForm from './profile-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, Settings, Mail, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customer Profile',
};

const Profile = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className='min-h-screen bg-gradient-to-br from-[#F8E559]/5 via-white to-[#864AF9]/5 dark:from-[#F8E559]/5 dark:via-gray-900 dark:to-[#864AF9]/5'>
        <div className='container mx-auto px-4 py-8'>
          {/* Page Header */}
          <div className='mb-8 text-center'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center shadow-lg'>
                <User className='h-6 w-6 text-black' />
              </div>
              <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                My Profile
              </h1>
              <div className='w-12 h-12 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center shadow-lg'>
                <Settings className='h-6 w-6 text-white' />
              </div>
            </div>
            <p className='text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto'>
              Manage your account information and preferences
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Profile Form */}
            <div className='lg:col-span-2'>
              <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-2xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                    <User className='h-6 w-6' />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>
            </div>

            {/* Account Info & Features */}
            <div className='lg:col-span-1 space-y-6'>
              {/* Account Summary */}
              <Card className='border-0 shadow-xl bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10 sticky top-4'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-xl bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                    <Shield className='h-5 w-5' />
                    Account Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                        <Mail className='h-4 w-4 text-black' />
                      </div>
                      <div>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          Email
                        </p>
                        <p className='font-medium text-gray-900 dark:text-white'>
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center'>
                        <User className='h-4 w-4 text-white' />
                      </div>
                      <div>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          Name
                        </p>
                        <p className='font-medium text-gray-900 dark:text-white'>
                          {session?.user?.name || 'Not set'}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                        <Calendar className='h-4 w-4 text-black' />
                      </div>
                      <div>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          Member Since
                        </p>
                        <p className='font-medium text-gray-900 dark:text-white'>
                          Recently
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Features */}
              <Card className='border-0 shadow-lg bg-gradient-to-br from-white to-[#F8E559]/5 dark:from-gray-800 dark:to-[#864AF9]/10'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-lg bg-gradient-to-r from-[#4C1D95] to-[#864AF9] bg-clip-text text-transparent'>
                    <Settings className='h-5 w-5' />
                    Account Features
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                        <Shield className='h-4 w-4 text-black' />
                      </div>
                      <div>
                        <p className='font-medium text-sm text-gray-900 dark:text-white'>
                          Secure Account
                        </p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          Your data is protected
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-full flex items-center justify-center'>
                        <Mail className='h-4 w-4 text-white' />
                      </div>
                      <div>
                        <p className='font-medium text-sm text-gray-900 dark:text-white'>
                          Email Verified
                        </p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          Account is active
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-full flex items-center justify-center'>
                        <User className='h-4 w-4 text-black' />
                      </div>
                      <div>
                        <p className='font-medium text-sm text-gray-900 dark:text-white'>
                          Profile Complete
                        </p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          Keep it updated
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
    </SessionProvider>
  );
};

export default Profile;
