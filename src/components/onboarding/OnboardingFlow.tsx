import { useOnboarding } from '@/hooks/useOnboarding';
import { WelcomeStep } from './steps/WelcomeStep';
import { HouseholdStep } from './steps/HouseholdStep';
import { DietaryStep } from './steps/DietaryStep';
import { AllergiesStep } from './steps/AllergiesStep';
import { CuisineStep } from './steps/CuisineStep';
import { CookingExperienceStep } from './steps/CookingExperienceStep';
import { DeliveryStep } from './steps/DeliveryStep';
import { AccountStep } from './steps/AccountStep';
import { MealPlanStep } from './steps/MealPlanStep';
import { PreviewStep } from './steps/PreviewStep';
import { PaymentStep } from './steps/PaymentStep';
import { SuccessStep } from './steps/SuccessStep';
import { AIChatbot } from '@/components/ui/AIChatbot';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * OnboardingFlow Component
 * Manages the entire onboarding journey from welcome to success
 * Integrates AI chatbot for contextual assistance
 */
export function OnboardingFlow() {
  const {
    currentStep,
    totalSteps,
    data,
    progress,
    isComplete,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    canProceed,
    restart,
  } = useOnboarding();

  // Generate contextual information for AI chatbot based on current step and user selections
  const chatContext = useMemo(() => {
    const stepNames = [
      'Welcome', 'Household Size', 'Dietary Preferences', 'Allergies',
      'Cuisine Selection', 'Cooking Experience', 'Delivery Options',
      'Account Creation', 'Meal Plan', 'Preview', 'Payment'
    ];
    return `User is on step ${currentStep + 1} of ${totalSteps}: ${stepNames[currentStep] || 'Onboarding'}. ${
      data.dietaryPreferences.length > 0 ? `Dietary preferences: ${data.dietaryPreferences.join(', ')}. ` : ''
    }${
      data.favoriteCuisines.length > 0 ? `Favorite cuisines: ${data.favoriteCuisines.join(', ')}. ` : ''
    }${
      data.cookingExperience ? `Cooking experience: ${data.cookingExperience}. ` : ''
    }`;
  }, [currentStep, totalSteps, data]);

  // Quick suggestion buttons that change based on current step
  const suggestions = useMemo(() => {
    const suggestionMap: Record<number, string[]> = {
      1: ['How many servings per person?', 'What if I have kids?'],
      2: ['What is the best diet for health?', 'Can I combine diets?'],
      3: ['How do you handle allergies?', 'Can I customize each meal?'],
      4: ['What cuisines do you recommend?', 'Can I try new cuisines?'],
      5: ['What if I\'m a beginner?', 'Do you provide cooking videos?'],
      6: ['What are delivery timings?', 'Can I change my delivery day?'],
      8: ['How is the meal plan created?', 'Can I customize my plan?'],
    };
    return suggestionMap[currentStep] || ['Tell me about meal kits', 'What makes AnyFeast special?'];
  }, [currentStep]);

  if (isComplete) {
    return <SuccessStep data={data} onRestart={restart} />;
  }

  const commonProps = {
    data,
    updateData,
    currentStep,
    totalSteps,
    progress,
    onNext: nextStep,
    onPrev: prevStep,
    canProceed: canProceed(),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;
      case 1:
        return <HouseholdStep {...commonProps} />;
      case 2:
        return <DietaryStep {...commonProps} />;
      case 3:
        return <AllergiesStep {...commonProps} />;
      case 4:
        return <CuisineStep {...commonProps} />;
      case 5:
        return <CookingExperienceStep {...commonProps} />;
      case 6:
        return <DeliveryStep {...commonProps} />;
      case 7:
        return <AccountStep {...commonProps} />;
      case 8:
        return <MealPlanStep {...commonProps} />;
      case 9:
        return <PreviewStep {...commonProps} goToStep={goToStep} />;
      case 10:
        return <PaymentStep {...commonProps} />;
      default:
        return <WelcomeStep onNext={nextStep} />;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
      
      {/* AI Chatbot - Available throughout onboarding */}
      {!isComplete && (
        <AIChatbot 
          context={chatContext}
          suggestions={suggestions}
        />
      )}
    </>
  );
}
