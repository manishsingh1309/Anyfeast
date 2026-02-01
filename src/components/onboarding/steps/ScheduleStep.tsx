import { motion } from 'framer-motion';
import { StepContainer } from '../StepContainer';
import { OnboardingData } from '@/types/onboarding';
import { Calendar, Check, Flame, TrendingUp } from 'lucide-react';
import { AITipBox } from '@/components/ui/AITipBox';
import { cn } from '@/lib/utils';

interface ScheduleStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

const mealOptions = [
  { value: 2, label: '2', description: 'Light week', subtext: 'Try it out', icon: '🌱' },
  { value: 3, label: '3', description: 'Balanced', subtext: 'Most popular', icon: '⭐', popular: true },
  { value: 4, label: '4', description: 'Regular', subtext: 'Weeknight pro', icon: '🍳' },
  { value: 5, label: '5', description: 'Active', subtext: 'Full coverage', icon: '💪' },
  { value: 7, label: '7', description: 'Every day', subtext: 'Committed chef', icon: '👨‍🍳' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ScheduleStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
}: ScheduleStepProps) {
  const getAITip = () => {
    const servings = data.mealsPerWeek * data.householdSize;
    if (data.mealsPerWeek <= 2) {
      return `${servings} servings per week — a great way to start your meal kit journey without commitment.`;
    }
    if (data.mealsPerWeek === 3) {
      return `${servings} servings per week — the sweet spot for most households. You'll save time and eat better!`;
    }
    if (data.mealsPerWeek <= 5) {
      return `${servings} servings per week — you're serious about cooking! We'll ensure plenty of variety.`;
    }
    return `${servings} servings per week — a full week of delicious meals! Maximum savings and zero meal planning stress.`;
  };

  return (
    <StepContainer
      title="How often do you cook?"
      subtitle="We'll create the perfect meal plan for your schedule"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={canProceed}
      isLastStep
    >
      <div className="space-y-8">
        {/* Visual week preview */}
        <motion.div 
          className="bg-card rounded-2xl border border-border p-5 shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Your Week Preview</span>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const isActive = index < data.mealsPerWeek;
              return (
                <motion.div
                  key={day}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-xl transition-all duration-300",
                    isActive ? "bg-primary/10 border-2 border-primary/30" : "bg-muted/50 border-2 border-transparent"
                  )}
                  animate={{
                    scale: isActive ? 1 : 0.95,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <span className={cn(
                    "text-xs font-medium mb-1",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {day}
                  </span>
                  <motion.div
                    animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {isActive ? (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted" />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Meal frequency selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground block text-center">
            Select meals per week
          </label>
          
          <div className="flex flex-wrap justify-center gap-3">
            {mealOptions.map((option, index) => {
              const isSelected = data.mealsPerWeek === option.value;
              return (
                <motion.button
                  key={option.value}
                  onClick={() => updateData({ mealsPerWeek: option.value })}
                  className={cn(
                    "relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 min-w-[90px]",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-medium"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-soft"
                  )}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  {/* Popular badge */}
                  {option.popular && (
                    <motion.span
                      className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-bold whitespace-nowrap"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      Popular
                    </motion.span>
                  )}
                  
                  <span className="text-xl mb-1">{option.icon}</span>
                  <span className={cn(
                    "text-3xl font-display font-bold transition-colors",
                    isSelected ? "text-primary" : "text-foreground"
                  )}>
                    {option.label}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {option.description}
                  </span>
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Stats summary */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-secondary">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Flame className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {data.mealsPerWeek * data.householdSize}
              </p>
              <p className="text-xs text-muted-foreground">Total servings/week</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-primary">
                ~{Math.round(data.mealsPerWeek * 45)}
              </p>
              <p className="text-xs text-muted-foreground">Minutes saved/week</p>
            </div>
          </div>
        </motion.div>

        {/* AI Tip */}
        <AITipBox 
          tip={getAITip()}
          icon="sparkles"
          variant="highlight"
        />
      </div>
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-cyan-100/50 rounded-3xl blur-3xl -z-10 pointer-events-none" style={{ top: '-100px', bottom: '-100px', left: '-50px', right: '-50px' }} />
    </StepContainer>
  );
}
