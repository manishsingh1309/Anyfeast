import { StepContainer } from '../StepContainer';
import { SelectionCard } from '../SelectionCard';
import { OnboardingData, DIETARY_OPTIONS } from '@/types/onboarding';
import { AITipBox } from '@/components/ui/AITipBox';
import { motion } from 'framer-motion';

interface DietaryStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

export function DietaryStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
}: DietaryStepProps) {
  const togglePreference = (id: string) => {
    const current = data.dietaryPreferences;
    
    // If selecting "none", clear all others
    if (id === 'none') {
      updateData({ dietaryPreferences: current.includes('none') ? [] : ['none'] });
      return;
    }
    
    // Remove "none" if selecting anything else
    const filtered = current.filter(p => p !== 'none');
    
    if (filtered.includes(id)) {
      updateData({ dietaryPreferences: filtered.filter(p => p !== id) });
    } else {
      updateData({ dietaryPreferences: [...filtered, id] });
    }
  };

  const getAITip = () => {
    if (data.dietaryPreferences.length === 0) {
      return "Select your dietary preferences and we'll ensure all recipe suggestions are perfectly tailored for you.";
    }
    if (data.dietaryPreferences.includes('none')) {
      return "Great! You'll have access to our full recipe catalog with no restrictions.";
    }
    const count = data.dietaryPreferences.length;
    if (count === 1) {
      return `Perfect! We'll filter all recipes to match your ${data.dietaryPreferences[0]} preference.`;
    }
    return `Got it! We'll carefully filter recipes to match all ${count} of your dietary requirements.`;
  };

  const handleSkip = () => {
    updateData({ dietaryPreferences: ['none'] });
    onNext();
  };

  return (
    <StepContainer
      title="What's your dietary style?"
      subtitle="Choose what works for your lifestyle — we'll make sure every recipe fits perfectly"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={canProceed}
      onSkip={handleSkip}
    >
      <div className="space-y-6">
        {/* Selection grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 relative"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-transparent to-emerald-100/50 rounded-3xl blur-3xl -z-10" />
          
          {DIETARY_OPTIONS.map((option) => (
            <motion.div
              key={option.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <SelectionCard
                id={option.id}
                label={option.label}
                icon={option.emoji}
                description={option.description}
                selected={data.dietaryPreferences.includes(option.id)}
                onSelect={togglePreference}
                size="compact"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Selected count */}
        {data.dietaryPreferences.length > 0 && !data.dietaryPreferences.includes('none') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {data.dietaryPreferences.map((pref) => {
              const option = DIETARY_OPTIONS.find(o => o.id === pref);
              return (
                <motion.span
                  key={pref}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  <span>{option?.emoji}</span>
                  {option?.label}
                </motion.span>
              );
            })}
          </motion.div>
        )}

        {/* AI Tip */}
        <AITipBox 
          tip={getAITip()}
          icon="brain"
          variant={data.dietaryPreferences.length > 0 ? "highlight" : "default"}
        />
      </div>
    </StepContainer>
  );
}
