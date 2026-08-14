import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex min-w-0 items-center justify-center gap-2 rounded-md text-center text-sm font-semibold uppercase leading-tight tracking-wide transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
        outline: 'border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background',
        ghost: 'hover:bg-muted hover:text-foreground',
      },
      size: {
        default: 'min-h-12 px-6 py-3',
        sm: 'min-h-11 px-4 py-2',
        lg: 'min-h-14 px-8 py-3 text-base',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
