import { StepContainer } from '../StepContainer';
import { SelectionCard } from '../SelectionCard';
import { OnboardingData, GOAL_OPTIONS } from '@/types/onboarding';
import { AITipBox } from '@/components/ui/AITipBox';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface GoalStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

const goalTips: Record<string, string> = {
  'save-time': "We'll prioritize quick recipes under 30 minutes with minimal prep. Perfect for your busy lifestyle!",
  'eat-healthy': "Get ready for nutritious, balanced meals packed with fresh ingredients. Health goals, here we come!",
  'learn-cooking': "We'll introduce you to new techniques gradually, with detailed step-by-step instructions.",
  'save-money': "Smart meal planning ahead! We'll suggest budget-friendly ingredients and batch cooking tips.",
  'explore-flavors': "Adventure awaits! We'll push your culinary boundaries with exciting new flavors and cuisines.",
  'family-meals': "Family dinner sorted! We'll suggest kid-friendly recipes that adults will love too.",
};

const goalBenefits: Record<string, string[]> = {
  'save-time': ['15-30 min recipes', 'Meal prep guides', 'Quick shopping lists'],
  'eat-healthy': ['Nutritional info', 'Balanced macros', 'Fresh ingredients'],
  'learn-cooking': ['Step-by-step videos', 'Technique tips', 'Skill progression'],
  'save-money': ['Budget tracking', 'Bulk buying tips', 'Zero-waste recipes'],
  'explore-flavors': ['Global cuisines', 'Fusion recipes', 'Rare ingredients'],
  'family-meals': ['Kid-approved', 'Allergy filters', 'Fun presentations'],
};

export function GoalStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
}: GoalStepProps) {
  const selectGoal = (id: string) => {
    updateData({ cookingGoal: id });
  };

  const selectedGoal = GOAL_OPTIONS.find(g => g.id === data.cookingGoal);
  const benefits = data.cookingGoal ? goalBenefits[data.cookingGoal] : null;

  return (
    <StepContainer
      title="What's your main goal?"
      subtitle="This helps us tailor the perfect recipes for you"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={canProceed}
    >
      <div className="space-y-6">
        {/* Goal cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {GOAL_OPTIONS.map((goal) => (
            <motion.div
              key={goal.id}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <SelectionCard
                id={goal.id}
                label={goal.label}
                icon={goal.icon}
                description={goal.description}
                selected={data.cookingGoal === goal.id}
                onSelect={selectGoal}
                size="large"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits when goal is selected */}
        {selectedGoal && benefits && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-5 shadow-soft"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">
                What you'll get with "{selectedGoal.label}"
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-3 rounded-xl bg-muted/50"
                >
                  <span className="text-2xl mb-1">
                    {index === 0 ? '⚡' : index === 1 ? '✨' : '🎯'}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Tip */}
        <AITipBox 
          tip={data.cookingGoal ? goalTips[data.cookingGoal] : "Choose your primary cooking goal and we'll optimize your entire meal experience around it."}
          icon={data.cookingGoal ? "zap" : "lightbulb"}
          variant={data.cookingGoal ? "highlight" : "default"}
        />
      </div>
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-transparent to-orange-100/50 rounded-3xl blur-3xl -z-10 pointer-events-none" style={{ top: '-100px', bottom: '-100px', left: '-50px', right: '-50px' }} />
    </StepContainer>
  );
}
