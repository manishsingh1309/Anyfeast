import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface SelectionCardProps {
  id?: string;
  label?: string;
  title?: string;
  emoji?: string;
  icon?: string;
  description?: string;
  selected?: boolean;
  isSelected?: boolean;
  onSelect: (id?: string) => void;
  className?: string;
  image?: string;
  size?: 'default' | 'compact' | 'large' | 'sm';
}

export function SelectionCard({
  id,
  label,
  title,
  emoji,
  icon,
  description,
  selected,
  isSelected,
  onSelect,
  className,
  image,
  size = 'default',
}: SelectionCardProps) {
  const isActive = selected ?? isSelected ?? false;
  const displayLabel = label ?? title ?? '';
  const displayIcon = icon ?? emoji;
  
  const sizeClasses = {
    sm: 'p-3',
    compact: 'p-3',
    default: 'p-4',
    large: 'p-5',
  };

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "relative rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden group w-full",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isActive
          ? "border-primary bg-primary/5 shadow-medium ring-2 ring-primary/20"
          : "border-border bg-card hover:border-primary/40 hover:shadow-soft hover:bg-card/80",
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Background image with enhanced overlay */}
      {image && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <motion.img 
            src={image} 
            alt="" 
            className="w-full h-full object-cover"
            animate={{
              scale: isActive ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          />
          {/* Stronger gradient overlay for better text readability */}
          <div className={cn(
            "absolute inset-0 transition-all duration-300",
            isActive 
              ? "bg-gradient-to-t from-primary/80 via-primary/40 to-primary/20" 
              : "bg-gradient-to-t from-foreground/70 via-foreground/30 to-foreground/10"
          )} />
          {/* Additional overlay for text protection */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      )}
      
      {/* Hover glow effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-br from-primary/10 via-transparent to-accent/10",
          !isActive && "group-hover:opacity-100"
        )}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {displayIcon && (
          <motion.span 
            className={cn(
              "text-2xl mb-2 block transition-transform duration-300 drop-shadow-lg",
              isActive && "scale-110"
            )}
            animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {displayIcon}
          </motion.span>
        )}
        <span className={cn(
          "font-semibold block transition-colors drop-shadow-md",
          image 
            ? "text-white" 
            : isActive 
              ? "text-primary" 
              : "text-foreground"
        )}>
          {displayLabel}
        </span>
        {description && (
          <span className={cn(
            "text-sm mt-1 block leading-relaxed drop-shadow",
            image ? "text-white/90" : isActive ? "text-primary/80" : "text-muted-foreground"
          )}>
            {description}
          </span>
        )}
      </div>
      
      {/* Selection indicator - improved */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom highlight bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-accent rounded-b-xl"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.button>
  );
}
