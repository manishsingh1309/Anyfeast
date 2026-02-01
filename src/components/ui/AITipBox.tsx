import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, Zap, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AITipBoxProps {
  tip: string;
  variant?: 'default' | 'highlight' | 'subtle';
  icon?: 'sparkles' | 'lightbulb' | 'zap' | 'brain';
  className?: string;
  animate?: boolean;
}

const icons = {
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  zap: Zap,
  brain: Brain,
};

export function AITipBox({ 
  tip, 
  variant = 'default', 
  icon = 'sparkles',
  className,
  animate = true 
}: AITipBoxProps) {
  const Icon = icons[icon];

  const variants = {
    default: "bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-primary/20",
    highlight: "bg-gradient-to-r from-accent/15 via-accent/10 to-primary/10 border-accent/30",
    subtle: "bg-muted/50 border-border",
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative rounded-2xl border p-4 overflow-hidden",
        variants[variant],
        className
      )}
    >
      {/* Animated background shimmer */}
      {variant !== 'subtle' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
      
      <div className="relative flex items-start gap-3">
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          variant === 'highlight' ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-xs font-semibold uppercase tracking-wide",
              variant === 'highlight' ? "text-accent" : "text-primary"
            )}>
              AI Suggestion
            </span>
            <motion.span
              className="flex h-1.5 w-1.5"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className={cn(
                "relative inline-flex rounded-full h-1.5 w-1.5",
                variant === 'highlight' ? "bg-accent" : "bg-primary"
              )}></span>
            </motion.span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {tip}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
