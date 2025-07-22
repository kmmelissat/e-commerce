import { DollarSign, Headset, ShoppingBag, WalletCards } from 'lucide-react';

const IconBoxes = () => {
  return (
    <div className='px-4'>
      <div className='grid md:grid-cols-4 gap-8'>
        <div className='group text-center space-y-4 hover:scale-105 transition-all duration-300'>
          <div className='mx-auto w-16 h-16 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300'>
            <ShoppingBag className='h-8 w-8 text-black' />
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
              Free Shipping
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
              Free shipping on orders above $100
            </p>
          </div>
        </div>

        <div className='group text-center space-y-4 hover:scale-105 transition-all duration-300'>
          <div className='mx-auto w-16 h-16 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300'>
            <DollarSign className='h-8 w-8 text-white' />
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
              Money Back Guarantee
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
              Within 30 days of purchase
            </p>
          </div>
        </div>

        <div className='group text-center space-y-4 hover:scale-105 transition-all duration-300'>
          <div className='mx-auto w-16 h-16 bg-gradient-to-br from-[#F8E559] to-[#F8E559]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300'>
            <WalletCards className='h-8 w-8 text-black' />
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
              Flexible Payment
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
              Pay with credit card, PayPal or COD
            </p>
          </div>
        </div>

        <div className='group text-center space-y-4 hover:scale-105 transition-all duration-300'>
          <div className='mx-auto w-16 h-16 bg-gradient-to-br from-[#864AF9] to-[#4C1D95] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300'>
            <Headset className='h-8 w-8 text-white' />
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
              24/7 Support
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
              Get support at any time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconBoxes;
