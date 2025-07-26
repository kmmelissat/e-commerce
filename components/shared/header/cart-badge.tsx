'use client';

import { useEffect, useState } from 'react';
import { getMyCart } from '@/lib/actions/cart.actions';

const CartBadge = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getMyCart();
        const count =
          cart?.items?.reduce((total, item) => total + item.qty, 0) || 0;
        setCartCount(count);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCartCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();

    // Refresh cart count every 5 seconds
    const interval = setInterval(fetchCart, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className='absolute -top-1 -right-1 bg-gray-300 dark:bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse'>
        -
      </div>
    );
  }

  if (cartCount === 0) {
    return null;
  }

  return (
    <div className='absolute -top-1 -right-1 bg-gradient-to-r from-[#F8E559] to-[#F8E559]/80 text-black text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold shadow-lg'>
      {cartCount > 99 ? '99+' : cartCount}
    </div>
  );
};

export default CartBadge;
