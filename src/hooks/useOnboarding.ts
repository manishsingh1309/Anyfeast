import { useState, useCallback, useEffect } from 'react';
import { OnboardingData } from '@/types/onboarding';

// Configuration
const TOTAL_STEPS = 11; // Total number of onboarding steps (excluding welcome screen)
const STORAGE_KEY = 'anyfeast-onboarding'; // LocalStorage key for persisting user data

// Default form values - used when starting fresh or if localStorage is empty
const initialData: OnboardingData = {
  householdSize: 2,
  dietaryPreferences: [],
  allergies: [],
  customAllergies: [],
  favoriteCuisines: [],
  cookingGoal: '',
  skillLevel: '',
  cookingTime: 30,
  postcode: '',
  deliveryFrequency: 'weekly',
  deliveryDays: [],
  fullName: '',
  email: '',
  password: '',
  agreedToTerms: false,
  selectedPlan: 'standard',
  mealsPerWeek: 3,
};

/**
 * Custom hook for managing the onboarding flow
 * Handles step navigation, data persistence, and validation
 */
export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Initialize state from localStorage if available, otherwise use defaults
  const [data, setData] = useState<OnboardingData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...initialData, ...JSON.parse(saved) };
        } catch {
          return initialData;
        }
      }
    }
    return initialData;
  });
  
  const [isComplete, setIsComplete] = useState(false);

  // Persist data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Calculate progress percentage for progress bar
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  // Update specific fields in the form data
  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  // Move to next step or complete if on last step
  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentStep]);

  // Move to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Jump directly to a specific step (used in preview mode)
  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < TOTAL_STEPS) {
      setCurrentStep(step);
    }
  }, []);

  /**
   * Validation logic for each step
   * Returns true if user can proceed to next step
   */
  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 0: // Welcome
        return true;
      case 1: // Household
        return data.householdSize > 0;
      case 2: // Dietary preferences
        return data.dietaryPreferences.length > 0;
      case 3: // Allergies
        return true; // Optional step
      case 4: // Cuisines - require at least 3 selections
        return data.favoriteCuisines.length >= 3;
      case 5: // Cooking experience
        return data.skillLevel !== '' && data.cookingGoal !== '';
      case 6: // Delivery - require postcode and delivery days
        return data.postcode.length >= 3 && data.deliveryDays.length > 0;
      case 7: // Account - validate email format and password strength
        return data.fullName.length >= 2 && 
               data.email.includes('@') && 
               data.password.length >= 8 &&
               data.agreedToTerms;
      case 8: // Meal plan preview
        return data.selectedPlan !== '';
      case 9: // Payment (mock validation)
        return true;
      default:
        return false;
    }
  }, [currentStep, data]);

  // Reset entire onboarding flow to start over
  const restart = useCallback(() => {
    setCurrentStep(0);
    setData(initialData);
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    data,
    progress,
    isComplete,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    canProceed,
    restart,
  };
}
