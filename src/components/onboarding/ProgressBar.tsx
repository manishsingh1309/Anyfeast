import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
  showLabels?: boolean;
}

const stepLabels = [
  'Household',
  'Dietary',
  'Cuisines',
  'Goals',
  'Schedule',
];

export function ProgressBar({ 
  progress, 
  currentStep, 
  totalSteps,
  showLabels = true 
}: ProgressBarProps) {
  return (
    <div className="w-full space-y-3">
      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            {/* Step dot */}
            <motion.div
              className={cn(
                "relative flex items-center justify-center",
                index === currentStep && "z-10"
              )}
            >
              <motion.div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2",
                  index < currentStep 
                    ? "bg-primary border-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-background border-primary text-primary shadow-md"
                    : "bg-muted border-muted text-muted-foreground"
                )}
                animate={index === currentStep ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {index < currentStep ? (
                  <motion.svg 
                    className="w-4 h-4" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              
              {/* Active pulse ring */}
              {index === currentStep && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
            
            {/* Connector line */}
            {index < totalSteps - 1 && (
              <div className="flex-1 h-0.5 mx-1 bg-muted rounded-full overflow-hidden min-w-[20px]">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: index < currentStep ? '100%' : '0%' 
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step labels - optional */}
      {showLabels && (
        <div className="hidden sm:flex items-center justify-between px-1">
          {stepLabels.map((label, index) => (
            <span
              key={label}
              className={cn(
                "text-xs font-medium transition-colors text-center w-16",
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="relative h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['-100%', '500%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Progress text */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="font-semibold text-primary">
          {Math.round(progress)}% complete
        </span>
      </div>
    </div>
  );
}
