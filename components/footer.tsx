import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Mail,
  Send,
  Truck,
  Shield,
  Headphones,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-background border-t'>
      {/* Newsletter Section */}
      <div className='bg-gray-800 dark:bg-gray-900 border-b'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='text-center md:text-left'>
              <h3 className='text-xl font-bold text-white mb-2'>
                Sign up to our news & offers
              </h3>
              <p className='text-gray-200 dark:text-gray-300 text-sm'>
                Be the first to know about exclusive offers, new products, and
                more!
              </p>
            </div>
            <div className='flex w-full md:w-auto max-w-md'>
              <div className='relative flex-1'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  type='email'
                  placeholder='email@address.com'
                  className='pl-10 pr-4 rounded-r-none border-gray-600 dark:border-gray-500 focus:border-[#864AF9] bg-gray-700 dark:bg-gray-800 text-white'
                />
              </div>
              <Button className='rounded-l-none bg-[#F8E559] hover:bg-[#F8E559]/90 text-black px-6'>
                <Send className='h-4 w-4 mr-2' />
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='bg-[#4C1D95] dark:bg-[#2D1B69]'>
        <div className='container mx-auto px-4 py-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Brand and Trust Section */}
            <div className='lg:col-span-1'>
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-white mb-2'>
                  {APP_NAME}
                </h2>
                <p className='text-gray-200 dark:text-gray-300 text-sm mb-4'>
                  Your trusted destination for quality products and exceptional
                  service.
                </p>
              </div>

              {/* Trustpilot Rating */}
              <div className='mb-6'>
                <div className='flex items-center mb-2'>
                  <span className='font-bold text-white text-sm mr-2'>
                    Trustpilot
                  </span>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4
                            ? 'text-[#F8E559] fill-current'
                            : i === 4
                              ? 'text-[#F8E559] fill-current opacity-50'
                              : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className='text-xs text-gray-200 dark:text-gray-300'>
                  Trustscore 4.8 | 2,400+ reviews
                </p>
              </div>

              {/* Social Media */}
              <div className='flex space-x-4'>
                <Link
                  href='#'
                  className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                >
                  <Facebook className='h-5 w-5' />
                </Link>
                <Link
                  href='#'
                  className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                >
                  <Twitter className='h-5 w-5' />
                </Link>
                <Link
                  href='#'
                  className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                >
                  <Instagram className='h-5 w-5' />
                </Link>
                <Link
                  href='#'
                  className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                >
                  <Youtube className='h-5 w-5' />
                </Link>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className='font-bold text-white mb-4'>Company</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='/about'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/reviews'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href='/privacy'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/cookies'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Cookie policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Terms & conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href='/sitemap'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shopping Services */}
            <div>
              <h3 className='font-bold text-white mb-4'>Shopping Services</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='/products'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Browse products
                  </Link>
                </li>
                <li>
                  <Link
                    href='/search'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Search items
                  </Link>
                </li>
                <li>
                  <Link
                    href='/categories'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href='/deals'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Deals & offers
                  </Link>
                </li>
                <li>
                  <Link
                    href='/shipping'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Shipping info
                  </Link>
                </li>
                <li>
                  <Link
                    href='/returns'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Returns policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h3 className='font-bold text-white mb-4'>Customer Support</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='/sign-in'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href='/sign-up'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/help'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Help center
                  </Link>
                </li>
                <li>
                  <Link
                    href='/faq'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href='/track-order'
                    className='text-gray-200 dark:text-gray-300 hover:text-[#F8E559] transition-colors'
                  >
                    Track order
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className='border-t border-[#864AF9] dark:border-[#A855F7] mt-8 pt-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='flex items-center space-x-3'>
                <Truck className='h-6 w-6 text-[#F8E559]' />
                <span className='font-semibold text-gray-200 dark:text-gray-300 text-sm'>
                  SHIPPING TO OVER 50 COUNTRIES
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <Shield className='h-6 w-6 text-[#F8E559]' />
                <span className='font-semibold text-gray-200 dark:text-gray-300 text-sm'>
                  100% SECURE CHECKOUT
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <Headphones className='h-6 w-6 text-[#F8E559]' />
                <span className='font-semibold text-gray-200 dark:text-gray-300 text-sm'>
                  OUTSTANDING CUSTOMER SUPPORT
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <Star className='h-6 w-6 text-[#F8E559]' />
                <span className='font-semibold text-gray-200 dark:text-gray-300 text-sm'>
                  OVER 2,400+ GENUINE REVIEWS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='bg-[#4C1D95] dark:bg-[#2D1B69] border-t border-[#864AF9] dark:border-[#A855F7]'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-200 dark:text-gray-300'>
                Copyright © 2024-{currentYear} {APP_NAME} | All Rights Reserved
              </span>
            </div>

            {/* Payment Methods */}
            <div className='flex items-center space-x-3'>
              <div className='text-xs text-gray-200 dark:text-gray-300 mr-2'>
                We accept:
              </div>
              <div className='flex space-x-2'>
                <div className='w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold'>
                  V
                </div>
                <div className='w-8 h-5 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold'>
                  M
                </div>
                <div className='w-8 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold'>
                  P
                </div>
                <div className='w-8 h-5 bg-black rounded flex items-center justify-center text-white text-xs font-bold'>
                  A
                </div>
                <div className='w-8 h-5 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold'>
                  G
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
