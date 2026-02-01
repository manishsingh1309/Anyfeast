import { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { OnboardingData, ALLERGY_OPTIONS } from '@/types/onboarding';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AllergiesStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

export function AllergiesStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
}: AllergiesStepProps) {
  const [customInput, setCustomInput] = useState('');

  const toggleAllergy = (allergyId: string) => {
    const current = data.allergies || [];
    const updated = current.includes(allergyId)
      ? current.filter((a) => a !== allergyId)
      : [...current, allergyId];
    updateData({ allergies: updated });
  };

  const addCustomAllergy = () => {
    if (customInput.trim()) {
      const current = data.customAllergies || [];
      if (!current.includes(customInput.trim())) {
        updateData({ customAllergies: [...current, customInput.trim()] });
      }
      setCustomInput('');
    }
  };

  const removeCustomAllergy = (allergy: string) => {
    const current = data.customAllergies || [];
    updateData({ customAllergies: current.filter((a) => a !== allergy) });
  };

  return (
    <StepContainer
      title="Any allergies or ingredients to avoid?"
      subtitle="We'll make sure to exclude these from your recipes. This step is optional."
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={true}
      showSkip={true}
      onSkip={onNext}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
        className="flex flex-wrap gap-3 mb-6 relative"
      >
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/40 via-transparent to-rose-100/40 rounded-3xl blur-3xl -z-10" />
        
        {ALLERGY_OPTIONS.map((allergy, index) => {
          const isSelected = (data.allergies || []).includes(allergy.id);
          return (
            <motion.button
              key={allergy.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => toggleAllergy(allergy.id)}
              className={`
                px-4 py-2 rounded-full border-2 transition-all duration-200
                flex items-center gap-2 text-sm font-medium
                ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:border-primary/50 text-foreground'
                }
              `}
            >
              <span>{allergy.emoji}</span>
              <span>{allergy.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Custom allergies */}
      {(data.customAllergies || []).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {data.customAllergies.map((allergy) => (
            <motion.div
              key={allergy}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground flex items-center gap-2 text-sm"
            >
              <span>{allergy}</span>
              <button
                onClick={() => removeCustomAllergy(allergy)}
                className="hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add custom */}
      <div className="flex gap-2 max-w-md">
        <Input
          placeholder="Add custom allergy..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCustomAllergy()}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={addCustomAllergy}
          disabled={!customInput.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </StepContainer>
  );
}
