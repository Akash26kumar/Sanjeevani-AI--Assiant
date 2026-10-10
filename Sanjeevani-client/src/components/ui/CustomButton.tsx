
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'secondary' | 'outline' | 'ghost' | 'link' | 'health';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'default',
  size = 'default',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    health: 'bg-health-500 text-white hover:bg-health-600 border-none',
  };

  const baseClass = cn(
    'relative overflow-hidden transition-all duration-300 ease-out',
    variant === 'health' ? variantClasses.health : '',
    className
  );

  const dynamicClasses = cn(
    baseClass,
    isLoading && 'opacity-70 cursor-not-allowed',
    icon && !children && 'p-0 flex items-center justify-center w-10 h-10 rounded-full',
    size === 'lg' && 'text-lg px-8 py-3 rounded-xl',
  );

  return (
    <Button
      className={dynamicClasses}
      variant={variant !== 'health' ? variant : 'default'}
      size={size}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className={cn('mr-2', !children && 'mr-0')}>{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </Button>
  );
};

export default CustomButton;
