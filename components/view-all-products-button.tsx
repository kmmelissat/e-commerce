import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const ViewAllProductsButton = () => {
  return (
    <div className='flex justify-center items-center py-8 px-4'>
      <Button
        asChild
        className='bg-gradient-to-r from-[#864AF9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#3B3486] text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3'
      >
        <Link href='/search'>
          <ShoppingBag className='h-5 w-5' />
          View All Products
          <ArrowRight className='h-5 w-5' />
        </Link>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
