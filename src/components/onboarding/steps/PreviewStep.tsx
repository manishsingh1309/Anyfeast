import { StepContainer } from '../StepContainer';
import { OnboardingData, PLAN_OPTIONS, DIETARY_OPTIONS, CUISINE_OPTIONS } from '@/types/onboarding';
import { motion } from 'framer-motion';
import { Edit2, Star, Clock, ChefHat, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreviewStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  totalSteps: number;
  progress: number;
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
  goToStep?: (step: number) => void;
}

// Mock recipes based on preferences
const getRecommendedRecipes = (cuisines: string[]) => {
  const recipesByType: Record<string, { name: string; time: number; difficulty: string; rating: number; image: string }> = {
    indian: { name: 'Paneer Tikka Masala', time: 35, difficulty: 'Medium', rating: 4.8, image: '🍛' },
    italian: { name: 'Margherita Pizza', time: 40, difficulty: 'Easy', rating: 4.9, image: '🍕' },
    chinese: { name: 'Kung Pao Chicken', time: 30, difficulty: 'Medium', rating: 4.7, image: '🥡' },
    japanese: { name: 'Teriyaki Salmon', time: 25, difficulty: 'Easy', rating: 4.8, image: '🍣' },
    mexican: { name: 'Chicken Fajitas', time: 30, difficulty: 'Easy', rating: 4.9, image: '🌮' },
    thai: { name: 'Pad Thai', time: 25, difficulty: 'Medium', rating: 4.7, image: '🍜' },
  };
  
  return cuisines.slice(0, 3).map(c => recipesByType[c] || { name: 'Chef\'s Special', time: 30, difficulty: 'Medium', rating: 4.5, image: '🍽️' });
};

export function PreviewStep({
  data,
  updateData,
  currentStep,
  totalSteps,
  progress,
  onNext,
  onPrev,
  canProceed,
  goToStep,
}: PreviewStepProps) {
  const recipes = getRecommendedRecipes(data.favoriteCuisines);
  const selectedDietary = DIETARY_OPTIONS.find(d => data.dietaryPreferences.includes(d.id));
  const selectedCuisines = CUISINE_OPTIONS.filter(c => data.favoriteCuisines.includes(c.id)).slice(0, 3);

  return (
    <StepContainer
      title="🎉 Your Personalized AnyFeast"
      subtitle="Here's what we've prepared based on your preferences"
      currentStep={currentStep}
      totalSteps={totalSteps}
      progress={progress}
      onNext={onNext}
      onPrev={onPrev}
      canProceed={canProceed}
    >
      {/* Profile Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-6 shadow-soft mb-8 relative"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg">Your Profile</h3>
          {goToStep && (
            <Button variant="ghost" size="sm" onClick={() => goToStep(1)} className="gap-1">
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          )}
        </div>
        
        <div className="space-y-3 text-muted-foreground">
          <p className="flex items-center gap-2">
            {selectedDietary?.emoji} {selectedDietary?.label || 'No preference'}
            {data.allergies.length > 0 && `, No ${data.allergies.slice(0, 2).join(', ')}`}
          </p>
          <p className="flex items-center gap-2">
            🌍 Loves: {selectedCuisines.map(c => c.label).join(', ')}
          </p>
          <p className="flex items-center gap-2">
            🔧 {data.skillLevel || 'Intermediate'} • {data.cookingTime || 30}-{(data.cookingTime || 30) + 10} min meals
          </p>
          <p className="flex items-center gap-2">
            📦 {data.deliveryFrequency === 'weekly' ? 'Weekly' : data.deliveryFrequency === 'biweekly' ? 'Bi-weekly' : 'Tri-weekly'} delivery
            {data.deliveryDays.length > 0 && ` • ${data.deliveryDays.join(', ')}`}
          </p>
        </div>
      </motion.div>

      {/* Recipe Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h3 className="font-semibold text-lg mb-4">Your First Box Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-xl p-4 shadow-soft hover:shadow-medium transition-shadow"
            >
              <div className="text-4xl mb-3">{recipe.image}</div>
              <h4 className="font-semibold mb-2">{recipe.name}</h4>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {recipe.time} min
                </span>
                <span className="flex items-center gap-1">
                  <ChefHat className="w-3 h-3" />
                  {recipe.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-accent" />
                  {recipe.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Plan Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h3 className="font-semibold text-lg mb-4">Choose Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLAN_OPTIONS.map((plan) => {
            const isSelected = data.selectedPlan === plan.id;
            return (
              <motion.button
                key={plan.id}
                onClick={() => updateData({ selectedPlan: plan.id })}
                className={`
                  relative rounded-xl p-5 text-left transition-all duration-200
                  ${isSelected 
                    ? 'bg-primary text-primary-foreground shadow-glow border-2 border-primary' 
                    : 'bg-card border-2 border-border hover:border-primary/50'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.badge && (
                  <span className={`
                    absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium
                    ${isSelected ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}
                  `}>
                    {plan.badge}
                  </span>
                )}
                <h4 className="font-bold text-lg mb-1">{plan.name}</h4>
                <p className={`text-sm ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {plan.meals} meals/week
                </p>
                <p className="text-2xl font-bold mt-2">£{plan.price}<span className="text-sm font-normal">/week</span></p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Discount Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-xl p-4 flex items-center gap-3"
      >
        <Gift className="w-8 h-8 text-primary" />
        <div>
          <p className="font-semibold">First Box: 50% OFF + Free Delivery</p>
          <p className="text-sm text-muted-foreground">Limited time offer for new members</p>
        </div>
      </motion.div>
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-transparent to-teal-100/50 rounded-3xl blur-3xl -z-10 pointer-events-none" style={{ top: '-100px', bottom: '-100px', left: '-50px', right: '-50px' }} />
    </StepContainer>
  );
}
