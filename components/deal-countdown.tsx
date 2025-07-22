'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Sparkles, Clock, Gift, ShoppingCart } from 'lucide-react';

// Static target date (replace with desired date)
const TARGET_DATE = new Date('2025-12-31T23:59:59');

// Function to calculate the time remaining
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    // Calculate initial time on client
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }

      return () => clearInterval(timerInterval);
    }, 1000);
  }, []);

  if (!time) {
    return (
      <section className='py-20 px-4'>
        <div className='container mx-auto'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
            <div className='flex flex-col gap-6 text-center md:text-left'>
              <div className='flex items-center gap-2 justify-center md:justify-start'>
                <Sparkles className='h-6 w-6 text-[#F8E559]' />
                <span className='text-[#F8E559] font-semibold text-sm uppercase tracking-wider'>
                  Limited Time
                </span>
              </div>
              <h3 className='text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight'>
                Loading Countdown...
              </h3>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className='py-20 px-4'>
        <div className='container mx-auto'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
            <div className='flex flex-col gap-6 text-center md:text-left'>
              <div className='flex items-center gap-2 justify-center md:justify-start'>
                <Clock className='h-6 w-6 text-red-500' />
                <span className='text-red-500 font-semibold text-sm uppercase tracking-wider'>
                  Deal Ended
                </span>
              </div>
              <h3 className='text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight'>
                Deal Has Ended
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-lg max-w-2xl'>
                This deal is no longer available. Check out our latest
                promotions and stay tuned for new amazing offers!
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                <Button
                  asChild
                  className='bg-gradient-to-r from-[#4C1D95] to-[#864AF9] hover:from-[#3B3486] hover:to-[#7C3AED] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3 text-lg rounded-2xl'
                >
                  <Link href='/search' className='flex items-center gap-2'>
                    <ShoppingCart className='h-5 w-5' />
                    View Products
                  </Link>
                </Button>
              </div>
            </div>
            <div className='relative'>
              <div className='w-80 h-80 bg-gray-200 dark:bg-gray-700 rounded-3xl flex items-center justify-center'>
                <span className='text-gray-500 dark:text-gray-400 text-lg'>
                  Deal Expired
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-20 px-4'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
          <div className='flex flex-col gap-8 text-center md:text-left flex-1'>
            <div className='flex items-center gap-3 justify-center md:justify-start'>
              <div className='flex items-center gap-2 bg-[#F8E559]/20 px-6 py-3 rounded-full border border-[#F8E559]/30 shadow-lg'>
                <Sparkles className='h-5 w-5 text-[#F8E559]' />
                <span className='text-[#F8E559] font-semibold text-sm uppercase tracking-wider'>
                  Limited Time Offer
                </span>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-4xl md:text-6xl font-bold text-gray-800 dark:text-white leading-tight'>
                Deal Of The Month
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed'>
                Get ready for a shopping experience like never before with our
                Deals of the Month! Every purchase comes with exclusive perks
                and offers, making this month a celebration of savvy choices and
                amazing deals. Don&apos;t miss out! 🎁🛒
              </p>
            </div>

            {/* Countdown Timer */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 justify-center md:justify-start'>
                <Clock className='h-5 w-5 text-[#F8E559]' />
                <span className='text-[#F8E559] font-semibold text-lg'>
                  Time Remaining:
                </span>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md'>
                <StatBox label='Days' value={time.days} />
                <StatBox label='Hours' value={time.hours} />
                <StatBox label='Minutes' value={time.minutes} />
                <StatBox label='Seconds' value={time.seconds} />
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
              <Button
                asChild
                className='bg-gradient-to-r from-[#F8E559] to-[#F8E559]/90 hover:from-[#F8E559]/90 hover:to-[#F8E559] text-black shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg font-semibold rounded-2xl'
              >
                <Link href='/search' className='flex items-center gap-2'>
                  <Gift className='h-5 w-5' />
                  Shop Now
                </Link>
              </Button>
              <Button
                asChild
                className='bg-gradient-to-r from-[#4C1D95] to-[#864AF9] hover:from-[#3B3486] hover:to-[#7C3AED] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg font-semibold rounded-2xl'
              >
                <Link href='/deals' className='flex items-center gap-2'>
                  <ShoppingCart className='h-5 w-5' />
                  View All Deals
                </Link>
              </Button>
            </div>
          </div>

          <div className='relative flex-1 flex justify-center md:justify-end'>
            <div className='relative'>
              <div className='relative bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-2xl'>
                <Image
                  src='/images/promo.jpg'
                  alt='Special promotion'
                  width={400}
                  height={300}
                  className='rounded-2xl shadow-lg'
                />
                <div className='absolute -top-4 -right-4 bg-[#F8E559] text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg'>
                  -50% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <div className='bg-white dark:bg-gray-800 rounded-3xl p-4 border border-gray-200 dark:border-gray-700 text-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'>
    <div className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-1'>
      {value.toString().padStart(2, '0')}
    </div>
    <div className='text-[#864AF9] font-medium text-sm uppercase tracking-wider'>
      {label}
    </div>
  </div>
);

export default DealCountdown;
