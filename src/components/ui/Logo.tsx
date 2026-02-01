import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const iconSize = iconSizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Icon - House with Utensils */}
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Background Circle */}
        <rect 
          width="100" 
          height="100" 
          rx="20" 
          fill="#C92A2A"
        />
        
        {/* House Outline */}
        <path 
          d="M 20 55 L 50 25 L 80 55 L 80 85 L 20 85 Z" 
          fill="none" 
          stroke="white" 
          strokeWidth="5" 
          strokeLinejoin="round"
        />
        
        {/* Roof line */}
        <path 
          d="M 15 60 L 50 25 L 85 60" 
          fill="none" 
          stroke="white" 
          strokeWidth="5" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Location Pin Shape Inside */}
        <ellipse 
          cx="50" 
          cy="55" 
          rx="15" 
          ry="18" 
          fill="white"
        />
        <ellipse 
          cx="50" 
          cy="53" 
          rx="8" 
          ry="10" 
          fill="#C92A2A"
        />
        
        {/* Fork and Spoon Icon (minimal) */}
        <g transform="translate(45, 51)">
          {/* Fork */}
          <path 
            d="M -2 0 L -2 8 M -4 0 L -4 5 M 0 0 L 0 5" 
            stroke="#C92A2A" 
            strokeWidth="1.2" 
            strokeLinecap="round"
          />
          {/* Spoon */}
          <ellipse 
            cx="5" 
            cy="2" 
            rx="1.5" 
            ry="2" 
            fill="#C92A2A"
          />
          <path 
            d="M 5 4 L 5 8" 
            stroke="#C92A2A" 
            strokeWidth="1.2" 
            strokeLinecap="round"
          />
        </g>
      </svg>
      
      {/* Logo Text */}
      {showText && (
        <span 
          className={cn(
            "font-bold tracking-tight",
            size === 'sm' && "text-xl",
            size === 'md' && "text-2xl",
            size === 'lg' && "text-3xl",
            size === 'xl' && "text-4xl"
          )}
        >
          <span className="text-foreground">Any</span>
          <span className="text-primary">Feast</span>
        </span>
      )}
    </div>
  );
}
