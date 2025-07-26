import React from 'react';
import { cn } from '@/lib/utils';
import { Check, MapPin, CreditCard, ShoppingBag } from 'lucide-react';

const CheckoutSteps = ({ current = 0 }) => {
  const steps = [
    { name: 'User Login', icon: Check, completed: current > 0 },
    { name: 'Shipping Address', icon: MapPin, completed: current > 1 },
    { name: 'Payment Method', icon: CreditCard, completed: current > 2 },
    { name: 'Place Order', icon: ShoppingBag, completed: current > 3 },
  ];

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='flex items-center justify-between'>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === current;
          const isCompleted = step.completed;

          return (
            <React.Fragment key={step.name}>
              <div className='flex flex-col items-center'>
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg',
                    isCompleted
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : isActive
                        ? 'bg-gradient-to-r from-[#864AF9] to-[#4C1D95] text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className='h-6 w-6' />
                  ) : (
                    <Icon className='h-6 w-6' />
                  )}
                </div>
                <div className='mt-3 text-center'>
                  <p
                    className={cn(
                      'text-sm font-medium transition-colors duration-300',
                      isCompleted
                        ? 'text-green-600 dark:text-green-400'
                        : isActive
                          ? 'text-[#864AF9] dark:text-[#864AF9]'
                          : 'text-gray-500 dark:text-gray-400'
                    )}
                  >
                    {step.name}
                  </p>
                  <div
                    className={cn(
                      'mt-1 h-1 rounded-full transition-all duration-300',
                      isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : isActive
                          ? 'bg-gradient-to-r from-[#864AF9] to-[#4C1D95]'
                          : 'bg-gray-200 dark:bg-gray-700'
                    )}
                  />
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className='flex-1 mx-4'>
                  <div
                    className={cn(
                      'h-1 rounded-full transition-all duration-300',
                      isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
