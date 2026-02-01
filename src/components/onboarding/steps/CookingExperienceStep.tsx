import { StepContainer } from '../StepContainer';
import { OnboardingData, SKILL_OPTIONS, TIME_OPTIONS, GOAL_OPTIONS } from '@/types/onboarding';
import { SelectionCard } from '../SelectionCard';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CookingExperienceStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

export function CookingExperienceStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
}: CookingExperienceStepProps) {
  const adjustHousehold = (delta: number) => {
    const newSize = Math.max(1, Math.min(10, data.householdSize + delta));
    updateData({ householdSize: newSize });
  };

  return (
    <StepContainer
      title="Tell us about your cooking style"
      subtitle="This helps us recommend recipes perfect for you"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={canProceed}
    >
      {/* Section A: Skill Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">
          How confident are you in the kitchen?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-sky-100/50 rounded-3xl blur-3xl -z-10" />
          
          {SKILL_OPTIONS.map((skill) => (
            <SelectionCard
              key={skill.id}
              emoji={skill.emoji}
              title={skill.label}
              description={skill.description}
              isSelected={data.skillLevel === skill.id}
              onSelect={() => updateData({ skillLevel: skill.id })}
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Section B: Cooking Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">
          What's your main cooking goal?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-transparent to-orange-100/40 rounded-3xl blur-3xl -z-10" />
          
          {GOAL_OPTIONS.map((goal) => (
            <SelectionCard
              key={goal.id}
              emoji={goal.icon}
              title={goal.label}
              description={goal.description}
              isSelected={data.cookingGoal === goal.id}
              onSelect={() => updateData({ cookingGoal: goal.id })}
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Section C: Time Availability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">
          How much time do you have for cooking?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIME_OPTIONS.map((time) => (
            <SelectionCard
              key={time.id}
              emoji={time.emoji}
              title={time.label}
              description={time.description}
              isSelected={data.cookingTime === parseInt(time.id.split('-')[0])}
              onSelect={() =>
                updateData({ cookingTime: parseInt(time.id.split('-')[0]) })
              }
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Section D: Household Size */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-4">
          How many people are you cooking for?
        </h3>
        <div className="flex items-center gap-6 bg-card rounded-xl p-6 shadow-soft max-w-xs">
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustHousehold(-1)}
            disabled={data.householdSize <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <div className="text-center flex-1">
            <span className="text-4xl font-bold text-primary">
              {data.householdSize}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {data.householdSize === 1 ? 'Person' : 'People'}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustHousehold(1)}
            disabled={data.householdSize >= 10}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {data.householdSize === 2 && '👫 Perfect for couples!'}
          {data.householdSize >= 4 && '👨‍👩‍👧‍👦 Great for families!'}
          {data.householdSize === 1 && '🧑‍🍳 Solo chef mode!'}
        </p>
      </motion.div>
    </StepContainer>
  );
}
