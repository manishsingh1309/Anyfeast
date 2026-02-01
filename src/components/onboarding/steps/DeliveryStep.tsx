import { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { OnboardingData, DELIVERY_FREQUENCY_OPTIONS, DAY_OPTIONS } from '@/types/onboarding';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Check, MapPin, AlertCircle } from 'lucide-react';
import { SelectionCard } from '../SelectionCard';

interface DeliveryStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
}

export function DeliveryStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
}: DeliveryStepProps) {
  const [postcodeValid, setPostcodeValid] = useState<boolean | null>(null);

  const validatePostcode = (value: string) => {
    updateData({ postcode: value });
    if (value.length >= 3) {
      // Simple validation for UK or India postcodes
      const ukPattern = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
      const indiaPattern = /^\d{6}$/;
      setPostcodeValid(ukPattern.test(value) || indiaPattern.test(value));
    } else {
      setPostcodeValid(null);
    }
  };

  const toggleDay = (day: string) => {
    const current = data.deliveryDays || [];
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    updateData({ deliveryDays: updated });
  };

  return (
    <StepContainer
      title="Set up your delivery"
      subtitle="Tell us where and when to deliver your ingredients"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={canProceed}
    >
      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Delivery Location
        </h3>
        <div className="max-w-md">
          <div className="relative">
            <Input
              placeholder="Enter your postcode (e.g., SW1A 1AA or 110001)"
              value={data.postcode}
              onChange={(e) => validatePostcode(e.target.value.toUpperCase())}
              className={`pr-10 ${
                postcodeValid === true
                  ? 'border-success focus:ring-success'
                  : postcodeValid === false
                  ? 'border-destructive focus:ring-destructive'
                  : ''
              }`}
            />
            {postcodeValid !== null && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {postcodeValid ? (
                  <Check className="w-5 h-5 text-success" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
            )}
          </div>
          {postcodeValid === true && (
            <p className="text-sm text-success mt-2 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Great! We deliver to your area 🎉
            </p>
          )}
          {postcodeValid === false && (
            <p className="text-sm text-destructive mt-2">
              Please enter a valid UK or India postcode
            </p>
          )}
        </div>
      </motion.div>

      {/* Delivery Frequency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">
          How often would you like deliveries?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
          {DELIVERY_FREQUENCY_OPTIONS.map((option) => (
            <SelectionCard
              key={option.id}
              emoji={option.emoji}
              title={option.label}
              isSelected={data.deliveryFrequency === option.id}
              onSelect={() => updateData({ deliveryFrequency: option.id })}
              size="sm"
            />
          ))}
        </div>
      </motion.div>

      {/* Preferred Days */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4">
          Which days work best for you?
        </h3>
        <div className="flex flex-wrap gap-3">
          {DAY_OPTIONS.map((day) => {
            const isSelected = (data.deliveryDays || []).includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`
                  w-14 h-14 rounded-xl font-medium transition-all duration-200
                  ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'bg-card border-2 border-border hover:border-primary/50 text-foreground'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          We'll deliver between 8 AM - 12 PM or 4 PM - 8 PM
        </p>
      </motion.div>
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 via-transparent to-amber-100/50 rounded-3xl blur-3xl -z-10 pointer-events-none" style={{ top: '-100px', bottom: '-100px', left: '-50px', right: '-50px' }} />
    </StepContainer>
  );
}
