import { motion } from 'framer-motion';
import { StepContainer } from '../StepContainer';
import { OnboardingData } from '@/types/onboarding';
import { Minus, Plus, Users, UserRound, Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AITipBox } from '@/components/ui/AITipBox';
import { cn } from '@/lib/utils';

interface HouseholdStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

const householdPresets = [
  { value: 1, label: 'Just Me', icon: UserRound, emoji: '👤' },
  { value: 2, label: 'Couple', icon: Heart, emoji: '💑' },
  { value: 4, label: 'Family', icon: Home, emoji: '👨‍👩‍👧‍👦' },
  { value: 6, label: 'Large Family', icon: Users, emoji: '👨‍👩‍👧‍👦' },
];

const aiTips = [
  "Perfect portions for one! We'll recommend quick single-serve recipes.",
  "Cooking for two? We'll suggest romantic dinners and shareable dishes.",
  "Family-sized portions coming up! Get ready for crowd-pleasers.",
  "Big household? We'll focus on batch cooking and meal prep efficiency.",
  "Wow, you're cooking for a crowd! Party-sized recipes incoming.",
];

export function HouseholdStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
}: HouseholdStepProps) {
  const getTipIndex = () => {
    if (data.householdSize <= 1) return 0;
    if (data.householdSize === 2) return 1;
    if (data.householdSize <= 4) return 2;
    if (data.householdSize <= 6) return 3;
    return 4;
  };

  return (
    <StepContainer
      title="Who are we cooking for?"
      subtitle="We'll personalize portion sizes and recipes for your household"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={canProceed}
    >
      <div className="space-y-8 relative">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-transparent to-amber-100/50 rounded-3xl blur-3xl -z-10" />
        
        {/* Quick preset buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {householdPresets.map((preset) => {
            const isSelected = data.householdSize === preset.value;
            return (
              <motion.button
                key={preset.value}
                onClick={() => updateData({ householdSize: preset.value })}
                className={cn(
                  "relative p-4 rounded-2xl border-2 transition-all duration-300 text-center group",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-medium"
                    : "border-border bg-card hover:border-primary/40 hover:shadow-soft"
                )}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl mb-2 block">{preset.emoji}</span>
                <span className={cn(
                  "font-semibold text-sm block transition-colors",
                  isSelected ? "text-primary" : "text-foreground"
                )}>
                  {preset.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground font-medium">or select exact number</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Counter */}
        <div className="flex flex-col items-center gap-6">
          {/* Animated illustration */}
          <motion.div
            className="relative w-36 h-36 rounded-full bg-gradient-to-br from-secondary via-secondary/50 to-muted flex items-center justify-center shadow-soft"
            animate={{
              boxShadow: [
                '0 4px 20px -2px rgba(0,0,0,0.08)',
                '0 8px 30px -4px rgba(0,0,0,0.12)',
                '0 4px 20px -2px rgba(0,0,0,0.08)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Decorative rings */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-dashed border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-primary/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* People icons based on count */}
            <div className="flex flex-wrap items-center justify-center gap-1 max-w-[80px]">
              {Array.from({ length: Math.min(data.householdSize, 6) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 400 }}
                >
                  <UserRound className={cn(
                    "text-primary transition-all",
                    data.householdSize <= 2 ? "w-8 h-8" : "w-6 h-6"
                  )} />
                </motion.div>
              ))}
              {data.householdSize > 6 && (
                <motion.span
                  className="text-sm font-bold text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  +{data.householdSize - 6}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Counter controls */}
          <div className="flex items-center gap-8">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateData({ householdSize: Math.max(1, data.householdSize - 1) })}
                disabled={data.householdSize <= 1}
                className="w-14 h-14 rounded-full border-2 shadow-soft disabled:opacity-40"
              >
                <Minus className="w-6 h-6" />
              </Button>
            </motion.div>

            <motion.div
              key={data.householdSize}
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="text-center min-w-[100px]"
            >
              <span className="text-7xl font-display font-bold text-primary">
                {data.householdSize}
              </span>
              <p className="text-muted-foreground mt-1 font-medium">
                {data.householdSize === 1 ? "person" : "people"}
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateData({ householdSize: Math.min(10, data.householdSize + 1) })}
                disabled={data.householdSize >= 10}
                className="w-14 h-14 rounded-full border-2 shadow-soft disabled:opacity-40"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* AI Tip */}
        <motion.div
          key={getTipIndex()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AITipBox 
            tip={aiTips[getTipIndex()]} 
            icon="lightbulb"
            variant="default"
          />
        </motion.div>
      </div>
    </StepContainer>
  );
}
